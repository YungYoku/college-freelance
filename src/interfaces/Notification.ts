export interface INotification {
	collectionId: string
	collectionName:	string
	created: string
	id:	string
	text: string
	link: string
	updated: string
	checked: boolean
}

export interface INotifications {
	page: number,
	perPage: number,
	totalPages: number,
	totalItems: number,
	items: Array<INotification>
}
