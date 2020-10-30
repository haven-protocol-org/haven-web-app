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
} from "platforms/desktop/actions/types";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";

export const createTransfer = (
  address: string,
  amount: number,
  paymentId: string,
  fromTicker: Ticker
) => {
  const amountInt = bigInt(amount).multiply(bigInt(1e12));

  return async (dispatch: any) => {
    const destinations = [
      new MoneroDestination(address, amountInt.toString()).toJson(),
    ];
    const priority = MoneroTxPriority.NORMAL;
    const txType =
      fromTicker === Ticker.XHV
        ? HavenTxType.CLASSIC
        : HavenTxType.OFFSHORE_TO_OFFSHORE;
    dispatch(
      transferCreationFetch({
        paymentId,
        address,
        fromTicker,
        fromAmount: amount,
        priority,
      })
    );

    const txConfig: Partial<ITxConfig> = {
      canSplit: true,
      paymentId,
      destinations,
      accountIndex: 0,
      relay: false,
      txType,
      priority,
    } as Partial<ITxConfig>;

    try {
      const txList: MoneroTxWallet[] = await walletProxy.transfer(txConfig);

      const reduxParams = {
        fee: txList.reduce(
          (acc: bigint, tx: MoneroTxWallet) =>
            acc + BigInt(tx.getFee().toString()),
          BigInt(0)
        ),
        fromAmount: txList.reduce(
          (acc: bigint, tx: MoneroTxWallet) =>
            acc + BigInt(tx.getOutgoingAmount().toString()),
          BigInt(0)
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
