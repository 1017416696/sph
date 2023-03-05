import {reqGetTradeInfo, reqGetUserAddress, reqSubmitOrder} from "@/api/index.js";

const state = {
    address:[],
    tradeInfo:{},
//    tradeNo:''
}

const mutations = {
    USERADDRESS(state,address){
        state.address = address
    },
    TRADEINFO(state,tradeInfo){
        state.tradeInfo = tradeInfo
    },
//    SUBMITORDER(state,tradeNo){
//        state.tradeNo = tradeNo
//    }
}

const actions = {
    //获取用户地址
    async getUserAddress({commit}) {
        let result = await reqGetUserAddress()
        if (result.code == 200) commit('USERADDRESS', result.data)
    },
    //获取订单交易页信息
    async getTradeInfo({commit}){
        let result = await reqGetTradeInfo()
        if (result.code == 200) commit('TRADEINFO',result.data)
    },
//    //提交用户订单
//    async submitUserOrder({commit},{tradeNo,data}){
//        let result = await reqSubmitOrder({tradeNo,data})
//        console.log(result)
//        if (result.code == 200){
//            commit('SUBMITORDER',result.data)
//        }
//    }
}
const getters = {

}

export default {
    state,mutations,actions,getters
}


