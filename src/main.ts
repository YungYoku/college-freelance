import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/index.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
