
import {Ticker} from "shared/reducers/types";

export const NO_PRICE = -1;

export const PRICE_RANGE_DAY = 1;
export const PRICE_RANGE_MONTH = 30;
export const PRICE_RANGE_YEAR = 365;
export const PRICE_RANGE_MAX = "max";


export interface PriceRangeHistory {
    prices:any[];
    rangeInDays:number | string;
}

export type TickerPriceRangeHistory = Partial<{ [key in Ticker]: PriceRangeHistory[] }>;
export type XPriceRangeHistory = Record<Ticker, PriceRangeHistory[]>;

const emptyPriceHistory = [
        PRICE_RANGE_DAY,
        PRICE_RANGE_MONTH,
        PRICE_RANGE_YEAR,
        PRICE_RANGE_MAX
    ].map(rangeInDays => ({ prices: [], rangeInDays }));


const INITIAL_STATE: XPriceRangeHistory = {
    xUSD:  emptyPriceHistory,
    XHV: emptyPriceHistory,
    xBTC: emptyPriceHistory
};
