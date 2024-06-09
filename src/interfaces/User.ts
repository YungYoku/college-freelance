import { University } from '@/interfaces/University.ts'
import { Discipline } from '@/interfaces/Discipline.ts'
import { ReferralCode } from '@/interfaces/ReferralCode.ts'
import { JobOffer } from '@/interfaces/JobOffer.ts'
import { Rating } from '@/interfaces/Rating.ts'

export interface User {
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
    expand?: {
        university?: University
        disciplines?: Array<Discipline>
        referral_code?: ReferralCode
        favorite?: Array<JobOffer>
        rating?: Array<Rating>
    }
}

export interface Users {
    page: number,
    perPage: number,
    totalPages: number,
    totalItems: number,
    items: Array<User>
}

export interface UserLogin {
    record: User
    token: string
}
