import { offshoreTransferRPC, transferRPC } from "../ipc/rpc/rpc";
import { getTransfers } from "./";
import {
  TRANSFER_FAILED,
  TRANSFER_FETCHING,
  TRANSFER_RESET,
  TRANSFER_SUCCEED
} from "./types";

import { getBalance } from "./";
import {
  addErrorNotification,
  addNotificationByKey
} from "shared/actions/notification";
import { TRANSFER_SUCCEED_MESSAGE } from "../../../constants/notificationList";
import { getOffshoreTransfers } from "platforms/desktop/actions/offshoreTransferHistory";
import { getOffshoreBalance } from "platforms/desktop/actions/offshoreBalance";

export const transfer = (
  address: string,
  amount: number,
  paymentId: string
) => {
  amount = amount * 1e12;
  return (dispatch: any) => {
    dispatch(transferFetch({ address, amount }));
    const params: any = { destinations: [{ address, amount }], ring_size: 11 };

    if (paymentId !== "") {
      params["payment_id"] = paymentId;
    }

    transferRPC(params)
      .then(result => {
        dispatch(transferSucceed(result));
        dispatch(addNotificationByKey(TRANSFER_SUCCEED_MESSAGE));
        dispatch(getTransfers());
        dispatch(getBalance());
      })
      .catch(error => dispatch(manageTransferFailed(error)));
  };
};

export function offshoreTransfer(
  address: string,
  amount: number,
  paymentId: string
) {
  amount = amount * 1e12;
  return (dispatch: any) => {
    dispatch(transferFetch({ address, amount }));
    const params: any = { destinations: [{ address, amount }], ring_size: 11 };

    if (paymentId !== "") {
      params["payment_id"] = paymentId;
    }

    offshoreTransferRPC(params)
      .then(result => {
        dispatch(transferSucceed(result));
        dispatch(addNotificationByKey(TRANSFER_SUCCEED_MESSAGE));
        dispatch(getOffshoreTransfers());
        dispatch(getOffshoreBalance());
      })
      .catch(error => dispatch(manageTransferFailed(error)));
  };
}

const transferFetch = (params: object) => ({
  type: TRANSFER_FETCHING,
  payload: { ...params, isFetching: true }
});
const transferSucceed = (result: object) => ({
  type: TRANSFER_SUCCEED,
  payload: { ...result, isFetching: false }
});

const manageTransferFailed = (error: any) => {
  return (dispatch: any) => {
    dispatch(transferFailed(error));
    dispatch(addErrorNotification(error));
  };
};

const transferFailed = (error: any) => ({
  type: TRANSFER_FAILED,
  payload: { ...error, isFetching: false }
});

export const resetTransferProcess = () => {
  return { type: TRANSFER_RESET };
};
