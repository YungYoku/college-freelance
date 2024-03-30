<template>
	<div class="chat">
		Chat

		<div
			v-for="message in chat.messages"
			:key="message.id"
		>
			{{ message.text }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import http from '@/plugins/http'
import { Chat } from '@/interfaces/Chat.ts'

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
	updated: ''
})

const loadChat = async () => {
	await http
		.get<Chat>(`/collections/chats/records/${props.id}`)
		.then(response => {
			chat.value = response
		})
}

watch(() => props.id, loadChat, { immediate: true })
</script>
