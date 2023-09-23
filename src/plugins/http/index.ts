import axios from 'axios'

class Http {
    api = import.meta.env.VITE_API

    constructor() {
    }

    async get(url: string, params: object = {}): Promise<unknown> {
        return axios.get(this.api + url, params)
            .then((res) => {
                return res.data
            })
    }

    async post(url: string, body: object = {}): Promise<unknown> {
        return axios.post(this.api + url, body)
            .then((res) => {
                return res.data
            })
    }
}

export default new Http()
