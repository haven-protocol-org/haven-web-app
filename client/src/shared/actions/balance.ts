import { walletProxy } from "shared/core/proxy";
import { Balance, XBalance } from "shared/reducers/xBalance";
import { bigIntegerToBigInt } from "utility/utility";
import {
  GET_BALANCES_SUCCEED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_FAILED,
} from "./types";

export const getXHVBalance = () => {
  return async (dispatch: any) => {
    dispatch(getBalancesFetching());
    try {
      const balance = bigIntegerToBigInt(await walletProxy.getBalance());
      const unlockedBalance = bigIntegerToBigInt(
        await walletProxy.getUnlockedBalance()
      );
      const xhvBalance: Balance = {
        unlockedBalance,
        balance,
        lockedBalance: balance.subtract(unlockedBalance),
      };
      dispatch(getBalancesSucceed({ XHV: xhvBalance }));
    } catch (e) {
      dispatch(getBalancesFailed(e));
    }

    return;
  };
};

export const getXUSDBalance = () => {
  return async (dispatch: any) => {
    dispatch(getBalancesFetching());
    try {
      const balance = bigIntegerToBigInt(
        await walletProxy.getOffshoreBalance()
      );
      const unlockedBalance = bigIntegerToBigInt(
        await walletProxy.getUnlockedOffshoreBalance()
      );
      const xUSDBalance: Balance = {
        unlockedBalance,
        balance,
        lockedBalance: balance.subtract(unlockedBalance),
      };
      dispatch(getBalancesSucceed({ xUSD: xUSDBalance }));
    } catch (e) {
      dispatch(getBalancesFailed(e));
    }

    return;
  };
};

const getBalancesFetching = () => ({ type: GET_BALANCES_FETCHING });

export const getBalancesSucceed = (balance: XBalance) => ({
  type: GET_BALANCES_SUCCEED,
  payload: balance,
});
const getBalancesFailed = (error: any) => ({
  type: GET_BALANCES_FAILED,
  payload: error,
});
