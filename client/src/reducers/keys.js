import {
    QUERY_MNEMONIC_FETCHING, QUERY_MNEMONIC_SUCCEED,
    QUERY_PRIVATE_VIEW_KEY_FETCHING,
    QUERY_PRIVATE_VIEW_KEY_SUCCEED
} from "../actions/types";


export const NO_KEY = -1;

const INITIAL_STATE = {privateViewKey:{key:NO_KEY, isFetching:false}, mnemonicKey:{key:NO_KEY, isFetching:false}};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case QUERY_PRIVATE_VIEW_KEY_FETCHING:
            return {...state,privateViewKey:{... state.privateViewKey, isFetching:true }};
        case QUERY_MNEMONIC_FETCHING:
            return {...state,mnemonicKey:{... state.mnemonicKey, isFetching:true }};
        case QUERY_PRIVATE_VIEW_KEY_SUCCEED:
            return {...state,privateViewKey:{key: action.payload, isFetching:false }};
        case QUERY_MNEMONIC_SUCCEED:
            return {...state,mnemonicKey:{key: action.payload, isFetching:false }};
            default:
                return state;
    }
}


