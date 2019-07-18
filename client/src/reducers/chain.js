import {GET_BLOCK_HEIGHT_FAILED, GET_BLOCK_HEIGHT_SUCEED} from "../actions/types";


const INITIAL_STATE = {height:-1, error:''};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_BLOCK_HEIGHT_SUCEED:
            return {height:action.payload, error:''};
        case GET_BLOCK_HEIGHT_FAILED:
            return {...state, error:''};
        default:
            return state;
    }
}
