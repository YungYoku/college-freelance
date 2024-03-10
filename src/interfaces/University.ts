export interface University {
	collectionId: string,
	collectionName: string,
	created: Date,
	id: string,
	name: string,
	updated: Date
}

export interface Universities {
	page: number,
	perPage: number,
	totalItems: number,
	totalPages: number,
	items: Array<University>
}