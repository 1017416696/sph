import { createRouter, createWebHashHistory } from 'vue-router'
import store from "@/store/index.js";
import {removeToken} from "@/utils/token.js";
const routes =  [
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta:
            {
                show: true
            }
    },
    {
        path:'/',
        redirect:'/home'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/index.vue'),
        meta:
            {
                show: false
            }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Register/index.vue'),
        meta:
            {
                show: false
            }
    },
    {
        path: '/search/:keyword?',
        name: 'search',
        component: () => import('@/views/Search/index.vue'),
        meta: {show: true}
    },
    {
        path: '/detail/:skuid',
        name: 'detail',
        component: () => import('@/views/Detail/index.vue')
    },
    {
        path: '/addcartsuccess',
        name: 'addCart',
        component: () => import('@/views/AddCartSuccess/index.vue'),
        meta: {show: true}
    },
    {
        path: '/shopcart',
        name: 'shopCart',
        component: () => import('@/views/ShopCart/index.vue'),
        meta: {show: true}
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
         return {top:0}
    }
})
//全局前置守卫

router.beforeEach(async (to, from,next) => {
    let token = store.state.user.token
    let nickName = store.state.user.userInfo.nickName
//    if (token && to.name == 'login') {
//        // 将用户重定向到登录页面
//        return { name: 'home' }
//    }
    //登录的情况
    if (token) {
        //登录后想去 login或者 register
        if (to.path=='/login' || to.path=='/register')
            next({path:'/home'})
            //已经登录但访问的是除 register和login 以外的路由
        else {
            //有用户信息才能放行
            if (nickName) next()
                //没用户信息就获取用户信息后才放行
            else {
                try {
                    //成功获取用户信息才放行
                    await store.dispatch('getUserInfo')
                    next()
                    // 走catch 是 因为token 过期的情况，需要重新登录
                }catch (e){
                    await store.dispatch('userLogout')
                    next({path:'/login'})
                }
            }
        }
    }
    //未登录的情况
    else {
        next()
    }


})


export default router
