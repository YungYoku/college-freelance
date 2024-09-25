export interface IDiscipline {
	collectionId: string
	collectionName: string
	created: Date
	id: string
	name: string
	name_lowercase: string
	updated: Date
}

export interface IDisciplines {
	items: Array<IDiscipline>
	page: number
	perPage: number
	totalItems: number
	totalPages: number
}