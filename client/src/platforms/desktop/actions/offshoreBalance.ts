import { getOffshoreBalanceRPC } from "../ipc/rpc/rpc";
import { Balance, XBalance } from "../../../shared/reducers/xBalance";
import {
  GET_OFFSHORE_BALANCE_FAILED,
  GET_OFFSHORE_BALANCE_FETCHING,
  GET_OFFSHORE_BALANCE_SUCCEED
} from "./types";
import bigInt from "big-integer";

export function getOffshoreBalance() {
  return (dispatch: any) => {
    dispatch(getOffshoreBalanceFetching());

    getOffshoreBalanceRPC()
      .then((res: any) => dispatch(getOffshoreBalanceSucceed(res)))
      .catch((err: any) => dispatch(getOffshoreBalanceFailed(err)));
  };
}

const getOffshoreBalanceSucceed = (res: any) => {
  const balance: Balance = {
    unlockedBalance: bigInt(res.unlocked_balance),
    lockedBalance: bigInt(res.balance).subtract(res.unlocked_balance),
    balance: bigInt(res.balance)
  };

  const xBalance: XBalance = { xUSD: balance };

  return { type: GET_OFFSHORE_BALANCE_SUCCEED, payload: xBalance };
};

const getOffshoreBalanceFetching = () => {
  return { type: GET_OFFSHORE_BALANCE_FETCHING };
};

const getOffshoreBalanceFailed = (error: any) => {
  return { type: GET_OFFSHORE_BALANCE_FAILED, error };
};
