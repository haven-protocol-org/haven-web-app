import {
  TRANSFER_FAILED,
  TRANSFER_FETCHING,
  TRANSFER_SUCCEED
} from "../actions/types";

export const NO_KEY = -1;

const INITIAL_STATE = {
  address: "",
  amount: "",
  fee: "",
  txHash: "",
  isFetching: false,
  info: "",
  error: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TRANSFER_FETCHING:
      return {
        ...state,
        amount: action.payload.amount,
        address: action.payload.address,
        isFetching: true
      };
    case TRANSFER_SUCCEED:
      return { ...state, ...action.payload, isFetching: false };
    case TRANSFER_FAILED:
      return { ...state, error: action.payload.error, isFetching: false };
    default:
      return state;
  }
}
