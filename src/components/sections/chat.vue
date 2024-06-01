<template>
	<Grid class="chat">
		<div
			ref="messagesRef"
			class="chat__messages"
		>
			<Message
				v-for="message in chat.expand?.messages ?? []"
				:key="message.id"
				:message="message"
				:self="message.user === auth.user.id"
			/>
		</div>

		<template v-if="chatOpened">
			<Input
				:disabled="loading"
				type="file"
				@input="updateFile"
			/>

			<Input
				v-model="newMessage"
				:disabled="loading"
				label="Cообщение"
				icon="send"
				@action="sendMessage"
				@keyup.enter="sendMessage"
			/>
		</template>

		<Rating
			v-if="status === 'ended'"
			v-model="newRating"
			:loading="loading"
			@update:model-value="sendRating"
		/>

		<template v-if="auth.isExecutor">
			<Button
				v-if="status === 'in_progress'"
				:loading="loading"
				@click="sendToReview"
			>
				Отправить на проверку
			</Button>
			<span
				v-else-if="status === 'on_review'"
				class="text-xs text-center"
			>
				На проверке
			</span>
			<span
				v-else-if="status === 'ended'"
				class="text-xs text-center"
			>
				Объявление завершено
			</span>
		</template>

		<template v-if="auth.isCustomer">
			<template v-if="status === 'on_review'">
				<Button
					:loading="loading"
					@click="approveReview"
				>
					Подтвердить выполнение
				</Button>
				<Button
					:loading="loading"
					@click="declineReview"
				>
					Отказ
				</Button>
			</template>
			<span
				v-else-if="status === 'ended'"
				class="h-9 text-xs text-center content-center"
			>
				Объявление завершено
			</span>
		</template>
	</Grid>
</template>

<script setup lang="ts">
import { nextTick, PropType, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

import http from '@/plugins/http'
import { Chat } from '@/interfaces/Chat.ts'
import { Grid } from '@/components/structures'
import { Input, Button, Rating, Message } from '@/components/blocks'
import { Message as IMessage } from '@/interfaces/Message.ts'
import type { JobOfferStatus } from '@/interfaces/JobOffer.ts'

const props = defineProps({
	id: {
		type: String,
		required: true
	},
	status: {
		type: String as PropType<JobOfferStatus>,
		default: 'created'
	},
	rating: {
		type: Number,
		default: 0
	}
})

const messagesRef = ref<HTMLInputElement | null>(null)
const chat = ref<Chat>({
	created: '',
	id: '',
	messages: [],
	collectionId: '', 
	collectionName: '',
	updated: '',
	expand: {
		messages: []
	}
})
const chatOpened = ref(false)

const loading = ref(false)

const loadChat = async () => {
	await http.connect<Chat>({
		collection: 'chats',
		id: props.id,
		expand: ['messages'],
		cb: (response: Chat) => {
			chat.value = response

			const today = new Date()
			today.setDate(today.getDate() - 1)
			const chatExpired = today > new Date(response.updated)
			chatOpened.value = !chatExpired || props.status !== 'ended'

			nextTick(() => {
				if (messagesRef.value) {
					const messagesRefScrollHeight = messagesRef.value.scrollHeight ?? 0
					messagesRef.value?.scrollTo(0, messagesRefScrollHeight) // Не всегда срабатывает с первого раза
				}
			})
		}
	})
}

watch(() => props.id, loadChat, { immediate: true })
watch(() => props.status, () => { loading.value = false })

const auth = useAuthStore()

const newMessage = ref('')
const file = ref<File | null>(null)
const sendMessage = async () => {
	if (loading.value) return
	if (newMessage.value.length === 0 && file.value === null) return

	loading.value = true

	const formData = new FormData()

	formData.append('text', newMessage.value)
	formData.append('user', auth.user.id)
	formData.append('file', file.value ?? '')

	const messageId = await http
		.post<IMessage>('/collections/messages/records', formData)
		.then(({ id }) => id)

	await http
		.patch(`/collections/chats/records/${props.id}`, {
			messages: [...chat.value.messages, messageId]
		})

	await loadChat()

	newMessage.value = ''
	file.value = null
	loading.value = false
}

const updateFile = (event: Event) => {
	const target = event.target as HTMLInputElement
	if (target.files) {
		file.value = target.files[0]
	}
}

const emit = defineEmits(['send-to-review', 'approve-review', 'decline-review', 'send-rating'])

const sendToReview = () => {
	loading.value = true

	emit('send-to-review')
}

const approveReview = () => {
	loading.value = true

	emit('approve-review')
}

const declineReview = () => {
	loading.value = true

	emit('decline-review')
}

const newRating = ref<number>()
watch(() => props.rating, () => { newRating.value = props.rating }, { immediate: true })
const sendRating = () => emit('send-rating', newRating.value)
</script>

<style scoped lang="scss">
.chat {
	&__messages {
		display: flex;
		flex-direction: column;

		min-height: 400px;
		max-height: 400px;
		padding: 0 10px;
		overflow: auto;
		gap: 10px;
	}
}
</style>
