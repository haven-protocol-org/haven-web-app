import { getTransferRPC } from "../ipc/rpc/rpc";
import {
  GET_TRANSFERS_FAILED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED
} from "./types";
import {XTransferListAsset, TransferType, XTransferList} from "shared/reducers/xTransferList";
import {Ticker} from "shared/reducers/types";

export const getTransfers = () => {
  return (dispatch: any) => {
    dispatch(getTransfersFetching());
    const params = { in: true, out: true, pending: true, pool:true };
    getTransferRPC(params)
      .then(mergeAndSort)
      .then(createTxListByCurrency)
      .then((txLists: XTransferList) => {
        dispatch(getTransfersSucceed(txLists));
      })
      .catch((error: any) => {
        dispatch(getTransfersFailed(error));
      });
  };
};

const getTransfersFetching = () => ({
  type: GET_TRANSFERS_FETCHING,
  payload: { isFetching: true }
});

const getTransfersSucceed = (txListEntry: XTransferList) => ({
  type: GET_TRANSFERS_SUCCEED,
  payload: txListEntry
});

const getTransfersFailed = (error: any) => ({
  type: GET_TRANSFERS_FAILED,
  payload: error
});


const createTxListByCurrency = (txList: any) => {

  const xUSDList = txList.filter( (txEntry: any) => txEntry.type === TransferType.xUSDIn || txEntry.type === TransferType.xUSDOut );
  const xhvList = txList.filter( (txEntry: any) => txEntry.type === TransferType.XHVIn || txEntry.type === TransferType.XHVOut );

  return {
  [Ticker.XHV]: xhvList,
    [Ticker.xUSD]: xUSDList
  }

};

export const mergeAndSort = (result: {[key:string]: any | undefined [], in?: any [], out?: any[], pending?: any[] | null, pool?: any[] }) => {


  const txTypes: string[] = Object.keys(result);

  let all: any[] = [];

  txTypes.forEach( (txType: string) => {

    const txArray =  result[txType];

      txArray.forEach( (txEntry: any) => txEntry['direction'] = txType );
      all = [...all, ...txArray];

  } );

  all.sort((a, b) => b.timestamp - a.timestamp);
  return all;
};
