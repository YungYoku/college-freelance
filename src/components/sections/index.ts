import { defineAsyncComponent } from 'vue'

const Chat = defineAsyncComponent(() => import('./chat.vue'))
const Footer = defineAsyncComponent(() => import('./footer.vue'))
const Header = defineAsyncComponent(() => import('./header.vue'))
const Rating = defineAsyncComponent(() => import('./rating.vue'))

export {
	Chat,
	Footer,
	Header,
	Rating
}