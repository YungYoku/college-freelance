import { useAuthStore } from '@/stores/auth.ts'

interface Query {
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

	static inst: Http | null = null
	static getInst() {
		// eslint-disable-next-line
		return Http.inst || (Http.inst = new Http())
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

	getFormatedQuery(query: Query) {
		let result = '?'
		if (query.filter) {
			result += 'filter=' + query.filter + '&'
		}
		if (query.expand) {
			result += 'expand=' + query.expand.join(',') + '&'
		}
		if (query.perPage) {
			result += 'perPage=' + query.perPage + '&'
		}
		if (query.sort) {
			result += 'sort=' + query.sort + '&'
		}
		return result.slice(0, -1)
	}

	async get<T>(_url: string, query: Query | null = null): Promise<T> {
		const auth = useAuthStore()

		let url = _url
		if (query) url += this.getFormatedQuery(query)

		return fetch(this.api + url, {
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

	async post<T>(_url: string, _body: object | FormData = {}, query: Query | null = null): Promise<T> {
		const auth = useAuthStore()

		let url = _url
		if (query) url += this.getFormatedQuery(query)

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

	async patch<T>(_url: string, _body: object | FormData = {}, query: Query | null = null): Promise<T> {
		const auth = useAuthStore()

		let url = _url
		if (query) url += this.getFormatedQuery(query)

		const body = _body instanceof FormData ? _body : JSON.stringify(_body)

		return fetch(this.api + url, {
			method: 'PATCH',
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

	async delete(_url: string, query: Query | null = null): Promise<Response> {
		const auth = useAuthStore()

		let url = _url
		if (query) url += this.getFormatedQuery(query)

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

	eventSource: EventSource | null = null
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

		if (this.eventSource) this.eventSource.close()
		this.eventSource = new EventSource(this.api + '/realtime')
		this.eventSource.addEventListener('PB_CONNECT', (event: MessageEvent) => {
			const data = JSON.parse(event.data)
			this.setSubscription(url, data.clientId)
		}, { once: true })

		options.cb(await request())
		this.eventSource.addEventListener(url, async () => options.cb(await request()))
	}
}

export default Http.getInst()
