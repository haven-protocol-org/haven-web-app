import { AnyAction } from "redux";
import { DesktopAppState } from "platforms/desktop/reducers";
import { INITAL_FETCHING_STATE, Ticker, XFetching } from "./types";
import { BlockHeaderRate, selectXRate } from "shared/reducers/blockHeaderExchangeRates";
import bigInt from "big-integer";
import {  convertBalanceToMoney } from "utility/utility";
import { WebAppState } from "platforms/web/reducers";
import {
  GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_SUCCEED,
} from "shared/actions/types";

export const NO_BALANCE = bigInt.zero;

export interface Balance {
  [key: string]: bigInt.BigInteger;
  balance: bigInt.BigInteger;
  unlockedBalance: bigInt.BigInteger;
  lockedBalance: bigInt.BigInteger;
  unauditedBalance: bigInt.BigInteger;
  unlockedUnauditedBalance: bigInt.BigInteger;
  lockedUnauditedBalance: bigInt.BigInteger;
}

export interface ViewBalance {
  [key: string]: number;
  balance: number;
  unlockedBalance: number;
  lockedBalance: number;
  unauditedBalance: number;
  unlockedUnauditedBalance: number;
  lockedUnauditedBalance: number;
}

export type XBalance = Partial<{ [key in Ticker]: Balance }>;
export type XBalances = { [key in Ticker]: Balance };
export type XViewBalance = Partial<{ [key in Ticker]: ViewBalance }>;
export type XViewBalances = { [key in Ticker]: ViewBalance };

const INITIAL_BALANCE: Balance = {
  balance: NO_BALANCE,
  unlockedBalance: NO_BALANCE,
  lockedBalance: NO_BALANCE,
  unauditedBalance: NO_BALANCE,
  unlockedUnauditedBalance: NO_BALANCE,
  lockedUnauditedBalance: NO_BALANCE,
};

const INITIAL_VIEW_BALANCE: ViewBalance = {
  balance: -1,
  unlockedBalance: -1,
  lockedBalance: -1,
  unauditedBalance: -1,
  unlockedUnauditedBalance: -1,
  lockedUnauditedBalance: -1,
};


let tempObj: any = {}
Object.values(Ticker).forEach( ticker => tempObj[ticker] = {...INITIAL_BALANCE} )
const INITIAL_STATE: XBalances = tempObj;

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
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const selectBalances = (
  state: DesktopAppState | WebAppState
): XViewBalance => {
  return {
    [Ticker.XHV]: {
      balance: convertBalanceToMoney(state.xBalance[Ticker.XHV].balance),
      unlockedBalance: convertBalanceToMoney(
        state.xBalance[Ticker.XHV].unlockedBalance
      ),
      lockedBalance: convertBalanceToMoney(
        state.xBalance[Ticker.XHV].lockedBalance
      ),
      unauditedBalance: convertBalanceToMoney(state.xBalance[Ticker.XHV].unauditedBalance),
      unlockedUnauditedBalance: convertBalanceToMoney(
        state.xBalance[Ticker.XHV].unlockedUnauditedBalance
      ),
      lockedUnauditedBalance: convertBalanceToMoney(
        state.xBalance[Ticker.XHV].lockedUnauditedBalance
      ),
    },
  };
};



export const selectPortfolioInUSD = (state: DesktopAppState | WebAppState): XViewBalance => {


    const usdPortfolio: ViewBalance = { balance:0, unlockedBalance:0, lockedBalance:0, unauditedBalance:0, unlockedUnauditedBalance:0, lockedUnauditedBalance:0 };
    const xBalance = state.xBalance;

    const toTicker = Ticker.xUSD;
    // iterate over all balance assets 
    Object.entries(xBalance).forEach( ([ticker, balance]: [string, Balance]) => {

       const fromTicker: Ticker = ticker as Ticker;
       const xRate = selectXRate(state.blockHeaderExchangeRate, fromTicker, toTicker);
      
       //iterate different balance types
       Object.entries(balance).forEach(([balanceType, amount]: [string, bigInt.BigInteger]) => {

        const usdAmount = xRate * amount.toJSNumber();
        usdPortfolio[balanceType] += convertBalanceToMoney(usdAmount);

       })
    })

    return {[Ticker.xUSD] : usdPortfolio};

}

export const selectTotalBalances = (
  state: DesktopAppState | WebAppState
): XViewBalance => {
  const defaultBalance = {
    [Ticker.XHV]: { ...INITIAL_VIEW_BALANCE },
    [Ticker.xUSD]: { ...INITIAL_VIEW_BALANCE },
    [Ticker.xBTC]: { ...INITIAL_VIEW_BALANCE },
  };

  const xBalance = state.xBalance;

  const xhvToUSdRate = selectXRate(
    state.blockHeaderExchangeRate,
    Ticker.XHV,
    Ticker.xUSD
  );

  const usdToXhvRate = selectXRate(
    state.blockHeaderExchangeRate,
    Ticker.xUSD,
    Ticker.XHV
  );

  const xhvToBtcRate = selectXRate(
    state.blockHeaderExchangeRate,
    Ticker.XHV,
    Ticker.xBTC
  );

  if (xhvToUSdRate === null || xhvToBtcRate === null || usdToXhvRate === null) {
    return defaultBalance;
  }

  const xUSDTotalBalance: ViewBalance = Object.entries(xBalance[Ticker.xUSD]).reduce(
    (result: any, [balanceType, balance]) => {
      const total =
        xBalance.XHV[balanceType].toJSNumber() * xhvToUSdRate +
        balance.toJSNumber();
      result[balanceType] = convertBalanceToMoney(total);
      return result;
    },
    {}
  );

  const xHVTotalBalance: ViewBalance = Object.entries(xBalance.XHV).reduce(
    (result: any, [balanceType, balance]) => {
      const total =
        xBalance[Ticker.xUSD][balanceType].toJSNumber() * usdToXhvRate +
        balance.toJSNumber();
      result[balanceType] = convertBalanceToMoney(total);
      return result;
    },
    {}
  );

  const btcTotalBalance: ViewBalance = Object.entries(xHVTotalBalance).reduce(
    (result: any, [balanceType, balance]) => {
      const total = balance * xhvToBtcRate;
      result[balanceType] = total;
      return result;
    },
    {}
  );

  return {
    [Ticker.xUSD]: xUSDTotalBalance,
    XBTC: btcTotalBalance,
  };
};


export const selectValueInOtherAsset = (balance: Balance, exchangeRates:BlockHeaderRate[], fromAsset: Ticker, toAsset: Ticker): ViewBalance => {

  const xRate: number = selectXRate(
    exchangeRates,
    fromAsset,
    toAsset
  );


  const viewBalance: ViewBalance = { ...INITIAL_VIEW_BALANCE };
  Object.entries(balance).forEach(
    ([balanceType, balance]) =>
      (viewBalance[balanceType] = convertBalanceToMoney(balance.toJSNumber() * xRate))
  );
  return viewBalance;
}