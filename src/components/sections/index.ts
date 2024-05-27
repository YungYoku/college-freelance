import { defineAsyncComponent } from 'vue'

const Chat = defineAsyncComponent(() => import('./Chat.vue'))
const Footer = defineAsyncComponent(() => import('./Footer.vue'))
const Header = defineAsyncComponent(() => import('./Header.vue'))

export {
	Chat,
	Footer,
	Header
}