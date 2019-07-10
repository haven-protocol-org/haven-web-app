import {
    GET_PRICE_DATA_FAILED,
    GET_PRICE_DATA_FETCHING,
    GET_PRICE_DATA_SUCCEED
} from "../actions/types";


const INITIAL_STATE = {
    prices:[],
    error:"",
    isFetching:false
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_PRICE_DATA_SUCCEED:
            return { prices: action.payload.prices, isFetching:false, error:""};
        case GET_PRICE_DATA_FETCHING:
            return { ...state, isFetching: true };
        case GET_PRICE_DATA_FAILED:
            return { ...state, error: action.payload, isFetching: false };
        default:
            return state;
    }
}
