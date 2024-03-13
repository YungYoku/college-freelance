export interface Discipline {
	collectionId: string,
	collectionName: string,
	created: Date,
	id: string,
	name: string,
	updated: Date
}

export interface Disciplines {
	page: number,
	perPage: number,
	totalItems: number,
	totalPages: number,
	items: Array<Discipline>
}