import {
  CREATE_WALLET_FAILED,
  CREATE_WALLET_FETCHING,
  CREATE_WALLET_SUCCEED
} from "../actions/types";


const INITIAL_STATE = { isFetching: false, error: null };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_WALLET_FETCHING:
      return { ...state, isFetching: true };
    case CREATE_WALLET_SUCCEED:
      return {  isFetching: false };
    case CREATE_WALLET_FAILED:
      return {error: action.payload.error, isFetching: false };
    default:
      return state;
  }
}
