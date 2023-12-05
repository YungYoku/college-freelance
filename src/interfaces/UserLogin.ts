export interface User {
    avatar: string
    collectionId: string
    collectionName: string
    created: string
    email: string
    emailVisibility: boolean
    id: string
    name: string
    updated: string
    username: string
    verified: boolean
    permission: number
}

export interface UserLogin {
    record: User
    token: string
}
