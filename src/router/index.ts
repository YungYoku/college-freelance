import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/MainView.vue'),
        meta: {
            rules: ['auth']
        }
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
        path: '/user-offers',
        name: 'UserOffers',
        component: () => import('@/views/UserOffers.vue'),
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
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/ProfileView.vue'),
        meta: {
            rules: ['auth']
        }
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
    const token = localStorage.token ?? null
    const toRules = to.meta.rules as Array<string> ?? []

    if (toRules.includes('auth')) {
        if (token) return true
        return '/login'
    } else {
        if (token) return '/'
        return true
    }
})

export default router