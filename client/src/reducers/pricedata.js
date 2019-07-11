import {
    GET_PRICE_DATA_FAILED,
    GET_PRICE_DATA_FETCHING,
    GET_PRICE_DATA_SUCCEED
} from "../actions/types";
import {convertTimestampToDateString} from "../utility";


const INITIAL_STATE = {
    prices:[],
    error:"",
    isFetching:false
};

export function priceData (state = INITIAL_STATE, action) {
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

export function getPriceDates(state) {
    return state.priceData.prices.map( priceItem => convertTimestampToDateString(priceItem[0]) );
}

export function getPriceValues(state) {
    return state.priceData.prices.map( priceItem => priceItem[1] );
}

