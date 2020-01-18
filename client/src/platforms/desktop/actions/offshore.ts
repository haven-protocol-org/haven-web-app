import { offshoreRPC, onshoreRPC } from "../ipc/rpc/rpc";
import {
  addErrorNotification,
  addExchangeSucceedMessage
} from "shared/actions/notification";

import {
  EXCHANGE_RESET,
  OFFSHORE_FAILED,
  OFFSHORE_FETCHING,
  ONSHORE_FAILED,
  ONSHORE_FETCHING,
  ONSHORE_SUCCEED,
  SELECT_TO_TICKER,
  SELECT_FROM_TICKER
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

export function onshore(
  fromTicker: Ticker,
  toTicker: Ticker,
  fromAmount: number,
  toAmount: number,
  priority: number,
  externAddress: string
): any {
  const amount = BigInt(fromAmount * 1e12);
  return (dispatch: any, getState: () => DesktopAppState) => {
    dispatch(onshoreFetch({ fromTicker, toTicker, amount, isOffshore: false }));

    const address =
      externAddress.trim() !== "" ? externAddress : getState().address.main;
    const params = {
      destinations: [{ address, amount: amount.toString() }],
      priority
    };

    onshoreRPC(params)
      .then((result: any) => {
        dispatch(onshoreSucceed(result));
        dispatch(
          addExchangeSucceedMessage(fromTicker, toTicker, fromAmount, toAmount)
        );
        // add a little delay to give the wallet some time for fresh data
        dispatch(updateApp());
      })
      .catch((error: any) => {
        dispatch(addErrorNotification(error));
        dispatch(onOnShoreFailed(error));
      });
  };
}

export function offshore(
  fromTicker: Ticker,
  toTicker: Ticker,
  fromAmount: number,
  toAmount: number,
  priority: number,
  externAddress: string
): any {
  const amount = BigInt(fromAmount * 1e12);
  return (dispatch: any, getState: () => DesktopAppState) => {
    const address =
      externAddress.trim() !== "" ? externAddress : getState().address.main;
    dispatch(offshoreFetch());
    const params = {
      destinations: [{ address, amount: amount.toString() }],
      priority
    };

    offshoreRPC(params)
      .then((result: any) => {
        dispatch(offshoreSucceed(result));
        dispatch(
          addExchangeSucceedMessage(fromTicker, toTicker, fromAmount, toAmount)
        );
        dispatch(updateApp());
      })
      .catch((error: any) => {
        dispatch(addErrorNotification(error));
        dispatch(onOffShoreFailed(error));
      });
  };
}

const onshoreFetch = (payload: {
  fromTicker: Ticker;
  toTicker: Ticker;
  isOffshore: boolean;
  amount: bigint;
}) => {
  return { type: ONSHORE_FETCHING };
};

const onshoreSucceed = (payload: any) => {
  return { type: ONSHORE_SUCCEED, payload };
};

const onOnShoreFailed = (error: any) => {
  return { type: ONSHORE_FAILED, payload: error };
};

const offshoreFetch = () => {
  return { type: OFFSHORE_FETCHING };
};

const offshoreSucceed = (payload: any) => {
  return { type: ONSHORE_SUCCEED, payload };
};

const onOffShoreFailed = (error: any) => {
  console.log(error);
  return { type: OFFSHORE_FAILED };
};

export const resetExchangeProcess = () => {
  return { type: EXCHANGE_RESET };
};
