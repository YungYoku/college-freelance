import axios from 'axios'

class Http {
    api = import.meta.env.VITE_API

    constructor() {
    }

    async get<T>(url: string, params: object = {}): Promise<T> {
        return axios.get<T>(this.api + url, params)
            .then((res) => {
                return res.data
            })
    }

    async post<T>(url: string, body: object = {}): Promise<T> {
        return axios.post<T>(this.api + url, body)
            .then((res) => {
                return res.data
            })
    }
}

export default new Http()
