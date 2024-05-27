import { defineAsyncComponent } from 'vue'

const AuthLayout = defineAsyncComponent(() => import('./AuthLayout.vue'))
const DefaultLayout = defineAsyncComponent(() => import('./DefaultLayout.vue'))

export {
	AuthLayout,
	DefaultLayout
}