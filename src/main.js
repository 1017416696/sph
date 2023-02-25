import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/index";
import store from  "@/store/index"
import TypeNav from "@/components/TypeNav/index.vue";
import Carousel from "@/components/Carousel/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import '@/mock/mockServe'
import 'swiper/css/swiper.css'

const app = createApp(App)

app.config.devtools = true


app.use(router).use(store)
app.component('TypeNav',TypeNav).component('Carousel',Carousel).component('Pagination',Pagination)

app.mount('#app')


