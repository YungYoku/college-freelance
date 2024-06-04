import { defineAsyncComponent } from 'vue'

const File = defineAsyncComponent(() => import('./file.vue'))
const Icon = defineAsyncComponent(() => import('./icon.vue'))
const Image = defineAsyncComponent(() => import('./image.vue'))
const Logo = defineAsyncComponent(() => import('./logo.vue'))
const PageTitle = defineAsyncComponent(() => import('./pageTitle.vue'))

export {
	File,
	Icon,
	Image,
	Logo,
	PageTitle
}