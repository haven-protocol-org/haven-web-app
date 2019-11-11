import {GET_BLOCK_HEIGHT_FAILED, GET_BLOCK_HEIGHT_SUCEED} from "../actions/types";

const INITIAL_STATE = {height:0, error:'', isFetching:false};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_BLOCK_HEIGHT_SUCEED:
            return {height:action.payload, error:'', isFetching: false};
        case GET_BLOCK_HEIGHT_FAILED:
            return {...state, error:'', isFetching:false};
        default:
            return state;
    }
}
