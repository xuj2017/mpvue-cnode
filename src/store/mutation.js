import * as types from './mutation-type';

const mutations ={
    [types.SET_PARTICIPATE](state,participate){
        state.participate = participate;
    },
    [types.SET_CREATE](state,create){
        state.create = create;
    },
    [types.SET_LOFINNAME](state,loginname){
        state.loginname = loginname
    }
}

export default mutations;