import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import { DefaultLayout } from '@/components/layouts'
import { useAuthStore } from '@/stores/auth.ts'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'DefaultLayout',
		component: DefaultLayout,
		meta: {
			rules: []
		},
		children: [
			{
				path: '/',
				name: 'Main',
				component: () => import('@/views/main.vue'),
				meta: {
					rules: []
				},
			},
			{
				path: '/offer/:id',
				name: 'Offer',
				component: () => import('@/views/offer.vue'),
				meta: {
					rules: []
				}
			},
			{
				path: '/offer-edit/:id',
				name: 'Offer Edit',
				component: () => import('@/views/editOffer.vue'),
				meta: {
					rules: []
				}
			},
			{
				path: '/new-offer',
				name: 'NewOffer',
				component: () => import('@/views/newOffer.vue'),
				meta: {
					rules: ['auth', 'customer']
				}
			},
			{
				path: '/made-offers',
				name: 'MadeOffers',
				component: () => import('@/views/madeOffers.vue'),
				meta: {
					rules: ['auth', 'customer']
				}
			},
			{
				path: '/executing-offers',
				name: 'ExecutingOffers',
				component: () => import('@/views/executingOffers.vue'),
				meta: {
					rules: ['auth', 'executor']
				}
			},
			{
				path: '/favorite',
				name: 'Favorite',
				component: () => import('@/views/favorite.vue'),
				meta: {
					rules: ['auth', 'executor']
				}
			},
			{
				path: '/users/:id',
				name: 'User',
				component: () => import('@/views/user.vue'),
				meta: {
					rules: []
				}
			},
			{
				path: '/profile',
				name: 'Profile',
				component: () => import('@/views/profile.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/search',
				name: 'Search',
				component: () => import('@/views/search.vue'),
				meta: {
					rules: []
				}
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login.vue'),
		meta: {
			rules: ['no-auth']
		}
	},
	{
		path: '/registration',
		name: 'Registration',
		component: () => import('@/views/registration.vue'),
		meta: {
			rules: ['no-auth']
		}
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

router.beforeEach((to) => {
	const authStore = useAuthStore()
	const toRules = to.meta.rules as Array<string> ?? []

	if (toRules.length === 0) {
		return true
	}
	if (toRules.includes('auth')) {
		if (!authStore.isLoggedIn) return '/login'

		if (toRules.includes('customer')) {
			if (authStore.isCustomer || authStore.isAdmin) return true
			return '/'
		}
		if (toRules.includes('executor')) {
			if (authStore.isExecutor || authStore.isAdmin) return true
			return '/'
		}

		return true
	} else if (toRules.includes('no-auth')) {
		if (authStore.isLoggedIn) return '/'

		return true
	}
})

export default router