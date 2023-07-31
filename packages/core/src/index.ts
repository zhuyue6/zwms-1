import { createApp } from 'vue'
import App from './app.vue'
import ElementPlus from 'element-plus'
import router from './router'
import { createPinia } from 'pinia'
import './styles/index.scss'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn'
import { setInitTheme } from '@/themes'
import {browserDetermine} from '@/shared/util'


const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
setInitTheme()
browserDetermine()
