<template>
	<div class="chat">
		Chat
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
		.get<Chat>(`/collections/chats/records?id=${props.id}`)
		.then(response => {
			chat.value = response
		})
}

watch(() => props.id, loadChat, { immediate: true })
</script>
