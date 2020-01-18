import {
  GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_SUCCEED,
  GET_OFFSHORE_BALANCE_SUCCEED
} from "platforms/desktop/actions/types";
import {AnyAction} from "redux";
import {DesktopAppState} from "platforms/desktop/reducers";
import {INITAL_FETCHING_STATE, Ticker, XFetching} from "./types";
import {WebAppState} from "platforms/web/reducers";
import {selectXRate} from "platforms/desktop/reducers/blockHeaderExchangeRates";

export const NO_BALANCE = BigInt(-1);





export interface Balance {
  [key:string]:bigint;
  balance: bigint;
  unlockedBalance: bigint;
  lockedBalance: bigint;
}

export type XBalance = Partial<{ [key in Ticker]: Balance }>;
export type XBalances = { [key in Ticker]: Balance };

const INITIAL_BALANCE: Balance = {
  balance: NO_BALANCE,
  unlockedBalance: NO_BALANCE,
  lockedBalance: NO_BALANCE
};

const INITIAL_STATE: XBalances = {
  xUSD: { ...INITIAL_BALANCE },
  XHV: { ...INITIAL_BALANCE },
  xBTC: {...INITIAL_BALANCE}
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


export const selectTotalBalances = (state: DesktopAppState): XBalance => {

  const xBalance = state.xBalance;
  const xhvToUSdRate = selectXRate(state.blockHeaderExchangeRate, Ticker.XHV, Ticker.xUSD);

  const xUSDTotalBalance:Balance = Object.entries(xBalance.xUSD).reduce( (result:any, [balanceType, balance]) => {
    const total = xBalance.XHV[balanceType] * BigInt(xhvToUSdRate) + balance;
      result[balanceType]= total;
      return result;
  },{});

  const usdToXhvRate = selectXRate(state.blockHeaderExchangeRate, Ticker.xUSD, Ticker.XHV);

  const xHVTotalBalance: Balance = Object.entries(xBalance.xUSD).reduce( (result:any,[balanceType, balance]) => {
    const total = xBalance.XHV[balanceType] * BigInt(usdToXhvRate) + balance;
    result[balanceType]= total;
    return result;
  }, {});


  const xhvToBtcRate = selectXRate(state.blockHeaderExchangeRate, Ticker.xUSD, Ticker.XHV);

  const btcTotalBalance: Balance = Object.entries(xHVTotalBalance).reduce( (result: any, [balanceType, balance]) => {
    const total = balance * BigInt(usdToXhvRate) ;
    result[balanceType]= total;
    return result;
  }, {});


  return {

    [Ticker.XHV]: xHVTotalBalance,
    [Ticker.xUSD]: xUSDTotalBalance,
    xBTC:btcTotalBalance

  }



};
