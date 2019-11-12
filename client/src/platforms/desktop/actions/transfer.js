import { transferRPC } from "../rpc/rpc";
import { getTransfers } from "./";
import {TRANSFER_FAILED, TRANSFER_FETCHING, TRANSFER_RESET, TRANSFER_SUCCEED} from "./types";

import { getBalances } from "./";
import { addErrorNotification, addNotificationByKey} from "../../../universal/actions/notification";

export const transfer  = (address, amount, paymentId) => {
  amount = amount * 1e12;
  return (dispatch, getState) => {
    dispatch(transferFetch({ address, amount }));
    const params = { destinations: [{ address, amount }], ring_size: 11 };

    if (paymentId !== "") {
      params.payment_id = paymentId;
    }

    transferRPC(params)
      .then(result => {
        dispatch(transferSucceed(result));
        dispatch(addNotificationByKey(TRANSFER_SUCCEED));
        dispatch(getTransfers());
        dispatch(getBalances());
      })
      .catch(error => dispatch(manageTransferFailed(error)));
  };
};

const transferFetch = params => ({
  type: TRANSFER_FETCHING,
  payload: { ...params, isFetching: true }
});
const transferSucceed = result => ({
  type: TRANSFER_SUCCEED,
  payload: { ...result, isFetching: false }
});

const manageTransferFailed = error => {
  return dispatch => {
    dispatch(transferFailed(error));
    dispatch(addErrorNotification(error));
  };
};

const transferFailed = error => ({
  type: TRANSFER_FAILED,
  payload: { ...error, isFetching: false }
});



export const resetTransferProcess = () => {
  return {type: TRANSFER_RESET}
};
