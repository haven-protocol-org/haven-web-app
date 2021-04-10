import { AnyAction } from "redux";
import { GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED } from "shared/actions/types";
import { DesktopAppState } from "../../platforms/desktop/reducers";
import { Ticker } from "shared/reducers/types";
import bigInt from "big-integer";
import { WebAppState } from "platforms/web/reducers";

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


type Rates = Record<Ticker, bigInt.BigInteger>;
interface BlockHeader {

  height: number;
  signature: string;
  UNUSED1: bigInt.BigInteger;
  UNUSED2: bigInt.BigInteger;
  UNUSED3: bigInt.BigInteger;
  timestamp: bigInt.BigInteger;

}

export type BlockHeaderRate = BlockHeader & Rates;

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


export const selectXRate = (
  blockHeaderExchangeRate: BlockHeaderRate[],
  fromTicker: Ticker | null,
  toTicker: Ticker | null
): number => {
  if (blockHeaderExchangeRate.length === 0) {
    return 0;
  }

  if (fromTicker === toTicker) {
    return 1;
  }

  if (fromTicker === null || toTicker === null) {
    return 0;
  }

  // one of the ticker must be xUSD
  if (fromTicker !== Ticker.xUSD && toTicker !== Ticker.xUSD) {
    return 0;
  }

  const from = fromTicker === Ticker.xUSD ? "UNUSED1" : fromTicker;
  const to = toTicker === Ticker.xUSD ? "UNUSED1" : toTicker;

  const latestBlockerHeader: BlockHeaderRate =
    blockHeaderExchangeRate[blockHeaderExchangeRate.length - 1];

    /**
     * handles xUSD --> XHV and XHV -> xUSD
     */
  if (from === Ticker.XHV && latestBlockerHeader[to]) {
    return latestBlockerHeader[to].toJSNumber() / Math.pow(10, 12);
  } else if (to === Ticker.XHV) {
    if (!latestBlockerHeader[from].isZero()) {
      return Math.pow(10, 12) / latestBlockerHeader[from].toJSNumber();
    }
}

if (fromTicker === Ticker.xUSD && latestBlockerHeader[toTicker]) {
    return latestBlockerHeader[toTicker].toJSNumber() / Math.pow(10, 12);
} else {
  if (!latestBlockerHeader[fromTicker].isZero()) {
    return Math.pow(10, 12) / latestBlockerHeader[fromTicker].toJSNumber();
  }
}
  return 0;
};

export const selectLastExchangeRates = (
  state: DesktopAppState | WebAppState
): BlockHeaderRate | null => {
  const latestBlockerHeader: BlockHeaderRate =
    state.blockHeaderExchangeRate[blockHeaderExchangeRate.length - 1];

  return latestBlockerHeader;
};

export const hasLatestXRate = (state: DesktopAppState) => {
  const chainHeight: number = state.chain.chainHeight;
  return state.blockHeaderExchangeRate.some(
    (xRate) => xRate.height === chainHeight - 1
  );
};

export const priceDelta = (state: DesktopAppState): number | null => {
  if (state.blockHeaderExchangeRate.length === 0) {
    return null;
  }

  const latestBlockerHeader =
    state.blockHeaderExchangeRate[state.blockHeaderExchangeRate.length - 1];

  return latestBlockerHeader.XUSD
    .subtract(latestBlockerHeader.UNUSED1)
    .abs()
    .toJSNumber();
};
