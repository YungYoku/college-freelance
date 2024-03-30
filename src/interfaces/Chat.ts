import { Message } from '@/interfaces/Message.ts'

export interface Chat {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	messages: Array<Message>
}
