import {GET_BALANCES_FAILED, GET_BALANCES_FETCHING, GET_BALANCES_SUCCEED} from "../../platforms/desktop/actions/types";
import {convertBalanceForReading} from "../../utility/utility";
import {NO_BALANCE} from "../../platforms/desktop/reducers/balance";


export interface Balance {

    balance:bigint,
    unlockedBalance:bigint,
    lockedBalance:bigint,
    isFetching:boolean

}


export interface XBalance {

    xhv: Balance,
    xUSD:Balance

}

const INITIAL_BALANCE: Balance = {
    balance:  BigInt(-1),
    unlockedBalance: BigInt( -1),
    lockedBalance: BigInt( -1),
    isFetching: false};


const INITIAL_STATE:XBalance = {
    xUSD:{...INITIAL_BALANCE},
    xhv: {...INITIAL_BALANCE}
};


export function balance (state = INITIAL_STATE, action: any): XBalance {
    switch (action.type) {
        case GET_BALANCES_SUCCEED:
            return { ...state, xhv: { ...action.payload,isFetching: false}};
        case GET_BALANCES_FETCHING:
            return { ...state, xhv: { ...state.xhv, isFetching: true} };
        case GET_BALANCES_FAILED:
            return { ...state, xhv: { ...state.xhv, isFetching: false} };
        default:
            return state;
    }
}

export function selectReadableBalance(state: any) {

    if (state.balance.balance === NO_BALANCE)
        return state.balance.balance;

    return convertBalanceForReading(state.balance.balance);
}
