import {
  GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_SUCCEED
} from "../actions/types";
import {convertBalanceForReading} from "../utility";

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

export function selectReadableBalance(state) {

  if (state.balance.balance === NO_BALANCE)
    return state.balance.balance;

  return convertBalanceForReading(state.balance.balance);
}
