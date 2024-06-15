import { User } from '@/interfaces/User.ts'
import { Chat } from '@/interfaces/Chat.ts'
import { Discipline } from '@/interfaces/Discipline.ts'
import { Rating } from '@/interfaces/Rating.ts'
import { University } from '@/interfaces/University.ts'

export type JobOfferStatus = 'created' | 'in_progress' | 'on_review' | 'ended'

export interface JobOffer {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    title: string
    description: string
    price: number
    creator: string
    status: JobOfferStatus
    ratingCreator: string
    ratingExecutor: string
    deadline: Date
    university: string
    discipline: string
    executor: string
    proposals: Array<string>
    chat: string
    type: string
    file: string | null
    expand?: {
        creator?: User
        executor?: User
        chat?: Chat
        proposals?: Array<JobOfferProposal>
        type?: JobOfferType
        university?: University
        discipline?: Discipline,
        file?: {
            value: File
        },
        ratingCreator?: Rating
        ratingExecutor?: Rating
    }
}

export const emptyOffer: JobOffer = {
	ratingCreator: '',
	ratingExecutor: '',
	chat: '',
	collectionId: '',
	collectionName: '',
	created: '',
	creator: '',
	deadline: new Date(),
	discipline: '',
	executor: '',
	id: '',
	proposals: [],
	status: 'created',
	type: '',
	university: '',
	updated: '',
	title: '',
	description: '',
	file: null,
	price: 0
}

interface JobOfferType {
    collectionId: string
    collectionName: string
    created: string
    id: string
    name: string
    updated: string
}

export interface JobOfferProposal {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    user: string
    chat: string
    expand?: {
        user?: User
        chat?: Chat
    }
}

export interface JobOffers {
    items: Array<JobOffer>
    page: number
    perPage: number
    totalItems: number
    totalPages: number
}