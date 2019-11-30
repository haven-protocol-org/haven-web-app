import { getTransferRPC } from "../ipc/rpc/rpc";
import {GET_TRANSFERS_FAILED, GET_TRANSFERS_FETCHING, GET_TRANSFERS_SUCCEED} from "./types";
import {XTransferListAsset} from "../../../universal/reducers/xTransferList";


export const getTransfers = () => {
  return (dispatch:any) => {
    dispatch(getTransfersFetching());
    const params = { in: true, out: true, pending: true };
    getTransferRPC(params)
      .then(mergeAndSort)
      .then( (txList:any[]) => {
        dispatch(getTransfersSucceed({XHV:txList}));
      })
      .catch( (error: any) => {
        dispatch(getTransfersFailed(error));
      });
  };
};

const getTransfersFetching = () => ({
  type: GET_TRANSFERS_FETCHING,
  payload: { isFetching: true }
});

const getTransfersSucceed = (txListEntry: XTransferListAsset) => ({
  type: GET_TRANSFERS_SUCCEED,
  payload: txListEntry
});

const getTransfersFailed = (error: any) => ({
  type: GET_TRANSFERS_FAILED,
  payload: error
});

export const mergeAndSort = (result: any) => {
  const all = [
    ...result.in||[],
    ...result.out||[],
    ...result.pending||[]
  ];
  all.sort((a, b) => b.timestamp - a.timestamp);
  return all;
};
