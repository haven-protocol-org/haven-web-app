import {
  EXCHANGE_CREATION_FAILED,
  EXCHANGE_CREATION_FETCHING,
  EXCHANGE_CREATION_SUCCEED,
  EXCHANGE_FAILED,
  EXCHANGE_FETCHING,
  EXCHANGE_RESET,
  EXCHANGE_SUCCEED,
  SELECT_FROM_TICKER,
  SELECT_TO_TICKER,
} from "shared/actions/types";
import { AnyAction } from "redux";
import { TxProcessInfo } from "./transferProcess";
import { Ticker } from "shared/reducers/types";

export enum ExchangeType {
  Onshore,
  Offshore,
}

export interface ExchangeProcessInfo extends TxProcessInfo {
  exchangeType: ExchangeType | null;
  toTicker: Ticker | null;
  toAmount: number | null | bigInt.BigInteger;
}

const INITIAL_STATE: ExchangeProcessInfo = {
  address: "",
  fromAmount: null,
  toAmount: null,
  fee: null,
  isFetching: false,
  info: "",
  error: "",
  created: false,
  succeed: false,
  exchangeType: null,
  toTicker: Ticker.xUSD,
  fromTicker: Ticker.XHV,
  metaList: [],
};

export const exchangeProcess = (
  state = INITIAL_STATE,
  action: AnyAction
): ExchangeProcessInfo => {
  switch (action.type) {
    case SELECT_FROM_TICKER:
      return { ...state, fromTicker: action.payload };
    case SELECT_TO_TICKER:
      return { ...state, toTicker: action.payload };
    case EXCHANGE_CREATION_FETCHING:
      return { ...state, ...action.payload, isFetching: true };
    case EXCHANGE_CREATION_SUCCEED:
      return {
        ...state,
        ...action.payload,
        created: true,
        isFetching: false,
      };
    case EXCHANGE_FETCHING:
      return { ...state, isFetching: true };
    case EXCHANGE_SUCCEED:
      return { ...state, isFetching: false, succeed: true };
    case EXCHANGE_FAILED:
    case EXCHANGE_CREATION_FAILED:
      return {
        ...state,
        isFetching: false,
        succeed: false,
        error: action.payload,
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
