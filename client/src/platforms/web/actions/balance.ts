import {
  // GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_SUCCEED
} from "shared/actions/types";
import { selectCredentials } from "../reducers/account";
//import { core } from "../declarations/haven_core";
import { updateChainData } from ".";
import { decrypt } from "utility/utility-encrypt";
import { WebAppState } from "platforms/web/reducers";
import { XBalance } from "shared/reducers/xBalance";
import { Ticker } from "shared/reducers/types";
import bigInt from "big-integer";
import {selectPrimaryAddress} from "shared/reducers/address";

export const getBalances = () => {
  return (dispatch: any, getState: () => WebAppState) => {
    dispatch(getBalancesFetching());



      //  dispatch(getBalancesSucceed(res))
      
  };
};

const setBalance = (addressInfo: any) => {
  const balance = bigInt(addressInfo.total_received_String).subtract(
    bigInt(addressInfo.total_sent_String)
  );

  const lockedBalance = bigInt(addressInfo.locked_balance_String);
  const unlockedBalance = balance.subtract(lockedBalance);
  return { [Ticker.XHV]: { balance, lockedBalance, unlockedBalance } };
};


const getBalancesFetching = () => ({ type: GET_BALANCES_FETCHING });

export const getBalancesSucceed = (result: XBalance) => ({
  type: GET_BALANCES_SUCCEED,
  payload: result
});
