import { defineStore } from 'pinia'
import { User } from '@/interfaces/UserLogin'
import LocalStorage from '@/plugins/localStorage'

export interface State {
    user: User;
    token: string;
}

export const useAuthStore = defineStore({
    id: 'auth',

    state: (): State => ({
        user: {
            avatar: '',
            collectionId: '',
            collectionName: '',
            created: '',
            email: '',
            emailVisibility: false,
            id: '',
            name: '',
            updated: '',
            username: '',
            verified: false,
            permission: 1
        },
        token: localStorage.token ? JSON.parse(localStorage.token) : '',
    }),

    getters: {
        isLoggedIn: state => state.token
    },

    actions: {
        setToken(token: string) {
            this.token = token
            LocalStorage.write('token', token)
        },

        setUser(user: User) {
            this.user = user
            LocalStorage.write('user', {
                id: user.id,
                name: user.name
            })
        }
    },
})