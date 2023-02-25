import {reqDeleteCart, reqGetCartList, reqUpdateCartChecked} from "@/api/index.js";

const state = {
    cartList:[]
}

const mutations = {
    SHOPCARTLIST(state,cartList){
        state.cartList = cartList
    }
}

const actions = {
    async shopCartList({commit}){
      let result = await reqGetCartList()
        if (result.code == 200){
            commit('SHOPCARTLIST',result.data)
        }
    },
    async updateCart({commit},{skuId,isChecked}){
       let result =  await reqUpdateCartChecked(skuId,isChecked)
        if (result.code == 200) return  'ok'
        else {
            return Promise.reject(new Error('fail'))
        }
    },
    async deleteCart({commit},skuId){
        let result = await reqDeleteCart(skuId)
        if (result.code == 200) return  'ok'
        else {
            return Promise.reject(new Error('fail'))
        }
    },
    //删除选中的商品
    deleteCheckedCart(context){
        console.log(context)
        let promiseAll = []
        context.getters.cartList.cartInfoList.forEach(item=>{
            if (item.isChecked == 1){
                let promise = context.dispatch('deleteCart',item.skuId)
                promiseAll.push(promise)
            }
        })

        return Promise.all(promiseAll)
    },

    //全选按钮
    updateAllCartChecked({dispatch,getters},isChecked){
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = dispatch('updateCart',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
}

export default {
    state,mutations,actions,getters
}


