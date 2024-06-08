// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus' //全局引入
import { createPinia } from 'pinia'
// import { persistedState } from 'pinia-plugin-persistedstate';
import 'element-plus/dist/index.css'
// 引入动画库
import "animate.css"

const app = createApp(App)
const pinia=createPinia()
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
// pinia.use(persistedState({
//     key: 'chat-messages',
//     storage: window.localStorage,
// }));

