import {Ticker} from "./types";
import {AnyAction, combineReducers} from "redux";
import {GET_TRANSFERS_FAILED, GET_TRANSFERS_FETCHING, GET_TRANSFERS_SUCCEED} from "../actions/types";
import {INITAL_FETCHING_STATE, XFetching} from "./types";
import {DesktopAppState} from "../../platforms/desktop/reducers";


export enum TransferType {

    xUSDIn='XUSD in',
    xUSDOut='XUSD out',
    xUSDPending='XUSD pending',
    XHVIn='in',
    XHVOut='out',
    Mining='block',
    XHVPending = 'pending'
}




export type XTransferListAsset = Partial<{[key in Ticker]: any[]}>
export type XTransferList = {[key in Ticker]?: any[] | null}


const INITAL_STATE:{[key in Ticker]?: any[] | null} = {

    xUSD:null,
    XHV:null

};


 const fetching = (state = INITAL_FETCHING_STATE, action: AnyAction):XFetching => {


    switch (action.type) {
        case GET_TRANSFERS_SUCCEED:
        case GET_TRANSFERS_FAILED:
        case GET_TRANSFERS_FETCHING:
            return {...state, ...action.payload};
        default:
            return state;

    }

};


 const list  = (state = INITAL_STATE, action: AnyAction): XTransferList => {

    switch (action.type) {
        case GET_TRANSFERS_SUCCEED:
            return {...action.payload};
        default:
            return state;
    }
};


 export const xTransferList = combineReducers({
    list,fetching
 });



 export const getTransferListByTicker = (state: DesktopAppState, tickerId: Ticker) => {

     return state.xTransferList.list[tickerId];

 };
