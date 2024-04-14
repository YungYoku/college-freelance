import { defineStore } from 'pinia'
import { User } from '@/interfaces/User'
import LocalStorage from '@/plugins/localStorage'

export interface State {
    user: User;
    token: string;
}

export const useAuthStore = defineStore({
	id: 'auth',

	state: (): State => <State>({
		user: {
			avatar: '',
			collectionId: '',
			collectionName: '',
			created: '',
			email: '',
			emailVisibility: false,
			id: '',
			name: '',
			description: '',
			surname: '',
			rating: 0,
			updated: '',
			username: '',
			verified: false,
			role: 'customer',
			university: ''
		},

		token: localStorage.token ? JSON.parse(localStorage.token) : '',
	}),

	getters: {
		isLoggedIn: state => state.token,
		isCustomer: state => state.user.role === 'customer',
		isExecutor: state => state.user.role === 'executor',
		isAdmin: state => state.user.role === 'admin',
	},

	actions: {
		setToken(token: string) {
			this.token = token
			LocalStorage.write('token', token)
		},

		setUser(user: User) {
			this.user = {
				...this.user,
				...user
			}
			LocalStorage.write('user', {
				id: user.id,
				name: user.name
			})
		}
	},
})