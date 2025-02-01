import { defineStore } from 'pinia'

export interface State {
	search: string;
	loading: boolean;
}

export const useSearchStore = defineStore('search', {
	state: (): State => <State>({
		search: '',
		loading: false,
	}),

	getters: {
	},

	actions: {
		update(value: string) {
			this.search = value
		},

		setLoading(value: boolean) {
			this.loading = value
		}
	},
})