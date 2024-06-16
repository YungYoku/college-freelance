import { defineAsyncComponent } from 'vue'

const Card = defineAsyncComponent(() => import('./card.vue'))
const Grid = defineAsyncComponent(() => import('./grid.vue'))
const Island = defineAsyncComponent(() => import('./island.vue'))
const Modal = defineAsyncComponent(() => import('./modal.vue'))
const Page = defineAsyncComponent(() => import('./page.vue'))
const StepByStep = defineAsyncComponent(() => import('./stepByStep.vue'))

export {
	Card,
	Grid,
	Island,
	Modal,
	Page,
	StepByStep
}