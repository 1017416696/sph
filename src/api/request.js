import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//console.log(nprogress)

import store from "@/store/index.js";

// requests 就是 axios 实例
const requests = axios.create({
    //配置对象
    //基础路径
    baseURL:'/api',
    //请求超时时间
    timeout:5000
})

//请求拦截器

requests.interceptors.request.use((config)=>{
    //config 是一个配置对象，对象中的 headers 属性很重要

    //出现进度条
    nprogress.start()

    //在请求头中添加规定好的请求头 userTempId(后端规定好的)
    if (store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }

    //后端规定好的 token 请求头
    if (store.state.user.token){
       config.headers.token = store.state.user.token
    }

    return config
})

//响应拦截器
//成功回调和失败回调
requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('fail'))
})

export default requests
