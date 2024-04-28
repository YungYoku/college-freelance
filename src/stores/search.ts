import { defineStore } from 'pinia'

export interface State {
	search: string;
	loading: boolean;
}

export const useSearchStore = defineStore({
	id: 'search',

	state: (): State => <State>({
		search: '',
		loading: false,
	}),

	getters: {
	},

	actions: {
		update(value: string) {
			this.search = value
			this.loading = true
		},

		endLoading() {
			this.loading = false
		}
	},
})