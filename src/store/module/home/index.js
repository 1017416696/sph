import {reqCategoryList, reqGetBannerList, reqGetFloorList} from "@/api/index.js";

const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}

const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    }
}

const actions = {
   async categoryList({commit}){
       //reqCategoryList() 返回的结果为 Promise 对象，如果想拿到 promise 成功的结果，就需要加上 await
        let result = await reqCategoryList()
        if(result.code == 200){
            commit("CATEGORYLIST",result.data)
        }
    },
    async bannerList({commit}){
       let result = await reqGetBannerList()
        if (result.code == 200){
            commit("BANNERLIST",result.data)
        }
    },
    async floorList({commit}){
       let result = await reqGetFloorList()
//        console.log(result)
        if (result.code == 200){
            commit("FLOORLIST",result.data)
        }
    }
}

const getters = {

}

export default {
    state,mutations,actions,getters
}
