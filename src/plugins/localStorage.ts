type data = number | string | boolean | object | Array<number | string | boolean | object>

class LocalStorage {
	constructor() {
	}

	write(key: string, data: data) {
		localStorage[key] = JSON.stringify(data)
	}

	load(key: string) {
		const data = localStorage[key]
		if (data) return JSON.parse(localStorage[key])
		return null
	}

	clear() {
		localStorage.removeItem('user')
		localStorage.removeItem('token')
	}
}

export default new LocalStorage()
