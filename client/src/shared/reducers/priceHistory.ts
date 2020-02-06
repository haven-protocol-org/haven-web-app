import {
  GET_PRICE_HISTORY_FAILED,
  GET_PRICE_HISTORY_FETCHING,
  GET_PRICE_HISTORY_SUCCEED
} from "../actions/types";
import {AnyAction} from "redux";

export const NO_PRICE = -1;

export const PRICE_RANGE_DAY = 1;
export const PRICE_RANGE_MONTH = 30;
export const PRICE_RANGE_YEAR = 365;
export const PRICE_RANGE_MAX = "max";


interface PriceHistory {

    prices:any[];
    error: string;
    isFetching: boolean;
}


const INITIAL_STATE: PriceHistory = {
  prices: [
    PRICE_RANGE_DAY,
    PRICE_RANGE_MONTH,
    PRICE_RANGE_YEAR,
    PRICE_RANGE_MAX
  ].map(rangeInDays => ({ prices: [], rangeInDays })),
  error: "",
  isFetching: false,
};

export function priceHistory(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case GET_PRICE_HISTORY_SUCCEED:
      return {
        prices: state.prices.map(priceRangeEntry =>
          priceRangeEntry.rangeInDays === action.payload.rangeInDays
            ? action.payload
            : priceRangeEntry
        ),
        isFetching: false,
        error: ""
      };
    case GET_PRICE_HISTORY_FETCHING:
      return { ...state, isFetching: true };
    case GET_PRICE_HISTORY_FAILED:
      return { ...state, error: action.payload, isFetching: false };
    default:
      return state;
  }
}
