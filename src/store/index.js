import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './action';
import * as getters from './getter';
import state from './state';
import mutations from './mutation';

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})