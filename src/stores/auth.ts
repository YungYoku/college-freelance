import { defineStore } from 'pinia'
import { emptyUser, IUser } from '@/interfaces/User'
import { LocalStorage } from '@/plugins'

export interface State {
    user: IUser;
    token: string;
}

export const useAuthStore = defineStore({
	id: 'auth',

	state: (): State => <State>({
		user: { ...emptyUser },

		token: localStorage.token ? JSON.parse(localStorage.token) : '',
	}),

	getters: {
		isLoggedIn: state => state.token.length > 0,
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