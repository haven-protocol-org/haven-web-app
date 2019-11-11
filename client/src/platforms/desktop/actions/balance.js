import {getBalanceRPC} from "../rpc/rpc";
import {GET_BALANCES_FAILED, GET_BALANCES_FETCHING, GET_BALANCES_SUCCEED} from "./types";

export const getBalances = () => {
    return (dispatch, getState) => {
        dispatch(getBalancesFetching());

        const account_index = 0;

        getBalanceRPC({ account_index })
            .then(result => dispatch(getBalancesSucceed(result)))
            .catch(error => dispatch(getBalancesFailed(error)));
    };
};

const getBalancesFetching = () => ({ type: GET_BALANCES_FETCHING });
const getBalancesSucceed = result => ({
    type: GET_BALANCES_SUCCEED,
    payload: result
});
const getBalancesFailed = error => ({
    type: GET_BALANCES_FAILED,
    payload: error
});
