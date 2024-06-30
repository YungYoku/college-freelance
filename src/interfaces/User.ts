import { IUniversity } from '@/interfaces/University.ts'
import { IDiscipline } from '@/interfaces/Discipline.ts'
import { IReferralCode } from '@/interfaces/ReferralCode.ts'
import { IJobOffer } from '@/interfaces/JobOffer.ts'
import { IRating } from '@/interfaces/Rating.ts'
import { INotification } from '@/interfaces/Notification.ts'

export interface IUser {
    avatar: string
    collectionId: string
    collectionName: string
    created: string
    email: string
    emailVisibility: boolean
    id: string
    name: string
    description: string
    surname: string
    updated: string
    username: string
    verified: boolean
    role: 'admin' | 'customer' | 'executor'
    university: string
    energy: number
    disciplines: Array<string>
    referral_code: string
    favorite: Array<string>
    rating: Array<string>
	notifications: Array<string>
    expand?: {
        university?: IUniversity
        disciplines?: Array<IDiscipline>
        referral_code?: IReferralCode
        favorite?: Array<IJobOffer>
        rating?: Array<IRating>
		notifications: Array<INotification>
    }
}

export const emptyUser: IUser = {
	avatar: '',
	collectionId: '',
	collectionName: '',
	created: '',
	email: '',
	emailVisibility: false,
	id: '',
	name: '',
	description: '',
	surname: '',
	rating: [],
	updated: '',
	username: '',
	verified: false,
	role: 'customer',
	university: '',
	energy: 0,
	disciplines: [],
	favorite: [],
	referral_code: '',
	notifications: []
}

export interface IUsers {
    page: number,
    perPage: number,
    totalPages: number,
    totalItems: number,
    items: Array<IUser>
}

export interface IUserLogin {
    record: IUser
    token: string
}
