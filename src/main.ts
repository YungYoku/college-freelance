import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { datetimePlugin, formatPlugin } from './plugins'
import './assets/index.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(datetimePlugin)
app.use(formatPlugin)

app.mount('#app')
