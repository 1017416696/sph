import { createStore } from 'vuex'

//引入小仓库
import home from './module/home'
import search from './module/search'
import detail from "./module/detail";
import shopcart from "@/store/module/shopcart/index.js";
import user from "@/store/module/user/index.js";

const store = createStore({
    modules:{home,search,detail,shopcart,user}
})

export default store


