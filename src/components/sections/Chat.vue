<template>
	<Grid class="chat">
		<div class="chat__messages">
			<div
				v-for="message in chat.expand.messages"
				:key="message.id"
				class="chat__message"
			>
				{{ message.text }}
			</div>
		</div>

		<Input
			v-model="newMessage"
			placeholder="Введите сообщение..."
		/>

		<Skeleton
			v-if="loading"
			class="h-9 w-[580px]"
		/>

		<Button
			v-else
			@click="sendMessage"
		>
			Отправить
		</Button>
	</Grid>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

import http from '@/plugins/http'
import { Chat } from '@/interfaces/Chat.ts'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Grid from '@/components/structures/Grid.vue'
import { Message } from '@/interfaces/Message.ts'
import { Skeleton } from '@/components/ui/skeleton'

const props = defineProps({
	id: {
		type: String,
		required: true
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

const auth = useAuthStore()

const newMessage = ref('')

const sendMessage = async () => {
	if (newMessage.value.length === 0) return

	loading.value = true

	const messageId = await http
		.post<Message>('/collections/messages/records', {
			text: newMessage.value,
			user: auth.user.id
		})
		.then(({ id }) => id)

	await http
		.patch(`/collections/chats/records/${props.id}`, {
			messages: [...chat.value.messages, messageId]
		})

	await loadChat()

	newMessage.value = ''
	loading.value = false
}
</script>

<style scoped lang="scss">
.chat {
	&__messages {
		min-height: 300px;
	}
}
</style>
