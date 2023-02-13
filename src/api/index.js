//该模块是对项目 api 进行统一管理
import request from "@/api/request.js";
import mockRequest from '@/api/mockRequest'
//三级联动接口 http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList get 无参数

//对外暴露一个函数，该函数必须有返回值

// axios 发请求返回的是一个 Promise 对象
export const reqCategoryList = ()=> request({
    url:'/product/getBaseCategoryList',
    method:'get'
})

export const reqGetBannerList = ()=>mockRequest.get('/banner')

export const reqGetFloorList = ()=>mockRequest.get('/floor')
