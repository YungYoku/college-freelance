export interface IMessage {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	text: string
	file: string | null
	user: string
	expand?:{
		file?: {
			value: File
		}
	}
}