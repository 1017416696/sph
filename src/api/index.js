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

///请求地址 /api/list post 需要携带参数，参数是一个对象
/*
    {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}

*/
//当前接口给服务器传递 params 参数至少是一个空对象，对象里的属性可有可无
//所以调用该函数时，至少要传递一个空对象
//该接口传递的参数是一个对象，所以用 data
export const reqGetSearchInfo = (params)=>request({
    url:'/list',
    method:'post',
    data: params
})


export const reqGetDetailInfo = (skuId)=>request.get(`/item/${skuId}`)

// /api/cart/addToCart/{ skuId }/{ skuNum } POST
//将产品添加到购物车中(或者更新某一个产品的个数)
//export const reqAddOrUpdateShopCart = (skuId,skuNum)=>request.post(`/cart/addToCart/${skuId}/${skuNum}`)
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>request({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:'post'
})

// /api/cart/cartList get 无参数
export const reqGetCartList = ()=>request.get('/cart/cartList')

 //   /api/cart/checkCart/{skuID}/{isChecked} get skuID和 isChecked
//修改商品选中状态
export const reqUpdateCartChecked =(skuId,isChecked)=>request.get(`/cart/checkCart/${skuId}/${isChecked}`)

//删除购物车商品
///api/cart/deleteCart/{skuId}
export const reqDeleteCart = (skuId)=>request.delete(`/cart/deleteCart/${skuId}`)

//获取验证码
 //   /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=>request.get(`/user/passport/sendCode/${phone}`)

//注册新用户
///api/user/passport/register post 携带phone password code
export const reqRegisterUser = (data)=>request({
    url:'/user/passport/register',
    method:'post',
    data
})

//用户登陆
//phone password 必传
export const reqLogin = (data)=>request({
    url:'/user/passport/login',
    method:'post',
    data
})

//获取用户登陆信息
// /api/user/passport/auth/getUserInfo get
export const reqGetUserInfo = ()=>request.get('/user/passport/auth/getUserInfo')

//退出登陆
///api/user/passport/logout get
export const reqUserLogout = ()=>request.get('/user/passport/logout')
