import bigInt from "big-integer";
import { walletProxy } from "shared/core/proxy";
import {
  addErrorNotification,
  addNotificationByKey,
} from "shared/actions/notification";
import { TRANSFER_SUCCEED_MESSAGE } from "constants/notificationList";
import { Ticker } from "shared/reducers/types";
import { hideModal, showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { TxProcessInfo } from "shared/reducers/transferProcess";
import { ITxConfig } from "typings";
import {
  MoneroDestination,
  HavenTxType,
  MoneroTxPriority,
} from "haven-wallet-core";
import {
  TRANSFER_FETCHING,
  TRANSFER_FAILED,
  TRANSFER_SUCCEED,
  TRANSFER_CREATION_FETCHING,
  TRANSFER_CREATION_SUCCEED,
  TRANSFER_CREATION_FAILED,
  TRANSFER_RESET,
} from "./types";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import { convertMoneyToBalance } from "utility/utility";

export const createTransfer = (
  address: string,
  amount: number,
  fromTicker: Ticker,
  sweepAll: boolean
) => {




  return async (dispatch: any) => {

  

    const priority = MoneroTxPriority.NORMAL;
    const txType =
      fromTicker === Ticker.XHV
        ? HavenTxType.CLASSIC
        : HavenTxType.OFFSHORE_TO_OFFSHORE;
    
    dispatch(
      transferCreationFetch({
        address,
        fromTicker,
        priority,
      })
    );

    const txConfig: Partial<ITxConfig> = {
      canSplit: true,
      accountIndex: 0,
      relay: false,
      txType,
      priority,
    } as Partial<ITxConfig>;


    if (sweepAll) {
      txConfig.address = address;
    } else {
      const amountInt = convertMoneyToBalance(amount);
      const destinations = [new MoneroDestination(address, amountInt.toString()).toJson(),]
      txConfig.destinations = destinations;
    }
  

    try {
      const txList: MoneroTxWallet[] = sweepAll? await walletProxy.sweep(txConfig) :  await walletProxy.transfer(txConfig);

      const reduxParams = {
        fee: txList.reduce(
          (acc: bigInt.BigInteger, tx: MoneroTxWallet) =>
            acc.add(bigInt(tx.getFee().toString())),
          bigInt(0)
        ),
        fromAmount: txList.reduce(
          (acc: bigInt.BigInteger, tx: MoneroTxWallet) =>
            acc.add(bigInt(tx.getOutgoingAmount().toString())),
          bigInt(0)
        ),
        metaList: txList.map((tx: MoneroTxWallet) => tx.getMetadata()),
      } as Partial<TxProcessInfo>;

      //console.log(createdTx[0].toJson());
      dispatch(transferCreationSucceed(reduxParams));
      dispatch(showModal(MODAL_TYPE.ConfirmTx));
    } catch (e) {
      dispatch(addErrorNotification(e));
      dispatch(transferCreationFailed(e));
    }
  };
};

export const confirmTransfer = (metaList: Array<string>) => {
  return async (dispatch: any) => {
    dispatch(transferFetch());

    try {
      const hashes = await walletProxy.relayTxs(metaList);
      dispatch(transferSucceed());
      dispatch(addNotificationByKey(TRANSFER_SUCCEED_MESSAGE));
    } catch (e) {
      dispatch(manageTransferFailed(e));
    }
    dispatch(hideModal());
  };
};

const transferFetch = () => ({
  type: TRANSFER_FETCHING,
  payload: { isFetching: true },
});
const transferSucceed = () => ({
  type: TRANSFER_SUCCEED,
});

const transferFailed = (error: any) => ({
  type: TRANSFER_FAILED,
  payload: { ...error, isFetching: false },
});

const transferCreationFetch = (params: object) => ({
  type: TRANSFER_CREATION_FETCHING,
  payload: { ...params, isFetching: true },
});
const transferCreationSucceed = (result: object) => ({
  type: TRANSFER_CREATION_SUCCEED,
  payload: { ...result },
});

const transferCreationFailed = (error: any) => ({
  type: TRANSFER_CREATION_FAILED,
  payload: { ...error, isFetching: false },
});

const manageTransferFailed = (error: any) => {
  return (dispatch: any) => {
    dispatch(transferFailed(error));
    dispatch(addErrorNotification(error));
  };
};

export const resetTransferProcess = () => {
  return { type: TRANSFER_RESET };
};
