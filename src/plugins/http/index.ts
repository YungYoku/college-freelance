import { useAuthStore } from '@/stores/auth'

interface BodyGet {
	filter?: string
	expand?: Array<string>
	perPage?: number
	sort?: string
}

class Http {
	api = import.meta.env.VITE_API

	constructor() {
	}

	getHeaders(token: string) {
		return {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token
		}
	}

	async get<T>(url: string, body?: BodyGet): Promise<T> {
		const auth = useAuthStore()

		let resultUrl = url
		if (body) {
			resultUrl += '?'
			if (body.filter) {
				resultUrl += 'filter=' + body.filter + '&'
			}
			if (body.expand) {
				resultUrl += 'expand=' + body.expand.join(',') + '&'
			}
			if (body.perPage) {
				resultUrl += 'perPage=' + body.perPage + '&'
			}
			if (body.sort) {
				resultUrl += 'sort=' + body.sort + '&'
			}
			resultUrl = resultUrl.slice(0, -1)
		}

		return fetch(this.api + resultUrl, {
			method: 'GET',
			headers: this.getHeaders(auth.token)
		})
			.then((res) => {
				return res.json()
			})
	}

	async post<T>(url: string, body: object = {}): Promise<T> {
		const auth = useAuthStore()

		return fetch(this.api + url, {
			method: 'POST',
			headers: this.getHeaders(auth.token),
			body: JSON.stringify(body)
		})
			.then((res) => {
				return res.json()
			})
	}

	async patch<T>(url: string, body: object = {}): Promise<T> {
		const auth = useAuthStore()

		return fetch(this.api + url, {
			method: 'PATCH',
			headers: this.getHeaders(auth.token),
			body: JSON.stringify(body)
		})
			.then((res) => {
				return res.json()
			})
	}

	async delete(url: string): Promise<Response> {
		const auth = useAuthStore()

		return fetch(this.api + url, {
			method: 'DELETE',
			headers: this.getHeaders(auth.token)
		})
	}
}

export default new Http()
