import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import * as actions from './action';
import * as getters from './getter';
import state from './state';
import mutations from './mutation'

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    plugins:[
        // createPersistedState({
        //     storage:{
        //         getItem:key =>wx.getStorageSync(key),
        //         setItem:(key,value)=>wx.setItemSync(key,value),
        //         removeItem:key=>wx.removeStorage(key)
        //     }
        // })
    ]
})