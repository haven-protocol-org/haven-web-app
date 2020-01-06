import {
  TRANSFER_FAILED,
  TRANSFER_FETCHING,
  TRANSFER_SUCCEED,
  TRANSFER_RESET,
  OFFSHORE_TRANSFER_SUCCEED,
  OFFSHORE_TRANSFER_FETCHING,
  OFFSHORE_TRANSFER_FAILED
} from "../actions/types";
import { AnyAction } from "redux";
import { DesktopAppState } from "./index";

export interface TxProcessInfo {
  address: string;
  amount: bigint|null;
  fee: bigint|null;
  isFetching: boolean;
  info: string;
  error: string;
  succeed: boolean;
}

const INITIAL_STATE: TxProcessInfo = {
  address:'',
  amount:null,
  fee:null,
  isFetching:false,
  info:'',
  error:'',
  succeed:false

};

export const transferProcess = (
  state = INITIAL_STATE,
  action: AnyAction
): TxProcessInfo => {
  switch (action.type) {
    case TRANSFER_RESET:
      return INITIAL_STATE;
    case OFFSHORE_TRANSFER_FETCHING:
    case TRANSFER_FETCHING:
      return {
        ...state,
        amount: action.payload.amount,
        address: action.payload.address,
        isFetching: true
      };
    case OFFSHORE_TRANSFER_SUCCEED:
    case TRANSFER_SUCCEED:
      return { ...state, ...action.payload, isFetching: false, succeed: true };
    case OFFSHORE_TRANSFER_FAILED:
    case TRANSFER_FAILED:
      return {
        ...state,
        error: action.payload.error,
        isFetching: false,
        succeed: false
      };
    default:
      return state;
  }
};

export const transferSucceed = (state: DesktopAppState) => {
  return state.transferProcess.succeed;
};
