import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

class Http {
    api = import.meta.env.VITE_API

    constructor() {
    }

    async get<T>(url: string): Promise<T> {
        const auth = useAuthStore()

        return axios.get<T>(this.api + url, {
            headers: {
                Authorization: auth.token
            }
        })
            .then((res) => {
                return res.data
            })
    }

    async post<T>(url: string, body: object = {}): Promise<T> {
        const auth = useAuthStore()

        return axios.post<T>(this.api + url, body, {
            headers: {
                Authorization: auth.token
            }
        })
            .then((res) => {
                return res.data
            })
    }
}

export default new Http()
