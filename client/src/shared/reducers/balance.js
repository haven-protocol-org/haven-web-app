import {
  GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_SUCCEED
} from "../actions/types";
import { convertBalanceForReading } from "../../utility/utility";

const NO_BALANCE = -1;

const INITIAL_STATE = {
  balance: NO_BALANCE,
  unlockedBalance: NO_BALANCE,
  lockedBalance: NO_BALANCE,
  isFetching: false
};

function balance(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BALANCES_SUCCEED:
      return {
        ...action.payload,
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

function selectReadableBalance(state) {
  if (state.balance.balance === NO_BALANCE) return state.balance.balance;

  return convertBalanceForReading(state.balance.balance);
}
