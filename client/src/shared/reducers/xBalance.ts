import {
  GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_SUCCEED,
  GET_OFFSHORE_BALANCE_SUCCEED
} from "../../platforms/desktop/actions/types";
import { AnyAction } from "redux";
import { DesktopAppState } from "../../platforms/desktop/reducers";
import { INITAL_FETCHING_STATE, Ticker, XFetching } from "./types";
import { WebAppState } from "../../platforms/web/reducers";

export const NO_BALANCE = BigInt(-1);

export interface Balance {
  balance: bigint;
  unlockedBalance: bigint;
  lockedBalance: bigint;
}

export type XBalance = Partial<{ [key in Ticker]: Balance }>;
export type XBalances = Record<Ticker, Balance>;

const INITIAL_BALANCE: Balance = {
  balance: NO_BALANCE,
  unlockedBalance: NO_BALANCE,
  lockedBalance: NO_BALANCE
};

const INITIAL_STATE: Record<Ticker, Balance> = {
  xUSD: { ...INITIAL_BALANCE },
  XHV: { ...INITIAL_BALANCE }
};

export function fetching(
  state = INITAL_FETCHING_STATE,
  action: AnyAction
): XFetching {
  switch (action.type) {
    case GET_BALANCES_FETCHING:
      return { ...state };
    case GET_BALANCES_FAILED:
      return { ...state };
    default:
      return state;
  }
}

export function xBalance(
  state = INITIAL_STATE,
  action: { type: string; payload: XBalance }
): XBalances {
  switch (action.type) {
    case GET_BALANCES_SUCCEED:
    case GET_OFFSHORE_BALANCE_SUCCEED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function selectReadableBalance(
  state: DesktopAppState | WebAppState
): number {
  if (state.xBalance.XHV.balance === NO_BALANCE) return -1;

  const readableNum = Number(
    state.xBalance.XHV.balance / BigInt(Math.pow(10, 12))
  );

  return Math.round(readableNum / 10000) * 10000;
}
