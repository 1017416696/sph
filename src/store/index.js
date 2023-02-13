import { createStore } from 'vuex'

//引入小仓库
import home from './module/home'
import search from './module/search'


const store = createStore({
    modules:{home,search}
})

export default store


