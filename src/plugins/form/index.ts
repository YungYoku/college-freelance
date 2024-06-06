import { reactive } from 'vue'

type BaseType<T> = {
	[key in keyof T]: string | number | boolean | Date | Array<string | number> | null | object
}
type ListItem<T> = {
	value: T,
	error: string | null
}
type List<T extends BaseType<T>> = {
	[key in keyof T]: ListItem<T[key]>
}

const Form = <I extends BaseType<I>>(base: I) => {
	const keys: Array<keyof I> = Object.keys(base) as Array<keyof I>

	const list: List<I> = keys.reduce((obj: List<I>, key) => {
		const value: I[keyof I] = base[key]
		obj[key] = reactive<ListItem<I[keyof I]>>({
			value,
			error: null
		})

		return obj
	}, {} as List<I>)


	const get = () => {
		const result: I = base

		keys.forEach(key => result[key] = list[key]?.value)

		return result
	}

	return {
		...list,
		get,
	}

	// prepareErrors(errors) {
	// 	const readyErrors = {}
	//
	// 	Object
	// 		.keys(errors)
	// 		.forEach(key => {
	// 			readyErrors[key] = errors[key][0]
	// 		})
	//
	// 	return readyErrors
	// }
	//
	// setErrors(errors) {
	// 	const keys = Object.keys(errors)
	// 	this.error.status = keys.length > 0
	//
	// 	keys.forEach(key => {
	// 		if (this._list[key]) {
	// 			this._list[key].setError(errors[key])
	//
	// 		} else if (key.indexOf('.')) {
	// 			const parentKey = key.split('.')[0]
	// 			const childrenKey = key.split(`${parentKey}.`)[1]
	// 			const childrenErrors = {}
	//
	// 			childrenErrors[childrenKey] = errors[key]
	//
	// 			if (this._list[parentKey]) {
	// 				if (this._list[parentKey] instanceof Field) {
	// 					this._list[parentKey].setError(childrenErrors)
	// 				}
	// 				else if (this._list[parentKey] instanceof List){
	// 					this._list[parentKey].setError(errors[key])
	// 				}
	// 				else {
	// 					this._list[parentKey].setErrors(childrenErrors)
	// 				}
	// 			}
	// 		}
	// 	})
	// }
	//
	// clearError() {
	// 	Object.keys(this._list).forEach(key => {
	// 		this._list[key].clearError()
	// 	})
	// }
}

export default Form
