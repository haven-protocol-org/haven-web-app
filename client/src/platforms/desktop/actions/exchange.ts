import {offshoreRPC, onshoreRPC, relayTXRPC} from "../ipc/rpc/rpc";
import {
  addErrorNotification,
  addExchangeSucceedMessage
} from "shared/actions/notification";

import {
  EXCHANGE_RESET,
  SELECT_TO_TICKER,
  SELECT_FROM_TICKER,
  EXCHANGE_FETCHING,
  EXCHANGE_SUCCEED,
  EXCHANGE_FAILED,
  EXCHANGE_CREATION_SUCCEED,
  EXCHANGE_CREATION_FAILED, EXCHANGE_CREATION_FETCHING
} from "./types";
import { updateApp } from "./refresh";
import { DesktopAppState } from "../reducers";
import { Ticker } from "shared/reducers/types";

export const setToTicker = (toTicker: Ticker | null) => {
  return { type: SELECT_TO_TICKER, payload: toTicker };
};

export const setFromTicker = (fromTicker: Ticker | null) => {
  return { type: SELECT_FROM_TICKER, payload: fromTicker };
};


export function createExchange(
  fromTicker: Ticker,
  toTicker: Ticker,
  fromAmount: number,
  toAmount: number,
  priority: number,
  externAddress: string, isOffshore: boolean
): any {
  return (dispatch: any, getState: () => DesktopAppState) => {


    const params = createExchangeInputs(fromAmount, priority, externAddress, getState().address.main);

    dispatch(onExchangeCreationFetch({fromTicker, toTicker, fromAmount, toAmount}));

    const exchangeRPCFN = isOffshore? offshoreRPC: onshoreRPC;
    exchangeRPCFN(params)
      .then((result: any) => {
        dispatch(onExchangeCreationSucceed(result))
      })
      .catch((error: any) => {
        dispatch(onExchangeCreationFailed(error));
      });
}}


const confirmExchange = (hex: string, fromTicker: Ticker, toTicker: Ticker, fromAmount: number, toAmount: number) => {


  return (dispatch: any, getState: () => DesktopAppState) => {
    const params = {hex};

    relayTXRPC(params)
        .then((result: any) => {
          dispatch(onExchangeSucceed(result));
          dispatch(
              addExchangeSucceedMessage(fromTicker, toTicker, fromAmount, toAmount)
          );
          dispatch(updateApp());
        })
        .catch((error: any) => {
          dispatch(addErrorNotification(error));
          dispatch(onExchangeFailed(error));
        });
  }

};




const createExchangeInputs = (fromAmount: number, priority: number, externAddress: string, ownAddress: string) => {

  const amount = BigInt(fromAmount * 1e12);
  const address =
      externAddress.trim() !== "" ? externAddress : ownAddress;
  return {
    destinations: [{ address, amount: amount.toString() }],
    priority, do_not_relay:true, get_tx_metadata: true
  };
};


const onExchangeCreationSucceed = (payload: any) => {
  return { type: EXCHANGE_CREATION_SUCCEED, payload };
};

const onExchangeCreationFailed = (error: any) => {
  return { type: EXCHANGE_CREATION_FAILED, payload: error };
};

const onExchangeCreationFetch = (payload: any) => {
  return { type: EXCHANGE_CREATION_FETCHING, payload };
};


const onExchangeSucceed = (payload: any) => {
  return { type: EXCHANGE_SUCCEED, payload };
};

const onExchangeFailed = (error: any) => {
  return { type: EXCHANGE_FAILED, payload: error };
};

const onExchangeFetch = () => {
  return { type: EXCHANGE_FETCHING };
};
export const resetExchangeProcess = () => {
  return { type: EXCHANGE_RESET };
};
