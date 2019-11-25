import {getOffshoreBalanceRPC} from "../rpc/rpc";
import {Balance, XBalance} from "../../../universal/reducers/xBalance";
import {GET_OFFSHORE_BALANCE_FAILED, GET_OFFSHORE_BALANCE_FETCHING, GET_OFFSHORE_BALANCE_SUCCEED} from "./types";


export function getOffshoreBalance() {

    return (dispatch: any) => {

        dispatch(getOffshoreBalanceFetching());

        getOffshoreBalanceRPC()
            .then( (res:any) => dispatch(getOffshoreBalanceSucceed(res)) )
            .catch( (err: any) => dispatch(getOffshoreBalanceFailed(err)))
    }
}


const getOffshoreBalanceSucceed = (res: any) => {

    const balance:Balance = {
        unlockedBalance: BigInt(res.unlocked_balance),
        lockedBalance: BigInt(res.balance) - BigInt(res.unlocked_balance),
        balance: BigInt(res.balance)
    };

    const xBalance:XBalance = {xUSD: balance};

    return {type: GET_OFFSHORE_BALANCE_SUCCEED, xBalance}
};

const getOffshoreBalanceFetching = () => {
    return {type: GET_OFFSHORE_BALANCE_FETCHING};
};


const getOffshoreBalanceFailed = (error: any) => {
    return {type: GET_OFFSHORE_BALANCE_FAILED, error}
};
