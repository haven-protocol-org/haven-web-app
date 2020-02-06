import {
  GET_SIMPLE_PRICE_FAILED,
  GET_SIMPLE_PRICE_FETCHING,
  GET_SIMPLE_PRICE_SUCCEED
} from "../actions/types";

const INITIAL_STATE = {
  error: "",
  isFetching: false,
  price: -1
};

export function simplePrice(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_SIMPLE_PRICE_SUCCEED:
      return { price: action.payload, isFetching: false, error: "" };
    case GET_SIMPLE_PRICE_FETCHING:
      return { ...state, isFetching: true };
    case GET_SIMPLE_PRICE_FAILED:
      return { ...state, error: action.payload, isFetching: false };
    default:
      return state;
  }
}

export const selectSimplePrice = state => {
  return state.simplePrice.price;
};
