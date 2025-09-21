import { createApp } from 'vue'
import './style.css'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'

// Eager import all icons
const importIcons = import.meta.glob('/src/components/**/*.vue', { eager: true })

function registerIcons(app: ReturnType<typeof createApp>) : void {
    for (const [path, module] of Object.entries(importIcons)) {
        const componentName = path.split('/').pop()?.replace('.vue', '') as string
        app.component(componentName, (module as any).default)
    }
}

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(ToastPlugin);
app.use(pinia)
app.use(VueSweetalert2)
registerIcons(app)
app.mount('#app')
