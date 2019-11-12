import {
  TRANSFER_FAILED,
  TRANSFER_FETCHING,
  TRANSFER_SUCCEED,
    TRANSFER_RESET
} from "../actions/types";


const INITIAL_STATE = {
  address: "",
  amount: "",
  fee: "",
  txHash: "",
  isFetching: false,
  info: "",
  error: "",
  succeed:false
};

export const transferProcess = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRANSFER_RESET:
      return INITIAL_STATE;
    case TRANSFER_FETCHING:
      return {
        ...state,
        amount: action.payload.amount,
        address: action.payload.address,
        isFetching: true
      };
    case TRANSFER_SUCCEED:
      return { ...state, ...action.payload, isFetching: false, succeed:true };
    case TRANSFER_FAILED:
      return { ...state, error: action.payload.error, isFetching: false, succeed:false };
    default:
      return state;
  }
}


export const transferSucceed = (state) => {

    return state.transferProcess.succeed;

};
