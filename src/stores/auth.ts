import { defineStore } from 'pinia'


export interface State {
    token: string;
}

export const useAuthStore = defineStore({
    id: 'auth',

    state: (): State => ({
        token: localStorage.uid ?? '',
    }),

    getters: {},

    actions: {
        setToken(token: string) {
            this.token = token
            localStorage.token = token
        }
    },
})