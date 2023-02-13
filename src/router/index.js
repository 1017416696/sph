import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
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
        }
    ]
})

export default router
