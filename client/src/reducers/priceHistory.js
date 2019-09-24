import {
  GET_PRICE_HISTORY_FAILED,
  GET_PRICE_HISTORY_FETCHING,
  GET_PRICE_HISTORY_SUCCEED
} from "../actions/types";
import { convertTimestampToDateString } from "../utility";

export const NO_PRICE = -1;

const INITIAL_STATE = {
  prices: [],
  error: "",
  isFetching: false,
  lastPrice: NO_PRICE
};

export function priceHistory(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRICE_HISTORY_SUCCEED:
      return { ...action.payload, isFetching: false, error: "" };
    case GET_PRICE_HISTORY_FETCHING:
      return { ...state, isFetching: true };
    case GET_PRICE_HISTORY_FAILED:
      return { ...state, error: action.payload, isFetching: false };
    default:
      return state;
  }
}

export function getPriceDates(state) {
  return state.priceHistory.prices.map(priceItem =>
    convertTimestampToDateString(priceItem[0])
  );
}

export function getPriceValues(state) {
  return state.priceHistory.prices.map(priceItem => priceItem[1]);
}
