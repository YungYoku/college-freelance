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
}

export interface JobOffers {
    items: Array<JobOffer>
    page: number
    perPage: number
    totalItems: number
    totalPages: number
}