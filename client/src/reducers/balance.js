import {
  GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_SUCCEED
} from "../actions/types";

export const NO_BALANCE = -1;

const INITIAL_STATE = {
  balance: NO_BALANCE,
  unlockedBalance: NO_BALANCE,
  perSubaddress: [],
  isFetching: false
};

export function balance (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BALANCES_SUCCEED:
      return {
        ...state,
        balance: action.payload.balance,
        unlockedBalance: action.payload.unlocked_balance,
        isFetching: false
      };
    case GET_BALANCES_FETCHING:
      return { ...state, isFetching: true };
    case GET_BALANCES_FAILED:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}

export function getReadableBalance(state) {

  if (state.balance.balance === NO_BALANCE)
    return state.balance.balance;

  return (state.balance.balance / Math.pow(10, 12)).toFixed(4);
}
