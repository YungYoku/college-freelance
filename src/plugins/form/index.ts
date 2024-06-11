import { reactive, UnwrapRef } from 'vue'

type Errors<T> = {
	[key in keyof T]: {
		code: string
		message: string
	}
}
type BaseType<T> = {
	[key in keyof T]: string | number | boolean | Date | Array<string | number> | null | object
}
type ListItem<T> = {
	value: T,
	error: string | null
}
type List<T extends BaseType<T>> = {
	[key in keyof T]: UnwrapRef<ListItem<T[key]>>
}

const Form = <I extends BaseType<I>>(base: I) => {
	const keys: Array<keyof I> = Object.keys(base) as Array<keyof I>

	const list: List<I> = keys.reduce((obj, key) => {
		obj[key] = reactive<ListItem<I[keyof I]>>({
			value: base[key],
			error: null
		})

		return obj
	}, {} as List<I>)


	const set = (data: I) => {
		keys.forEach(key => {
			const prevValue = list[key].value
			list[key].value = data[key] as typeof prevValue
		})
	}

	const get = () => {
		const result: I = {} as I

		keys.forEach(key => {
			result[key] = list[key].value as I[keyof I]
		})

		return result
	}

	const setErrors = (errors: Errors<I>) => {
		const errorKeys: Array<keyof I> = Object.keys(errors) as Array<keyof I>

		errorKeys.forEach(key => {
			list[key].error = errors[key].message
		})
	}

	const clearErrors = () => {
		keys.forEach(key => {
			list[key].error = null
		})
	}

	return {
		...list,
		set,
		get,
		setErrors,
		clearErrors
	}
}

export default Form
