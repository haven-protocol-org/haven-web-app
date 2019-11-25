import {
    GET_BALANCES_FAILED,
    GET_BALANCES_FETCHING,
    GET_BALANCES_SUCCEED,
    GET_OFFSHORE_BALANCE_SUCCEED
} from "../../platforms/desktop/actions/types";
import {AnyAction} from "redux";
import {AppState} from "../../platforms/desktop/reducers";
import {Ticker} from "./types";


const NO_BALANCE = BigInt(-1);



export interface Balance {

    balance:bigint,
    unlockedBalance:bigint,
    lockedBalance:bigint,

}

interface Loading {
    isFetching:boolean,
    error:{} | null
}

type BalanceLoading = {

    [key in Ticker]:Loading;

}

const INITAL_STATE_BALANCE_LOADING: BalanceLoading = {

    xUSD:{isFetching: false, error:null},
    XHV: {isFetching: false, error:null}

};


export type XBalance = Partial<{[key in Ticker]: Balance}>

const INITIAL_BALANCE: Balance = {
    balance:  BigInt(-1),
    unlockedBalance: BigInt( -1),
    lockedBalance: BigInt( -1),};


const INITIAL_STATE: Record<Ticker, Balance> = {
    xUSD:{...INITIAL_BALANCE},
    XHV: {...INITIAL_BALANCE}
};



export function fetching(state = INITAL_STATE_BALANCE_LOADING, action: AnyAction): BalanceLoading {

    switch (action.type) {
        case GET_BALANCES_FETCHING:
            return {...state,};
        case GET_BALANCES_FAILED:
            return {...state,};
        default:
            return state;
    }
}


export function xBalance (state = INITIAL_STATE, action: {type: string, payload:XBalance}): Record<Ticker, Balance> {
    switch (action.type) {
        case GET_BALANCES_SUCCEED:
        case GET_OFFSHORE_BALANCE_SUCCEED:
            return { ...state, ... action.payload};
        default:
            return state;
    }
}

export function selectReadableBalance(state: AppState): number {

    if (state.xBalance.XHV.balance === NO_BALANCE)
        return -1;

    const readableNum = Number(state.xBalance.XHV.balance / BigInt(Math.pow(10, 12)));

    return Math.round(readableNum/10000) * 10000;
}
