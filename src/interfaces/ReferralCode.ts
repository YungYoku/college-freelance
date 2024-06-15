import { IUser } from '@/interfaces/User.ts'

export interface IReferralCode {
	collectionId: string,
	collectionName: string,
	created: Date,
	id: string,
	updated: Date
	used: Array<IUser>
	new: Array<IUser>
}