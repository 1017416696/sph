import { createRouter, createWebHashHistory } from 'vue-router'
import store from "@/store/index.js";
import {removeToken} from "@/utils/token.js";
import {next} from "lodash/seq.js";
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
                show: false,
                keepAlive: false // 关闭页面缓存
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
        name: 'Detail',
        component: () => import('@/views/Detail/index.vue')
    },
    {
        path: '/addcartsuccess',
        name: 'AddCartSuccess',
        component: () => import('@/views/AddCartSuccess/index.vue'),
        meta: {show: true}
    },
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: () => import('@/views/ShopCart/index.vue'),
        meta: {show: true}
    },
    {
        path: '/trade',
        name: 'Trade',
        component: () => import('@/views/Trade/index.vue'),
        meta: {show: true},
        beforeEnter: (to, from, next) => {
            let token = store.state.user.token
            //在未登录的状态下在购物车页面点击结算，会直接跳转到 login,路由地址中包含 query 参数 redirect
            if (token && from.query.redirect=='/trade' || from.path == '/shopcart'){
                next()
            }else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: () => import('@/views/Pay/index.vue'),
        meta: {show: true},
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade'){
                next()
            }else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        name: 'paySuccess',
        component: () => import('@/views/PaySuccess/index.vue'),
        meta: {show: true}
    },
    {
        path: '/center',
        name: 'Center',
        component: () => import('@/views/Center/index.vue'),
        meta: {show: true},
        children:[
            {
                path:'myorder',
                name:'MyOrder',
                component:()=>import('@/views/Center/MyOrder/index.vue')
            },
            {
                path:'teamorder',
                name:'TeamOrder',
                component:()=>import('@/views/Center/TeamOrder/index.vue')
            },
            //需要重定向
            {
                path: '/center',
                redirect:'/center/myorder'
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    //滚动行为
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
        //登录后想去 login 或者 register
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
        if(to.path == '/trade' || to.path=='/pay' || to.path=='/paysuccess' || to.path.includes('/center'))
            next(`/login?redirect=${to.path}`)
        else next()
    }
})


export default router
