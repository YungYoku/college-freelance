import { IMessage } from '@/interfaces/Message.ts'

export interface IChat {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	messages: Array<string>,
	expand?: {
		messages?: Array<IMessage>
	}
}
