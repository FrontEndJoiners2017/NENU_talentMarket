import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    //全局变量state
    state: {
        isLogined: false,
        userInfo: {
            ID: "",
            name: ""
        }
    },
    //getters方法查询state
    getters: {
        //返回登录状态
        getIsLogined: state => {
            return state.isLogined
        },
        //返回用户信息
        getUserInfo: state => {
            return state.userInfo
        }
    },
    //mutations操作state
    mutations: {
        //登录，保存登录状态和用户信息
        LOGIN: (state, loginInfo) => {
            state.isLogined = true
            state.userInfo.ID = loginInfo.loginInfo.ID
            state.userInfo.name = loginInfo.loginInfo.name
        },
        //退出登录，清除登录状态和用户信息
        LOGOUT: state => {
            state.isLogined = false
            state.userInfo.ID = ''
            state.userInfo.name = ''
        },
        //清除全部信息
        REMOVEALL: state => {
            state.isLogined = false
            state.userInfo.ID = ''
            state.userInfo.name = ''
        }
    },
    //actions驱动mutations
    actions: {
        loginAction: (context, loginInfo) => {
            context.commit('LOGIN', loginInfo)
        },
        logoutAction: context => {
            context.commit('LOGOUT')
        },
        removeAllAction: context => {
            context.commit('REMOVEALL')
        }
    }
})

export default store;