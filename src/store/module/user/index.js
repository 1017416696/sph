import {reqGetCode, reqGetUserInfo, reqLogin, reqRegisterUser, reqUserLogout} from "@/api/index.js";
import {getToken,setToken,removeToken} from "@/utils/token.js";

const state = {
    code:"",
    token:getToken(),
    userInfo:{}
}

const mutations = {
    GETPHONECODE(state,code){
        state.code = code
    },
    GETLOGINUSER(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    //清空用户相关信息 ！！！
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        removeToken()
    }

}

const actions = {
        //获取手机验证码
    async getPhoneCode({commit},phone){
        let result = await reqGetCode(phone)
        if (result.code == 200){
            commit('GETPHONECODE',result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('fail'))
        }
    },
    //用户注册
    async getRegisterUser({commit},user){
        let result = await reqRegisterUser(user)
        if (result.code == 200) return 'ok'
        else {
            return Promise.reject(new Error('fail'))
        }
    },
    //用户登陆
    async getLoginUser({commit},user){
        let result = await reqLogin(user)
        if (result.code == 200){
            commit('GETLOGINUSER',result.data.token)
            //本地持久化存储 token
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqGetUserInfo()
        if (result.code == 200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('fail'))
        }
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqUserLogout()
        if (result.code == 200){
            commit('CLEAR')
            return 'ok'
        }else {
            return Promise.reject(new Error('fail'))
        }
    }
}

const getters = {

}

export default {
    state,mutations,actions,getters
}


