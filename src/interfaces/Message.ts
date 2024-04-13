export interface Message {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	text: string
	file: File
	user: string
}

export interface Messages {
	items: Array<Message>
	page: number
	perPage: number
	totalItems: number
	totalPages: number
}
