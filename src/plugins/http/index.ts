import { useAuthStore } from '@/stores/auth'

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

	async get<T>(url: string): Promise<T> {
		const auth = useAuthStore()

		return fetch(this.api + url, {
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
			.then((res) => {
				return res
			})
	}

}

export default new Http()
