import bigInt from "big-integer";
import { walletProxy } from "shared/core/proxy";
import {
  addErrorNotification,
  addNotificationByKey,
} from "shared/actions/notification";
import { AUDIT_SUCCEED_MESSAGE } from "constants/notificationList";
import { Ticker } from "shared/reducers/types";
import { hideModal, showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { AuditProcessInfo } from "shared/reducers/auditProcess";
import { ITxConfig } from "typings";
import {
  MoneroTxPriority,
} from "haven-wallet-core";
import {
  AUDIT_FETCHING,
  AUDIT_FAILED,
  AUDIT_SUCCEED,
  AUDIT_CREATION_FETCHING,
  AUDIT_CREATION_SUCCEED,
  AUDIT_CREATION_FAILED,
  AUDIT_RESET,
} from "./types";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import { convertMoneyToBalance } from "utility/utility";
import { getAllTransfers } from "./transferHistory";

export const createAudit = (keep_subaddress: boolean, priority: number, relay: boolean) => {
  return async (dispatch: any) => {
    dispatch(
      auditCreationFetch({
        keep_subaddress,
        priority
      })
    );

    try {
      const address = await walletProxy.getPrimaryAddress();
      const txList: MoneroTxWallet[] = await walletProxy.audit(address, keep_subaddress, priority, false);

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
      } as Partial<AuditProcessInfo>;

      dispatch(auditCreationSucceed(reduxParams));
      dispatch(showModal(MODAL_TYPE.ConfirmAudit));
    } catch (e) {
      dispatch(addErrorNotification(e));
      dispatch(auditCreationFailed(e));
    }
  };
};

export const confirmAudit = (metaList: Array<string>) => {
  return async (dispatch: any) => {
    dispatch(auditFetch());

    try {
      const hashes = await walletProxy.relayTxs(metaList);
      dispatch(auditSucceed());
      dispatch(addNotificationByKey(AUDIT_SUCCEED_MESSAGE));
      dispatch(getAllTransfers());
    } catch (e) {
      dispatch(manageAuditFailed(e));
    }
    dispatch(hideModal());
  };
};

const auditFetch = () => ({
  type: AUDIT_FETCHING,
  payload: { isFetching: true },
});
const auditSucceed = () => ({
  type: AUDIT_SUCCEED,
});

const auditFailed = (error: any) => ({
  type: AUDIT_FAILED,
  payload: { ...error, isFetching: false },
});

const auditCreationFetch = (params: object) => ({
  type: AUDIT_CREATION_FETCHING,
  payload: { ...params, isFetching: true },
});
const auditCreationSucceed = (result: object) => ({
  type: AUDIT_CREATION_SUCCEED,
  payload: { ...result },
});

const auditCreationFailed = (error: any) => ({
  type: AUDIT_CREATION_FAILED,
  payload: { ...error, isFetching: false },
});

const manageAuditFailed = (error: any) => {
  return (dispatch: any) => {
    dispatch(auditFailed(error));
    dispatch(addErrorNotification(error));
  };
};

export const resetAuditProcess = () => {
  return { type: AUDIT_RESET };
};
