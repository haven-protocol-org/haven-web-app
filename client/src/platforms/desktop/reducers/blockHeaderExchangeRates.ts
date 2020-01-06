import { AnyAction } from "redux";
import { GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED } from "../actions/types";
import { DesktopAppState } from ".";
import { Ticker } from "shared/reducers/types";

export interface ConversionRate {
  fromTicker: Ticker;
  toTicker: Ticker;
  xRate: number;
  xRateRevert: number;
}


export interface XRates {

  height:number;
  timestamp:number;
  rates:ConversionRate[]

}

export interface BlockHeaderRate {
  height: number;
  signature: string;
  unused1: number;
  unused2: number;
  unused3: number;
  xAG: number;
  xAU: number;
  xAUD: number;
  xBTC: number;
  xCAD: number;
  xCHF: number;
  xCNY: number;
  xEUR: number;
  xGBP: number;
  xJPY: number;
  xNOK: number;
  xNZD: number;
  xUSD: number;
  timestamp:number;
}

const INITIAL_STATE: BlockHeaderRate[] = [];


export const blockHeaderExchangeRate = (
  state: BlockHeaderRate[] = INITIAL_STATE,
  action: AnyAction
): BlockHeaderRate[] => {
  switch (action.type) {
    case GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const selectLatestXRates = (
  state: DesktopAppState
): XRates | null => {
  if (state.blockHeaderExchangeRate.length === 0) {
    return null;
  }

  const latestBlockerHeader =
    state.blockHeaderExchangeRate[state.blockHeaderExchangeRate.length - 1];

  const conversionRate: ConversionRate = {
    fromTicker: Ticker.XHV,
    toTicker: Ticker.xUSD,
    xRate: latestBlockerHeader.unused1 / Math.pow(10, 12),
    xRateRevert: 1 / (latestBlockerHeader.unused1 / Math.pow(10, 12)),
  };

  return {rates: [conversionRate], height:latestBlockerHeader.height, timestamp: latestBlockerHeader.timestamp};
};

export const hasLatestXRate = (state: DesktopAppState) => {

    const chainHeight: number = state.chain.chainHeight;
    return state.blockHeaderExchangeRate.some( xRate => xRate.height === chainHeight);

};

