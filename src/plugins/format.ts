import { App, Plugin } from 'vue'

export type FormatType = 'percent' | 'number'

class Format {
	get(type: FormatType, value: number, ...props: Array<number>) {
		const types = {
			percent: (value: number) => `${value?.toFixed(2)}%`,

			number(value: number, length: number = 1) {
				return value.toFixed(length)
			}
		}

		return types[type](value, ...props).toString()
	}
}

const format = new Format()

const formatPlugin: Plugin = {
	install (app: App) {
		app.config.globalProperties.$format = (type: FormatType, value: number, ...props: Array<number>) => {
			return format.get(type, value, ...props)
		}
	},
}

export {
	format,
	formatPlugin
}
