import { User } from '@/interfaces/User.ts'

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
    status: number
    rating: number
    deadline: Date
    university: string
    discipline: string
    expand?: {
        creator?: User
    }
}

export interface JobOffers {
    items: Array<JobOffer>
    page: number
    perPage: number
    totalItems: number
    totalPages: number
}