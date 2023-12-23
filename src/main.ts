import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Sheet from './components/sheet/MainSheet.vue'

createApp(Sheet).mount('#sheet')
createApp(App).mount('#app')
