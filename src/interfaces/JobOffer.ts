import { User } from '@/interfaces/User.ts'
import { Chat } from '@/interfaces/Chat.ts'

export type JobOfferStatus = 'created' | 'in_progress' | 'on_review' | 'reviewed' | 'paid' | 'ended'

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
    ratingCreator: number
    ratingExecutor: number
    deadline: Date
    university: string
    discipline: string
    executor: string
    proposals: Array<string>
    chat: string
    type: string
    expand?: {
        creator?: User
        chat?: Chat,
        proposals?: Array<JobOfferProposal>
        type?: JobOfferType
    }
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