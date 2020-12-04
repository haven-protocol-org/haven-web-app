import {
  TRANSFER_CREATION_FAILED,
  TRANSFER_CREATION_FETCHING,
  TRANSFER_CREATION_SUCCEED,
  TRANSFER_FAILED,
  TRANSFER_FETCHING,
  TRANSFER_RESET,
  TRANSFER_SUCCEED,
} from "shared/actions/types";
import { AnyAction } from "redux";
import { HavenAppState } from "../../platforms/desktop/reducers/index";
import { Ticker } from "shared/reducers/types";

export interface TxProcessInfo {
  address: string;
  fromAmount: number | null | bigInt.BigInteger;
  fee: null | bigInt.BigInteger;
  isFetching: boolean;
  info: string;
  error: string;
  succeed: boolean;
  created: boolean;
  metaList: Array<string>;
  paymentId?: string;
  priority?: number;
  fromTicker: Ticker | null;
}

const INITIAL_STATE: TxProcessInfo = {
  address: "",
  fromAmount: null,
  fee: null,
  isFetching: false,
  info: "",
  error: "",
  succeed: false,
  created: false,
  metaList: [],
  paymentId: "",
  fromTicker: null,
};

export const transferProcess = (
  state = INITIAL_STATE,
  action: AnyAction
): TxProcessInfo => {
  switch (action.type) {
    case TRANSFER_CREATION_FETCHING:
      return { ...state, ...action.payload, isFetching: true };

    case TRANSFER_CREATION_SUCCEED:
      return { ...state, ...action.payload, created: true, isFetching: false };

    case TRANSFER_CREATION_FAILED:
      return { ...state, error: action.payload, isFetching: false };

    case TRANSFER_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case TRANSFER_SUCCEED:
      return { ...state, isFetching: false, succeed: true };
    case TRANSFER_FAILED:
      return {
        ...state,
        error: action.payload.error,
        isFetching: false,
        succeed: false,
      };
    case TRANSFER_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const transferSucceed = (state: HavenAppState) => {
  return state.transferProcess.succeed;
};
