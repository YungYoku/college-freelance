import { defineAsyncComponent } from 'vue'

const File = defineAsyncComponent(() => import('./File.vue'))
const Icon = defineAsyncComponent(() => import('./Icon.vue'))
const Image = defineAsyncComponent(() => import('./Image.vue'))
const PageTitle = defineAsyncComponent(() => import('./PageTitle.vue'))

export {
	File,
	Icon,
	Image,
	PageTitle
}