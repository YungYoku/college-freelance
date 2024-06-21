import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { datetimePlugin } from './plugins'
import './assets/index.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(datetimePlugin)

app.mount('#app')
