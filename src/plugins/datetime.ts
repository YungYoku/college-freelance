import { App, Plugin } from 'vue'

export type Method = 'default' | 'datetime' | 'time' | 'fullTime' | 'fullDatetime' | 'monthAndDay'
interface Methods {
	default: () => string
	datetime: () => string
	time: () => string
	fullTime: () => string
	fullDatetime: () => string
	monthAndDay:() => string
}

const Datetime: Plugin = {
	install (app: App) {
		app.config.globalProperties.$date = (date: Date | null, type: Method = 'default') => {
			if (date === null) return ''

			const year = date.getFullYear()
			const getValue = (value: number) => String(value).padStart(2, '0')
			const month = getValue(date.getMonth() + 1)
			const day = getValue(date.getDate())
			const hour = getValue(date.getUTCHours())
			const min = getValue(date.getMinutes())
			const second = getValue(date.getSeconds())

			const methods: Methods = {
				default: () => `${year}-${month}-${day}`,
				datetime: () => `${year}-${month}-${day}, ${hour}:${min}`,
				time: () => `${hour}:${min}`,
				fullTime: () => `${hour}:${min}:${second}`,
				fullDatetime: () => `${year}-${month}-${day}, ${hour}:${min}:${second}`,
				monthAndDay: () => `${month}-${day}`
			}

			return methods[type] ? methods[type]() : ''
		}
	},
}

export default Datetime
