import { ref } from 'vue'

type Size = 's' | 'm' | 'l' | 'xl'

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

	#sizes = {
		s: 768,
		m: 1024,
		l: 1280,
		xl: 1440
	}
	#size = ref<Size>('xl')

	#update() {
		const value = document.body.clientWidth

		if (value <= this.#sizes.s) this.#size.value = 's'
		else if (value <= this.#sizes.m) this.#size.value = 'm'
		else if (value <= this.#sizes.l) this.#size.value = 'l'
		else if (value <= this.#sizes.xl) this.#size.value = 'xl'
	}

	isSize(size: string) {
		return this.#size.value === size
	}

	isSmaller(size: Size) {
		const currentSizeValue = this.#sizes[this.#size.value]
		const sizeValue = this.#sizes[size]

		return currentSizeValue < sizeValue
	}

	isLarger(size: Size) {
		const currentSizeValue = this.#sizes[this.#size.value]
		const sizeValue = this.#sizes[size]

		return currentSizeValue > sizeValue
	}
}

export default Screen.getInst()
