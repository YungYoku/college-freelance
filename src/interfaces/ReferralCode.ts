import { User } from '@/interfaces/User.ts'

export interface ReferralCode {
	collectionId: string,
	collectionName: string,
	created: Date,
	id: string,
	updated: Date
	used: Array<User>
	new: Array<User>
}