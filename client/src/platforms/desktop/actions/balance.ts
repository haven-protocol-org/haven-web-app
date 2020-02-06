import { getBalanceRPC } from "../ipc/rpc/rpc";
import {
  GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_SUCCEED
} from "./types";
import { Balance, XBalance } from "shared/reducers/xBalance";
import bigInt from "big-integer";

export const getBalance = () => {
  return (dispatch: any) => {
    dispatch(getBalancesFetching());

    const account_index = 0;

    getBalanceRPC({ account_index })
      .then((result: any) =>
        dispatch(getBalancesSucceed(parseBalances(result)))
      )
      .catch((error: any) => dispatch(getBalancesFailed(error)));
  };
};

const getBalancesFetching = () => ({ type: GET_BALANCES_FETCHING });
const getBalancesSucceed = (result: any) => ({
  type: GET_BALANCES_SUCCEED,
  payload: result
});
const getBalancesFailed = (error: any) => ({
  type: GET_BALANCES_FAILED,
  payload: error
});

const parseBalances = (rpcBalanceData: any): XBalance => {
  const balance: Balance = {
    balance: bigInt(rpcBalanceData.balance),
    unlockedBalance: bigInt(rpcBalanceData.unlocked_balance),
    lockedBalance: bigInt(rpcBalanceData.balance).subtract(
      rpcBalanceData.unlocked_balance
    )
  };

  return {
    XHV: balance
  };
};
