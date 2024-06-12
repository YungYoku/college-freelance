<template>
	<Grid class="chat">
		<User
			v-if="chatMember"
			class="absolute top-2 left-23"
			:loading="loading"
			link
			:user="chatMember"
		/>

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

		<InputFile
			v-model="file"
			:loading="loading"
		/>

		<Input
			v-model="newMessage"
			:disabled="loading"
			:loading="loading"
			label="Cообщение"
			icon="send"
			@action="sendMessage"
			@keyup.enter="sendMessage"
		/>

		<Button
			v-if="status === 'ended' && props.rating === 0"
			@click="showFeedback = true"
		>
			Оставить отзыв
		</Button>
		<Button
			v-if="status === 'ended' && props.rating !== 0"
			@click="showFeedback = true"
		>
			Просмотр отзыва
		</Button>
		<Modal
			v-if="showFeedback"
			:width="600"
			@close="showFeedback = false"
		>
			<Rating
				v-if="status === 'ended'"
				v-model="newRating"
				:user="props.chatMember.name"
				:loading="loading"
				@update:model-value="sendRating"
			/>
		</Modal>


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
import { nextTick, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

import http from '@/plugins/http'
import { Chat } from '@/interfaces/Chat.ts'
import { Grid } from '@/components/structures'
import { Input, Button, Rating, Message, InputFile, User } from '@/components/blocks'
import { Message as IMessage } from '@/interfaces/Message.ts'
import type { JobOfferStatus } from '@/interfaces/JobOffer.ts'
import { User as IUser } from '@/interfaces/User'
import Modal from '@/components/structures/modal.vue'

interface Props {
	id: string,
	chatMember: IUser
	status: JobOfferStatus,
	rating: number
}
const props = withDefaults(defineProps<Props>(), {
	id: '',
	chatMember: () => ({
		avatar: '',
		collectionId: '',
		collectionName: '',
		created: '',
		email: '',
		emailVisibility: false,
		id: '',
		name: '',
		description: '',
		surname: '',
		rating: [],
		updated: '',
		username: '',
		verified: false,
		role: 'customer',
		university: '',
		energy: 0,
		disciplines: [],
		favorite: [],
		referral_code: ''
	}),
	status: 'created',
	rating: 0
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
const showFeedback = ref(false)

const loading = ref(true)

const loadChat = async () => {
	await http.connect<Chat>({
		collection: 'chats',
		id: props.id,
		expand: ['messages', 'messages.file'],
		cb: (response: Chat) => {
			chat.value = response

			nextTick(() => {
				if (messagesRef.value) {
					const messagesRefScrollHeight = messagesRef.value.scrollHeight ?? 0
					messagesRef.value?.scrollTo(0, messagesRefScrollHeight) // Не всегда срабатывает с первого раза
				}

				loading.value = false
			})
		}
	})
}

watch(() => props.id, loadChat, { immediate: true })
watch(() => props.status, () => { loading.value = false })

const auth = useAuthStore()

const newMessage = ref('')
const file = ref<string | null>(null)
const sendMessage = async () => {
	if (loading.value) return
	if (newMessage.value.length === 0 && file.value === null) return

	loading.value = true

	await http
		.post<IMessage>(`/send-message/${props.id}`, {
			text: newMessage.value,
			file: file.value
		})

	newMessage.value = ''
	file.value = null
	loading.value = false
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

const newRating = ref({
	rating: 0,
	text: ''
})
watch(() => props.rating, () => {
	newRating.value.rating = props.rating

}, { immediate: true })
const sendRating = () => {
	showFeedback.value = false
	emit('send-rating', {
		rating: newRating.value?.rating,
		review: newRating.value?.text
	})
}
</script>

<style scoped lang="scss">
.chat {
	&__messages {
		display: flex;
		flex-direction: column;

		height: 40vh;
		min-height: 300px;
		max-height: 800px;
		padding: 0 10px;
		overflow: auto;
		gap: 10px;
	}
}
</style>
