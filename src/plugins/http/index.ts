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

	getHeaders(token: string, isFormData = false) {
		const headers: { [key: string]: string } = {
			Accept: 'application/json',
			Authorization: token
		}
		if (!isFormData) {
			headers['Content-Type'] = 'application/json'
		}
		return headers
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

	async post<T>(url: string, _body: object | FormData = {}): Promise<T> {
		const auth = useAuthStore()

		const body = _body instanceof FormData ? _body : JSON.stringify(_body)

		return fetch(this.api + url, {
			method: 'POST',
			headers: this.getHeaders(auth.token, _body instanceof FormData),
			body
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
