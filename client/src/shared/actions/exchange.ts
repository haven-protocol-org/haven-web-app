import {
  addErrorNotification,
  addExchangeSucceedMessage,
  addNotificationByMessage,
} from "shared/actions/notification";
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
} from "./types";
import { walletProxy } from "shared/core/proxy";
import { DesktopAppState } from "../../platforms/desktop/reducers";
import { Ticker } from "shared/reducers/types";
import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { selectPrimaryAddress } from "shared/reducers/address";
import { NotificationType } from "constants/notificationList";
import {
  ExchangeProcessInfo,
  ExchangeType,
} from "shared/reducers/exchangeProcess";
import { ITxConfig } from "typings";
import MoneroDestination from "haven-wallet-core/src/main/js/wallet/model/MoneroDestination";
import { HavenTxType } from "haven-wallet-core";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import bigInt from "big-integer";

interface RPCExchangeResponse {
  amount_list: Array<number>;
  amount_usd_list: Array<number>;
  fee_list: Array<number>;
  tx_metadata_list: Array<string>;
}

export const setToTicker = (toTicker: Ticker | null) => {
  return { type: SELECT_TO_TICKER, payload: toTicker };
};

export const setFromTicker = (fromTicker: Ticker | null) => {
  return { type: SELECT_FROM_TICKER, payload: fromTicker };
};

const sanityCheck = (amount: number): boolean => {
  // check that our value has not more than 4 decimals

  const checkValue = amount * 10000;
  return checkValue % 1 === 0;
};

export function createExchange(
  fromTicker: Ticker,
  toTicker: Ticker,
  fromAmount: number,
  toAmount: number,
  priority: number,
  externAddress: string,
  exchangeType: ExchangeType
): any {
  return async (dispatch: any, getState: () => DesktopAppState) => {
    const address =
      externAddress.trim() !== ""
        ? externAddress
        : selectPrimaryAddress(getState().address.entrys);

    const xhvAnmount =
      exchangeType === ExchangeType.Offshore ? fromAmount : toAmount;

    if (!sanityCheck(xhvAnmount)) {
      dispatch(
        addNotificationByMessage(
          NotificationType.ERROR,
          "Exchanges cannot exceed 4 decimals"
        )
      );
      return;
    }

    const amount = bigInt(Math.round(xhvAnmount * 10000) * 1e8);
    dispatch(
      onExchangeCreationFetch({ priority, exchangeType, address } as Partial<
        ExchangeProcessInfo
      >)
    );
    const destinations = [
      new MoneroDestination(address, amount.toString()).toJson(),
    ];
    const txType =
      exchangeType === ExchangeType.Onshore
        ? HavenTxType.ONSHORE
        : HavenTxType.OFFSHORE;

    const txConfig: Partial<ITxConfig> = {
      canSplit: true,
      destinations,
      accountIndex: 0,
      relay: false,
      txType,
      priority,
    } as Partial<ITxConfig>;

    try {
      const createdTx: MoneroTxWallet[] = await walletProxy.transfer(txConfig);

      const exchangeInfo = parseExchangeResonse(createdTx, exchangeType);
      dispatch(onExchangeCreationSucceed(exchangeInfo));
      dispatch(showModal(MODAL_TYPE.ConfirmExchange));
    } catch (e) {
      dispatch(addErrorNotification(e));
      dispatch(onExchangeCreationFailed(e));
    }
  };
}

const parseExchangeResonse = (
  txList: MoneroTxWallet[],
  exchangeType: ExchangeType
): Partial<ExchangeProcessInfo> => {
  let fromAmount: bigInt.BigInteger;
  let toAmount: bigInt.BigInteger;
  let fee: bigInt.BigInteger;

  //@ts-ignore
  toAmount = txList.reduce(
    (acc: bigInt.BigInteger, tx: MoneroTxWallet) =>
      //@ts-ignore
      acc.add(bigInt(tx.getIncomingAmount().toString())),
    bigInt(0)
  );
  fromAmount = txList.reduce(
    (acc: bigInt.BigInteger, tx: MoneroTxWallet) =>
      acc.add(bigInt(tx.getOutgoingAmount().toString())),
    bigInt(0)
  );
  fee = txList.reduce(
    (acc: bigInt.BigInteger, tx: MoneroTxWallet) =>
      acc.add(bigInt(tx.getFee().toString())),
    bigInt(0)
  );
  const metaList: Array<string> = txList.map((tx: MoneroTxWallet) =>
    tx.getMetadata()
  );
  return { fromAmount, toAmount, fee, metaList };
};

export const confirmExchange = (metaList: Array<string>) => {
  return async (dispatch: any, getState: () => DesktopAppState) => {
    dispatch(onExchangeFetch());

    try {
      const hashes = await walletProxy.relayTxs(metaList);
      dispatch(onExchangeSucceed());
      const {
        fromAmount,
        toAmount,
        fromTicker,
        toTicker,
      } = getState().exchangeProcess;
      dispatch(
        addExchangeSucceedMessage(
          fromTicker!,
          toTicker!,
          fromAmount!,
          toAmount!
        )
      );
    } catch (e) {
      dispatch(addErrorNotification(e));
      dispatch(onExchangeFailed(e));
    }
    dispatch(resetExchangeProcess());
  };
};

const onExchangeCreationSucceed = (payload: any) => {
  return { type: EXCHANGE_CREATION_SUCCEED, payload };
};

const onExchangeCreationFailed = (error: any) => {
  return { type: EXCHANGE_CREATION_FAILED, payload: error };
};

const onExchangeCreationFetch = (payload: Partial<ExchangeProcessInfo>) => {
  return { type: EXCHANGE_CREATION_FETCHING, payload };
};

const onExchangeSucceed = () => {
  return { type: EXCHANGE_SUCCEED };
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
