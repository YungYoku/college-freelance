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
    rating: number
    updated: string
    username: string
    verified: boolean
    role: 'admin' | 'customer' | 'executor'
    university: {
        name: string
    }
}

export interface Users {
    'page': number,
    'perPage': number,
    'totalPages': number,
    'totalItems': number,
    items: Array<User>
}

export interface UserLogin {
    record: User
    token: string
}
