import * as types from './mutation-type';

const mutations ={
    [types.SET_PARTICIPATE](state,participate){
        state.participate = participate;
    }
}

export default mutations;