import {AnyAction} from "redux";
import {GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED} from "../actions/types";
import {DesktopAppState} from ".";
import {Ticker} from "shared/reducers/types";

export interface ConversionRate {
  fromTicker: Ticker;
  toTicker: Ticker;
  xRate: number;
  xRateRevert: number;
}

export interface XRates {
  height: number;
  timestamp: number;
  rates: ConversionRate[];
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
  timestamp: number;
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



export const selectXRateAtHeight = () => {

};

export const selectXRate = (blockHeaderExchangeRate: BlockHeaderRate[], fromTicker:Ticker | null, toTicker:Ticker | null): number | null => {


  if (blockHeaderExchangeRate.length === 0) {
    return null;
  }

  if (fromTicker === null || toTicker === null) {
    return null;
  }

  const from = fromTicker === Ticker.xUSD? 'unused1' : fromTicker;
  const to = toTicker === Ticker.xUSD? 'unused1' : toTicker;

  const latestBlockerHeader: BlockHeaderRate = blockHeaderExchangeRate[blockHeaderExchangeRate.length - 1];

  if (from === Ticker.XHV && to !== Ticker.XHV) {
      return latestBlockerHeader[to]/ Math.pow(10, 12);
  }
  else if (from !== Ticker.XHV && to === Ticker.XHV) {
    return 1/(latestBlockerHeader[from]/Math.pow(10,12));
  }
  return null;

};

export const hasLatestXRate = (state: DesktopAppState) => {
  const chainHeight: number = state.chain.chainHeight;
  return state.blockHeaderExchangeRate.some(
    xRate => xRate.height === chainHeight
  );
};

export const priceDelta = (state: DesktopAppState): number | null => {
  if (state.blockHeaderExchangeRate.length === 0) {
    return null;
  }

  const latestBlockerHeader =
    state.blockHeaderExchangeRate[state.blockHeaderExchangeRate.length - 1];

  return Math.abs(latestBlockerHeader.xUSD - latestBlockerHeader.unused1);
};
