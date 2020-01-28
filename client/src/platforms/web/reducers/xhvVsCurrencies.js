
import currencies from "../../../constants/assets";
import {XHV_VS_CURRENCIES_SUCCEED} from "../actions/types";




const INITIAL_STATE = currencies.reduce( (initialState, currency) => {

    initialState[currency.ticker] = {
        token:currency.token,
        lastPrice:0,
        symbol:'',
        prices:[],
        change:0};

        return initialState;

        },{});





export const xhvVsCurrencies = (state = INITIAL_STATE, action) => {


    switch (action.type) {

        case XHV_VS_CURRENCIES_SUCCEED:
            return {...state, ...action.payload};


        default:
            return state;
    }
};
