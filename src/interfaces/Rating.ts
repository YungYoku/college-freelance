import { IUser } from '@/interfaces/User.ts'

export interface IRating {
	by: string
	collectionId: string
	collectionName:	string
	created: string
	id:	string
	review: string
	stars: number
	updated: string,
	expand?: {
		by?: IUser
	}
}

export const emptyRating: IRating = {
	by: '',
	collectionId: '',
	collectionName: '',
	created: '',
	id: '',
	review: '',
	stars: 0,
	updated: ''
}
