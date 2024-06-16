import { ref } from 'vue'

class Screen {
	static inst: Screen | null = null
	static getInst() {
		// eslint-disable-next-line
		return Screen.inst || (Screen.inst = new Screen())
	}

	constructor() {
		this.#update()
		window.addEventListener('resize', this.#update.bind(this))
	}

	#size = ref('xl')

	#update() {
		const value = document.body.clientWidth

		if (value <= 768) this.#size.value = 's'
		else if (value <= 1024) this.#size.value = 'm'
		else if (value <= 1280) this.#size.value = 'l'
		else if (value <= 1440) this.#size.value = 'xl'
	}

	isSize(size: string) {
		return this.#size.value === size
	}
}

export default Screen.getInst()
