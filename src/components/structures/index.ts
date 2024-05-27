import { defineAsyncComponent } from 'vue'

const Card = defineAsyncComponent(() => import('./Card.vue'))
const Grid = defineAsyncComponent(() => import('./Grid.vue'))
const Island = defineAsyncComponent(() => import('./Island.vue'))
const Modal = defineAsyncComponent(() => import('./Modal.vue'))
const Page = defineAsyncComponent(() => import('./Page.vue'))

export {
	Card,
	Grid,
	Island,
	Modal,
	Page
}