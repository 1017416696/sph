import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//console.log(nprogress)

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
