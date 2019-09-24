import {
  GET_PRICE_HISTORY_FAILED,
  GET_PRICE_HISTORY_FETCHING,
  GET_PRICE_HISTORY_SUCCEED
} from "../actions/types";

const INITIAL_STATE = { price: -1, isFetching: false, error: "" };

export function currentPrice(state = INITIAL_STATE, action) {
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
