import { getOffshoreTransfersRPC } from "../ipc/rpc/rpc";
import {
  GET_OFFSHORE_TRANSFERS_FAILED,
  GET_OFFSHORE_TRANSFERS_FETCHING,
  GET_OFFSHORE_TRANSFERS_SUCCEED
} from "./types";
import { mergeAndSort } from "./transferHistory";
import { XTransferListAsset } from "../../../shared/reducers/xTransferList";

export function getOffshoreTransfers() {
  return (dispatch: any) => {
    dispatch(getOffshoreTransfersFetching());

    const params = { in: true, out: true, pending: true };

    getOffshoreTransfersRPC(params)
      .then(mergeAndSort)
      .then((txList: any[]) =>
        dispatch(getOffshoreTransfersSucceed({ xUSD: txList }))
      )
      .catch((err: any) => dispatch(getOffshoreTransfersFailed(err)));
  };
}

const getOffshoreTransfersFetching = () => {
  return { type: GET_OFFSHORE_TRANSFERS_FETCHING };
};

const getOffshoreTransfersSucceed = (txListEntry: XTransferListAsset) => {
  return { type: GET_OFFSHORE_TRANSFERS_SUCCEED, payload: txListEntry };
};

const getOffshoreTransfersFailed = (error: any) => {
  return { type: GET_OFFSHORE_TRANSFERS_FAILED, payload: error };
};
