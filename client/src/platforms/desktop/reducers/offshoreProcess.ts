import {
  OFFSHORE_FETCHING,
  OFFSHORE_SUCCEED,
  OFFSHORE_FAILED,
  ONSHORE_FETCHING,
  ONSHORE_SUCCEED,
  ONSHORE_FAILED,
  EXCHANGE_RESET,
  SELECT_FROM_TICKER,
  SELECT_TO_TICKER
} from "../actions/types";
import { AnyAction } from "redux";
import { TxProcessInfo } from "./transferProcess";
import { Ticker } from "shared/reducers/types";

export enum EXCHANGE_TYPE {
  Onshore,
  Offshore
}

export interface ExchangeProcessInfo extends TxProcessInfo {
  offshoreType: EXCHANGE_TYPE | null;
  toTicker: Ticker | null;
  fromTicker: Ticker | null;
}

const INITIAL_STATE: ExchangeProcessInfo = {
  address: "",
  amount: null,
  fee: null,
  isFetching: false,
  info: "",
  error: "",
  succeed: false,
  offshoreType: null,
  toTicker: Ticker.xUSD,
  fromTicker: Ticker.XHV
};

export const offshoreProcess = (
  state = INITIAL_STATE,
  action: AnyAction
): ExchangeProcessInfo => {
  switch (action.type) {
    case SELECT_FROM_TICKER:
      return { ...state, fromTicker: action.payload };
    case SELECT_TO_TICKER:
      return { ...state, toTicker: action.payload };
    case ONSHORE_FETCHING:
    case OFFSHORE_FETCHING:
      return { ...state, ...action.payload, isFetching: true };
    case ONSHORE_SUCCEED:
    case OFFSHORE_SUCCEED:
      return {
        ...state,
        isFetching: false,
        amount: action.payload.amount,
        succeed: true,
        fee: action.payload.fee
      };
    case ONSHORE_FAILED:
    case OFFSHORE_FAILED:
      return {
        ...state,
        isFetching: false,
        succeed: false,
        error: action.payload
      };
    case EXCHANGE_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const selectIsProcessingExchange = (
  offshoreProcess: ExchangeProcessInfo
) => {
  return offshoreProcess.isFetching;
};

export const selectExchangeSucceed = (offshoreProcess: ExchangeProcessInfo) => {
  return offshoreProcess.succeed;
};

export const selectFromTicker = (offshoreProcess: ExchangeProcessInfo) => {
  return offshoreProcess.fromTicker;
};

export const selectToTicker = (offshoreProcess: ExchangeProcessInfo) => {
  return offshoreProcess.toTicker;
};
