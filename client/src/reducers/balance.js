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

export default function(state = INITIAL_STATE, action) {
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
