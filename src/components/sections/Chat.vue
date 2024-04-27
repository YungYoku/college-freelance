<template>
	<Grid class="chat">
		<div class="chat__messages">
			<div
				v-for="message in chat.expand?.messages ?? []"
				:key="message.id"
				class="chat__message flex w-max max-w-[75%] flex-col gap-1 rounded-lg px-3 py-2"
				:class="{
					'text-primary-foreground': message.user === auth.user.id,
					'bg-primary': message.user === auth.user.id,
					'bg-muted': message.user !== auth.user.id,
					'ml-auto': message.user === auth.user.id,
					'mr-auto': message.user !== auth.user.id
				}"
			>
				<span class="text-sm">{{ message.text }}</span>

				<File
					v-if="message.file"
					:src="`${message.collectionId}/${message.id}/${message.file}`"
				/>

				<span class="text-xs">{{ message.created }}</span>
			</div>
		</div>

		<Input
			v-model="newMessage"
			:disabled="loading || status === 'ended'"
			placeholder="Введите сообщение..."
		/>

		<Input
			:disabled="loading || status === 'ended'"
			type="file"
			@input="updateFile"
		/>

		<Skeleton
			v-if="loading"
			class="h-9 w-[580px]"
		/>
		<Button
			v-else
			:disabled="status === 'ended'"
			@click="sendMessage"
		>
			Отправить сообщение
		</Button>

		<template v-if="auth.isExecutor">
			<Skeleton
				v-if="loading"
				class="h-9 w-[580px]"
			/>
			<Button
				v-else-if="status === 'in_progress'"
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
			<Button
				v-else-if="status === 'reviewed'"
			>
				Пожаловаться на обман
			</Button>
			<template v-else-if="status === 'paid'">
				<Button>
					Пожаловаться на обман
				</Button>
				<Button
					@click="approvePaying"
				>
					Подтвердить оплату
				</Button>
			</template>
			<span
				v-else-if="status === 'ended'"
				class="text-xs text-center"
			>
				Объявление завершено
			</span>
		</template>

		<template v-if="auth.isCustomer">
			<Skeleton
				v-if="loading"
				class="h-9 w-[580px]"
			/>
			<Button
				v-else-if="status === 'on_review'"
				@click="approveReview"
			>
				Подтвердить выполнение
			</Button>
			<template v-else-if="status === 'reviewed'">
				<Button
					@click="sendPayingToReview"
				>
					Подтвердить оплату
				</Button>
				<span class="text-xs text-center">
					Оплатите работу по номеру карты: {{ '0000 0000 0000 0000' }}
				</span>
			</template>
			<span
				v-else-if="status === 'paid'"
				class="text-xs text-center"
			>
				Ожидайте подтверждения
			</span>
			<span
				v-else-if="status === 'ended'"
				class="text-xs text-center"
			>
				Объявление завершено
			</span>
		</template>
	</Grid>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

import http from '@/plugins/http'
import { Chat } from '@/interfaces/Chat.ts'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Grid from '@/components/structures/Grid.vue'
import File from '@/components/elements/File.vue'
import { Message } from '@/interfaces/Message.ts'
import { Skeleton } from '@/components/ui/skeleton'
import type { JobOfferStatus } from '@/interfaces/JobOffer.ts'

const props = defineProps({
	id: {
		type: String,
		required: true
	},
	status: {
		type: String as PropType<JobOfferStatus>,
		default: 'created'
	}
})

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

const loading = ref(true)

const loadChat = async () => {
	loading.value = true

	await http
		.get<Chat>(`/collections/chats/records/${props.id}?expand=messages`)
		.then(response => {
			chat.value = response
		})

	loading.value = false
}

watch(() => props.id, loadChat, { immediate: true })
watch(() => props.status, () => { loading.value = false })

const auth = useAuthStore()

const newMessage = ref('')
const file = ref<File | null>(null)
const sendMessage = async () => {
	if (newMessage.value.length === 0) return

	loading.value = true

	const formData = new FormData()

	formData.append('text', newMessage.value)
	formData.append('user', auth.user.id)
	formData.append('file', file.value ?? '')

	const messageId = await http
		.post<Message>('/collections/messages/records', formData)
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

const emit = defineEmits(['send-to-review', 'approve-review', 'send-paying-to-review', 'approve-paying'])

const sendToReview = () => {
	loading.value = true

	emit('send-to-review')
}

const approveReview = () => {
	loading.value = true

	emit('approve-review')
}

const sendPayingToReview = () => {
	loading.value = true

	emit('send-paying-to-review')
}

const approvePaying = () => {
	loading.value = true

	emit('approve-paying')
}
</script>

<style scoped lang="scss">
.chat {
	&__messages {
		display: flex;
		flex-direction: column;

		min-height: 400px;
		max-height: 400px;
		overflow: auto;
		gap: 10px;
	}
}
</style>
