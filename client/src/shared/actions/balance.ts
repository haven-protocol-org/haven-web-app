import HavenBalance from "haven-wallet-core/src/main/js/wallet/model/HavenBalance";
import { walletProxy } from "shared/core/proxy";
import { Ticker } from "shared/reducers/types";
import { Balance, XBalance } from "shared/reducers/xBalance";
import { bigIntegerToBigInt } from "utility/utility";
import {
  GET_BALANCES_SUCCEED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_FAILED,
} from "./types";
import BigInteger from "haven-wallet-core/src/main/js/common/biginteger";

export const getXHVBalance = () => {
  return async (dispatch: any) => {
    dispatch(getBalancesFetching());
    try {
      
      const balance: HavenBalance = await walletProxy.getBalance();
      const unlockedBalance: HavenBalance = await walletProxy.getUnlockedBalance();
      const xBalances: XBalance = convertBalance(balance, unlockedBalance);
      dispatch(getBalancesSucceed(xBalances));
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


const convertBalance = (balances: HavenBalance , unlockedBalances: HavenBalance): XBalance => {

  const unlockedDict:{[key: string]: BigInteger } = unlockedBalances.toDict();
  const balanceDict: {[key: string]: BigInteger } = balances.toDict();
  const assetArr = Object.keys(balanceDict);
  const xBalances: XBalance = {};

  for (const asset of assetArr)  {

    const unlockedBalance = bigIntegerToBigInt(unlockedDict[asset]);
    const balance =  bigIntegerToBigInt(balanceDict[asset]);
    const lockedBalance = balance.subtract(unlockedBalance);
    
    const xBalance: XBalance = {
      [asset]: {
        lockedBalance, unlockedBalance, balance
      }
    }
    Object.assign(xBalances, xBalance);
  }

  return xBalances;

}



