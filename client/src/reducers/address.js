import {
  GET_ADDRESS_FAILED,
  GET_ADDRESS_FETCHING, GET_ADDRESS_SUCCEED,
  RESTORE_WALLET_BY_SEED_FAILED,
  RESTORE_WALLET_BY_SEED_FETCHING,
  RESTORE_WALLET_BY_SEED_SUCCEED
} from "../actions/types";

const INITIAL_STATE = { main: "", subs: [], isFetching: false };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESTORE_WALLET_BY_SEED_SUCCEED:
    case GET_ADDRESS_SUCCEED:
      return { ...state, main: action.payload.address, isFetching: false };
    case RESTORE_WALLET_BY_SEED_FETCHING:
    case GET_ADDRESS_FETCHING:
      return { ...state, isFetching: true };
    case RESTORE_WALLET_BY_SEED_FAILED:
    case GET_ADDRESS_FAILED:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}
