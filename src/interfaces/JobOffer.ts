import { User } from '@/interfaces/User.ts'
import { Chat } from '@/interfaces/Chat.ts'

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
    status: 'created' | 'in_progress' | 'completed'
    rating: number
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
    }
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