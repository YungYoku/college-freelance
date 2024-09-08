import { defineAsyncComponent } from 'vue'

const Chat = defineAsyncComponent(() => import('./chat.vue'))
import Footer from './footer.vue'
import Header from './header.vue'
import ModalDeleteConfirmation from './modalDeleteConfirmation.vue'
const Rating = defineAsyncComponent(() => import('./rating.vue'))

export {
	Chat,
	Footer,
	Header,
	ModalDeleteConfirmation,
	Rating
}