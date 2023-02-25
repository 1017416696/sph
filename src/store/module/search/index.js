import {reqGetSearchInfo} from "@/api/index.js";

const state = {
    searchInfoList:{}
}

const mutations = {
    SEARCHINFOLIST(state,searchInfoList){
        state.searchInfoList = searchInfoList
    }
}

const actions = {
    // params默认值是一个空对象，如果在分发action的时候传递了params，就用传递的
    async searchInfoList({commit},params={}){
        let result = await reqGetSearchInfo(params)
//        console.log(result)
        if (result.code == 200){
            commit("SEARCHINFOLIST",result.data)
        }
    }
}

const getters = {
    goodsList(state){
        return state.searchInfoList.goodsList ||[]
    },
    trademarkList(state){
        return state.searchInfoList.trademarkList || []
    },
    attrsList(state){
        return state.searchInfoList.attrsList || []
    }
}

export default {
    state,mutations,actions,getters
}
