import { reactive } from 'vue'

type ListValue = string | number | boolean | Array<string | number> | Date | null
type ListItem = {
	value: ListValue,
	error: string | null
}

const Form = <T>(base: { [key in keyof T]?: ListValue } = {}) => {
	const list: { [key in keyof T]?: ListItem } = {}

	const get = () => {
		const result: { [key in keyof T]?: ListValue } = {}
		const keys = Object.keys(list)

		keys.forEach(item => {
			result[item] = list[item].value
		})

		return result
	}

	Object.keys(base).forEach((key) => {
		list[key] = reactive({
			value: base[key],
			error: null
		})
	})
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
