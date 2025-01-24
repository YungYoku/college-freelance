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

class Datetime {
	get(date: Date | string | null, type: Method = 'default') {
		if (date === null) return ''
		if (typeof date === 'string') {
			try {
				date = new Date(date)
			} catch (e) {
				console.warn(e)
				date = new Date()
			}
		}

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
}

const datetime = new Datetime()

const datetimePlugin: Plugin = {
	install (app: App) {
		app.config.globalProperties.$date = (date: Date | string | null, type: Method = 'default') => {
			return datetime.get(date, type)
		}
	},
}

export {
	datetime,
	datetimePlugin
}
