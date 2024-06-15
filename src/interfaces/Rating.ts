import { IUser } from '@/interfaces/User.ts'

export interface IRating {
	by: IUser
	collectionId: string
	collectionName:	string
	created: string
	id:	string
	review: string
	stars: number
	updated: string
}
