import { defineStore } from 'pinia'
import { emptyUser, IUser } from '@/interfaces/User'
import { LocalStorage } from '@/plugins'

export interface State {
    user: IUser
    token: string
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
		isRewardClaimable: state => {
			if (!state.user) return false
			if (!state.user.checked_at) return true

			const checked_at = new Date(state.user.checked_at)
			const today = new Date()

			const dateComparison = checked_at.getDate() !== today.getDate()
			const monthComparison = checked_at.getMonth() !== today.getMonth()
			const yearComparison = checked_at.getFullYear() !== today.getFullYear()
			return dateComparison || monthComparison || yearComparison

		},
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