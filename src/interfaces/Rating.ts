import { User } from '@/interfaces/User.ts'

export interface Rating {
	by: User
	collectionId: string
	collectionName:	string
	created: string
	id:	string
	review: string
	stars: number
	updated: string
}
