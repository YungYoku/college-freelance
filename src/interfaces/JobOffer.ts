import { IUser } from '@/interfaces/User.ts'
import { IChat } from '@/interfaces/Chat.ts'
import { IDiscipline } from '@/interfaces/Discipline.ts'
import { IRating } from '@/interfaces/Rating.ts'
import { IUniversity } from '@/interfaces/University.ts'

export type IJobOfferStatus = 'created' | 'in_progress' | 'on_review' | 'ended'

interface IJobOfferType {
	collectionId: string
	collectionName: string
	created: string
	id: string
	name: string
	updated: string
}

export interface IJobOfferProposal {
	id: string
	collectionId: string
	collectionName: string
	created: string
	updated: string
	user: string
	chat: string
	expand?: {
		user?: IUser
		chat?: IChat
	}
}

export interface IJobOffer {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    title: string
    description: string
    price: number
    creator: string
    status: IJobOfferStatus
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
        creator?: IUser
        executor?: IUser
        chat?: IChat
        proposals?: Array<IJobOfferProposal>
        type?: IJobOfferType
        university?: IUniversity
        discipline?: IDiscipline,
        file?: {
            value: File
        },
        ratingCreator?: IRating
        ratingExecutor?: IRating
    }
}

export const emptyOffer: IJobOffer = {
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

export interface IJobOffers {
    items: Array<IJobOffer>
    page: number
    perPage: number
    totalItems: number
    totalPages: number
}