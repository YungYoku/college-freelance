import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'DefaultLayout',
		component: () => import('@/components/layouts/DefaultLayout.vue'),
		meta: {
			rules: ['auth']
		},
		children: [
			{
				path: '/main',
				name: 'Main',
				component: () => import('@/views/MainView.vue'),
				meta: {
					rules: ['auth']
				},
			},
			{
				path: '/offers',
				name: 'Offers',
				component: () => import('@/views/OffersView.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/offer/:id',
				name: 'Offer',
				component: () => import('@/views/OfferView.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/new-offer',
				name: 'NewOffer',
				component: () => import('@/views/NewOffer.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/made-offers',
				name: 'MadeOffers',
				component: () => import('@/views/MadeOffers.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/executing-offers',
				name: 'ExecutingOffers',
				component: () => import('@/views/ExecutingOffers.vue'),
				meta: {
					rules: ['auth']
				}
			},
			{
				path: '/profile',
				name: 'Profile',
				component: () => import('@/views/ProfileView.vue'),
				meta: {
					rules: ['auth']
				}
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/LoginView.vue'),
		meta: {
			rules: []
		}
	},
	{
		path: '/registration',
		name: 'Registration',
		component: () => import('@/views/RegistrationView.vue'),
		meta: {
			rules: []
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

	if (toRules.includes('auth')) {
		if (to.path === '/') return '/main'
		if (authStore.isLoggedIn) return true
		return '/login'
	} else {
		if (authStore.isLoggedIn) return '/main'
		return true
	}
})

export default router