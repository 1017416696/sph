import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index";
import store from  "@/store/index"
import TypeNav from "@/components/TypeNav/index.vue";
import Carousel from "@/components/Carousel/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import '@/mock/mockServe'
import 'swiper/css/swiper.css'

// 统一接收 api/index.js 文件中暴露的函数
import * as API from '@/api/index'

import VueLazyload from 'vue-lazyload'
import gif from '@/assets/loading.gif'

// API 是一个包含 index.js 文件中所有请求接口的对象
//console.log(API)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.devtools = true

app.provide('$API', API)
app.use(router).use(store).use(VueLazyload,{loading: gif})
app.component('TypeNav',TypeNav).component('Carousel',Carousel).component('Pagination',Pagination)

app.mount('#app')


