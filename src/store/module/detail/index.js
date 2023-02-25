import {reqGetDetailInfo,reqAddOrUpdateShopCart} from "@/api/index.js";
import {getUUID} from '@/utils/uuid_token'

const state = {
    detailInfoList:{},
    uuid_token:getUUID()
}

const mutations = {
    DETAILINFOLIST(state,detailInfoList){
        state.detailInfoList = detailInfoList
    }
}

const actions = {
    async detailInfoList({commit},skuId){
        let result = await reqGetDetailInfo(skuId)
//        console.log(result)
        if (result.code == 200){
            commit("DETAILINFOLIST",result.data)
        }
    },
    //第二个参数是一个对象，所以在dispatch 时也需要以对象的形式传递
    //当前函数返回一个 Promise 对象
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //服务器写入数据成功，不需要返回其他的数据，仅仅只是 code=200，所以不需要三连环操作
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        console.log(result)
        //加入购物车成功
        if (result.code == 200) return 'ok'
            //加入购物车失败
        else {
            return Promise.reject(new Error('fail'))
        }
    }

}

const getters = {
    categoryView(state){
        return state.detailInfoList.categoryView || {}
    },
    skuInfo(state){
        return state.detailInfoList.skuInfo ||{}
    },
    spuSaleAttrList(state){
        return state.detailInfoList.spuSaleAttrList || []
    }

}

export default {
    state,mutations,actions,getters
}
