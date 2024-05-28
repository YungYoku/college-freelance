import { defineAsyncComponent } from 'vue'

const File = defineAsyncComponent(() => import('./file.vue'))
const Icon = defineAsyncComponent(() => import('./icon.vue'))
const Image = defineAsyncComponent(() => import('./image.vue'))
const PageTitle = defineAsyncComponent(() => import('./pageTitle.vue'))

export {
	File,
	Icon,
	Image,
	PageTitle
}