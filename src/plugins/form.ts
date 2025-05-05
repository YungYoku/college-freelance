import { reactive, UnwrapRef } from 'vue'

type FormField<T> = {
	value: T,
	error: string | null
}
type TransformedForm<T> = {
	[key in keyof T]: UnwrapRef<FormField<T[key]>>
}

type Error = {
	code: string
	message: string
}
type Errors<T> = {
	// eslint-disable-next-line no-unused-vars
	[key in keyof T]: Error
}

const Form = <I>(base: I) => {
	const form = {} as TransformedForm<I>
	const keys: Array<keyof I> = [] as Array<keyof I>
	for (const key in base) {
		keys.push(key)

		form[key] = reactive({
			value: base[key],
			error: null
		})
	}

	const set = (data: I) => {
		for (const key of keys) {
			Object.assign(form[key], {
				value: data[key],
				error: null
			})
		}
	}

	const get = () => {
		const result: I = {} as I

		for (const key of keys) {
			result[key] = form[key].value as I[keyof I]
		}

		return result
	}

	const setErrors = (errors: Errors<I>) => {
		const errorKeys: Array<keyof I> = Object.keys(errors) as Array<keyof I>

		for (const key of errorKeys) {
			form[key].error = errors[key].message
		}
	}

	const clearErrors = () => {
		for (const key of keys) {
			form[key].error = null
		}
	}

	const reset = () => {
		for (const key of keys) {
			Object.assign(form[key], {
				value: base[key],
				error: null
			})
		}
	}

	return {
		...form,
		set,
		get,
		setErrors,
		clearErrors,
		reset
	}
}

export default Form
