import { getTransferRPC } from "../rpc/rpc";
import {
  GET_TRANSFERS_FAILED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED
} from "./types";

/**
 * just refresh tx from interest - latest pending tx
 */
export const updateLatestTransfers = () => {


};


export const getTransfers = () => {
  return dispatch => {
    dispatch(getTransfersFetching());
    const params = { in: true, out: true, pending: true };
    getTransferRPC(params)
      .then(mergeAndSort)
      .then(result => {
        dispatch(getTransfersSucceed(result));
      })
      .catch(error => {
        dispatch(getTransfersFailed(error));
      });
  };
};

const getTransfersFetching = () => ({
  type: GET_TRANSFERS_FETCHING,
  payload: { isFetching: true }
});

const getTransfersSucceed = result => ({
  type: GET_TRANSFERS_SUCCEED,
  payload: result
});

const getTransfersFailed = error => ({
  type: GET_TRANSFERS_FAILED,
  payload: error
});

const mergeAndSort = result => {
  const all = [
    ...result.in,
    ...result.out,
    ...(result.pending ? result.pending : [])
  ];
  all.sort((a, b) => b.timestamp - a.timestamp);
  result.all = all;
  return result;
};
