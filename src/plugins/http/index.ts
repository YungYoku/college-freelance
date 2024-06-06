import { useAuthStore } from '@/stores/auth'

interface BodyGet {
	filter?: string
	expand?: Array<string>
	perPage?: number
	sort?: string
}

interface HeadersOptions {
	isFormData?: boolean
	isSSE?: boolean
}

interface ConnectOptions<T> {
	collection: string
	id: string
	expand: Array<string>,
	cb: (response: T) => void
}

class Http {
	api = import.meta.env.VITE_API

	constructor() {
	}

	getHeaders(token: string, options: HeadersOptions = {
		isFormData: false,
		isSSE: false
	}) {
		const headers: { [key: string]: string } = {
			Accept: 'application/json',
			Authorization: token
		}
		if (!options.isFormData) {
			headers['Content-Type'] = 'application/json'
		}
		if (options.isSSE) {
			headers['Content-Type'] = 'text/event-stream'
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
			.then((response) => {
				return response.json()
					.then((res) => {
						if (res.code === 400) {
							throw res
						}
						return res
					})
					.catch((err) => {
						throw err
					})
			})
			.catch((err) => {
				throw err
			})
	}

	async post<T>(url: string, _body: object | FormData = {}): Promise<T> {
		const auth = useAuthStore()

		const body = _body instanceof FormData ? _body : JSON.stringify(_body)

		return fetch(this.api + url, {
			method: 'POST',
			headers: this.getHeaders(auth.token, {
				isFormData: _body instanceof FormData
			}),
			body
		})
			.then((response) => {
				return response.json()
					.then((res) => {
						if (res.code === 400) {
							throw res
						}
						return res
					})
					.catch((err) => {
						throw err
					})
			})
			.catch((err) => {
				throw err
			})
	}

	async patch<T>(url: string, body: object = {}): Promise<T> {
		const auth = useAuthStore()

		return fetch(this.api + url, {
			method: 'PATCH',
			headers: this.getHeaders(auth.token),
			body: JSON.stringify(body)
		})
			.then((response) => {
				return response.json()
					.then((res) => {
						if (res.code === 400) {
							throw res
						}
						return res
					})
					.catch((err) => {
						throw err
					})
			})
			.catch((err) => {
				throw err
			})
	}

	async delete(url: string): Promise<Response> {
		const auth = useAuthStore()

		return fetch(this.api + url, {
			method: 'DELETE',
			headers: this.getHeaders(auth.token)
		})
			.then((response) => {
				return response.json()
					.then((res) => {
						if (res.code === 400) {
							throw res
						}
						return res
					})
					.catch((err) => {
						throw err
					})
			})
			.catch((err) => {
				throw err
			})
	}

	setSubscription(url: string, clientId: string): Promise<Response> {
		const auth = useAuthStore()

		const body = JSON.stringify({
			clientId,
			subscriptions: [url]
		})

		return fetch(this.api + '/realtime', {
			method: 'POST',
			headers: this.getHeaders(auth.token),
			body
		})
	}

	async connect<T>(options: ConnectOptions<T> = {
		collection: '',
		id: '',
		expand: [],
		cb: () => {}
	}): Promise<void> {
		const url = `${options.collection}/${options.id}`

		const request = async () => {
			return await this.get<T>(`/collections/${options.collection}/records/${options.id}`, {
				expand: options.expand
			})
		}

		const eventSource = new EventSource(this.api + '/realtime')
		eventSource.addEventListener('PB_CONNECT', (event: MessageEvent) => {
			const data = JSON.parse(event.data)
			this.setSubscription(url, data.clientId)
		}, { once: true })

		options.cb(await request())
		eventSource.addEventListener(url, async () => options.cb(await request()))
	}
}

export default new Http()
