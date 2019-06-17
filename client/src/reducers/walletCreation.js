import {CREATE_WALLET_FAILED, CREATE_WALLET_FETCHING, CREATE_WALLET_SUCCEED} from "../actions/types";

export const NO_SEED = 'no_seed';

const INITIAL_STATE = {seed: NO_SEED, isFetching: false, error: null};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CREATE_WALLET_FETCHING:
            return {...state, isFetching: true};
        case CREATE_WALLET_SUCCEED:
            return {seed: action.payload.seed, isFetching:false};
        case CREATE_WALLET_FAILED:
            return {...state, error: action.payload.error, isFetching:false};
        default:
            return state;
    }
}
