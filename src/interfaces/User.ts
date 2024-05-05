import { University } from '@/interfaces/University.ts'
import { Discipline } from '@/interfaces/Discipline.ts'

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
    rating: number | null
    updated: string
    username: string
    verified: boolean
    role: 'admin' | 'customer' | 'executor'
    university: string
    energy: number
    disciplines: Array<string>
    card: string
    expand?: {
        university: University
        disciplines: Array<Discipline>
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
