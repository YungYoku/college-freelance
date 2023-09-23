import { defineStore } from 'pinia'


export interface State {
    token: string;
}

export const useAuthStore = defineStore({
    id: 'auth',

    state: (): State => ({
        token: localStorage.token ?? '',
    }),

    getters: {
        isLoggedIn: state => state.token
    },

    actions: {
        setToken(token: string) {
            this.token = token
            localStorage.token = token
        }
    },
})