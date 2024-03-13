import { defineStore } from 'pinia'

export interface State {
	search: string;
}

export const useSearchStore = defineStore({
	id: 'search',

	state: (): State => <State>({
		search: '',
	}),

	getters: {
	},

	actions: {
		update(value: string) {
			this.search = value
		},
	},
})