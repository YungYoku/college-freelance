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
    created: Date
    updated: Date
    checked_at: Date
    email: string
    emailVisibility: boolean
    id: string
    name: string
    description: string
    surname: string
    username: string
    verified: boolean
    role: 'admin' | 'customer' | 'executor' | 'guest'
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

export interface IUserRefresh {
	token: string
	record: IUser
}

export const emptyUser: IUser = {
	avatar: '',
	collectionId: '',
	collectionName: '',
	email: '',
	created: new Date(),
	updated: new Date(),
	checked_at: new Date(),
	emailVisibility: false,
	id: '',
	name: '',
	description: '',
	surname: '',
	rating: [],
	username: '',
	verified: false,
	role: 'guest',
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
