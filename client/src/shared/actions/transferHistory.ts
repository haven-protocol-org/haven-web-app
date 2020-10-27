import { walletProxy } from "shared/core/proxy";
import { addErrorNotification } from "./notification";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import {
  GET_TRANSFERS_SUCCEED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_FAILED,
} from "./types";
import { isDesktop } from "constants/env";

export const getAllTransfers = () => {
  return async (dispatch: any) => {
    dispatch(getTransfersFetching());

    try {
      let transfers: MoneroTxWallet[] = await walletProxy.getTxs();
      //Desktop is always handling serialized objects from wallets so we need to create the according instances of it

      if (isDesktop()) {
        transfers = transfers.map((state: any) => new MoneroTxWallet(state));
      }
      dispatch(getTransfersSucceed(transfers));
    } catch (e) {
      dispatch(addErrorNotification(e));
      dispatch(getTransfersFailed(e));
    }
  };
};

const getTransfersSucceed = (walletTxs: MoneroTxWallet[]) => ({
  type: GET_TRANSFERS_SUCCEED,
  payload: walletTxs,
});

const getTransfersFetching = () => ({
  type: GET_TRANSFERS_FETCHING,
  payload: { isFetching: true },
});

const getTransfersFailed = (error: any) => ({
  type: GET_TRANSFERS_FAILED,
  payload: error,
});
