import {Ticker} from "./types";
import {AnyAction, combineReducers} from "redux";
import {GET_TRANSFERS_FAILED, GET_TRANSFERS_FETCHING, GET_TRANSFERS_SUCCEED} from "../actions/types";
import {
    GET_OFFSHORE_TRANSFERS_FAILED,
    GET_OFFSHORE_TRANSFERS_FETCHING,
    GET_OFFSHORE_TRANSFERS_SUCCEED
} from "../../platforms/desktop/actions/types";
import {INITAL_FETCHING_STATE, XFetching} from "./types";
import {AppState} from "../../platforms/desktop/reducers";



export type XTransferListAsset = Partial<{[key in Ticker]: any}>
export type XTransferList = Record<Ticker,any[] | null >


const INITAL_STATE:XTransferList = {

    xUSD:null,
    XHV:null

};


 const fetching = (state = INITAL_FETCHING_STATE, action: AnyAction):XFetching => {


    switch (action.type) {
        case GET_OFFSHORE_TRANSFERS_SUCCEED:
        case GET_TRANSFERS_SUCCEED:
        case GET_TRANSFERS_FAILED:
        case GET_OFFSHORE_TRANSFERS_FAILED:
        case GET_TRANSFERS_FETCHING:
        case GET_OFFSHORE_TRANSFERS_FETCHING:
            return {...state, ...action.payload};
        default:
            return state;

    }

};


 const list  = (state = INITAL_STATE, action: AnyAction): XTransferList => {

    switch (action.type) {
        case GET_TRANSFERS_SUCCEED:
        case GET_OFFSHORE_TRANSFERS_SUCCEED:
            return {...state, ...action.payload};
        default:
            return state;

    }
};


 export const xTransferList = combineReducers({
    list,fetching
 });



 export const getTransferListByTicker = (state: AppState, tickerId: Ticker) => {

     return state.xTransferList.list[tickerId];

 };
