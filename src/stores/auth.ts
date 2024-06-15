import { defineStore } from 'pinia'
import { IUser } from '@/interfaces/User'
import LocalStorage from '@/plugins/localStorage'

export interface State {
    user: IUser;
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
			updated: '',
			username: '',
			verified: false,
			role: 'customer',
			university: '',
			energy: 0,
			disciplines: [],
			referral_code: '',
			favorite: [],
			rating: []
		},

		token: localStorage.token ? JSON.parse(localStorage.token) : '',
	}),

	getters: {
		isLoggedIn: state => state.token,
		isLoaded: state => state.user.id.length > 0,
		isCustomer: state => state.user.role === 'customer',
		isExecutor: state => state.user.role === 'executor',
		isAdmin: state => state.user.role === 'admin',
	},

	actions: {
		setToken(token: string) {
			this.token = token
			LocalStorage.write('token', token)
		},

		setUser(user: IUser) {
			this.user = {
				...this.user,
				...user
			}
			LocalStorage.write('user', {
				id: user.id,
				name: user.name
			})
		},

		setEnergy(energy: number) {
			this.user.energy = energy
		}
	},
})