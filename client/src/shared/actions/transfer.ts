import {
  offshoreTransferRPC,
  relayTXRPC,
  transfer_splitRPC,
} from "../ipc/rpc/rpc";

import {
  TRANSFER_CREATION_FAILED,
  TRANSFER_CREATION_FETCHING,
  TRANSFER_CREATION_SUCCEED,
  TRANSFER_FAILED,
  TRANSFER_FETCHING,
  TRANSFER_RESET,
  TRANSFER_SUCCEED,
} from "./types";

import {
  addErrorNotification,
  addNotificationByKey,
} from "shared/actions/notification";
import { TRANSFER_SUCCEED_MESSAGE } from "constants/notificationList";
import { Ticker } from "shared/reducers/types";
import { hideModal, showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { getTransfers } from "platforms/desktop/actions/transferHistory";
import {TxProcessInfo} from "shared/reducers/transferProcess";

export const transfer = (
  address: string,
  amount: number,
  paymentId: string,
  fromTicker: Ticker
) => {
  amount = amount * 1e12;
  return (dispatch: any) => {
    dispatch(transferFetch());
    const params: any = { destinations: [{ address, amount }], ring_size: 11 };

    if (paymentId !== "") {
      params["payment_id"] = paymentId;
    }

    const transferFN =
      fromTicker === Ticker.XHV ? transfer_splitRPC : offshoreTransferRPC;

    transferFN(params)
      .then((result) => {
        dispatch(transferSucceed());
        dispatch(addNotificationByKey(TRANSFER_SUCCEED_MESSAGE));

        dispatch(getTransfers());
      })
      .catch((error) => dispatch(manageTransferFailed(error)));
  };
};

export const createTransfer = (
  address: string,
  fromAmount: number,
  paymentId: string,
  fromTicker: Ticker
) => {
  const amount = fromAmount * 1e12;
  return (dispatch: any) => {
    dispatch(
      transferCreationFetch({ address, fromAmount, paymentId, fromTicker })
    );
    const params: any = createTXInputs(address, amount, paymentId);

    const isOffshoreTX = fromTicker !== Ticker.XHV;
    const transferFN =
    isOffshoreTX ? offshoreTransferRPC:transfer_splitRPC;

    transferFN(params)
      .then((result) => {
        const { fee_list, tx_metadata_list } = result;
        const amount_list = isOffshoreTX ? result.amount_usd_list : result.amount_list;
        const reduxParams = {
          fee: fee_list.reduce( (acc: number, value: number) => acc + value,0 ),
          fromAmount: amount_list.reduce( (acc: number, value: number) => acc + value,0 ),
          metaList: tx_metadata_list,
        } as Partial<TxProcessInfo>;

        dispatch(transferCreationSucceed(reduxParams));
        dispatch(showModal(MODAL_TYPE.ConfirmTx));
      })
      .catch((error) => {
        dispatch(addErrorNotification(error));
        dispatch(transferCreationFailed(error));
      })
    }
}

export const confirmTransfer = (metaList: Array<string>) => {
  return (dispatch: any) => {
    dispatch(transferFetch());

    const promises = metaList.map( (hex) => relayTXRPC({hex}) );

    Promise.allSettled(promises)
      .then(() => {
        dispatch(transferSucceed());
        dispatch(addNotificationByKey(TRANSFER_SUCCEED_MESSAGE));
        dispatch(getTransfers());
      })
      .catch((error) => dispatch(manageTransferFailed(error)))
      .finally(() => dispatch(hideModal()));
  };
};

const createTXInputs = (address: string, amount: number, paymentId: string) => {
  const params: any = {
    destinations: [{ address, amount }],
    ring_size: 11,
    do_not_relay: true,
    get_tx_metadata: true,
  };

  if (paymentId !== "") {
    params["payment_id"] = paymentId;
  }

  return params;
};

const transferFetch = () => ({
  type: TRANSFER_FETCHING,
  payload: { isFetching: true },
});
const transferSucceed = () => ({
  type: TRANSFER_SUCCEED
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
