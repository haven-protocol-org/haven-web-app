import { getTransferRPC } from "../ipc/rpc/rpc";
import {
  GET_TRANSFERS_FAILED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED
} from "./types";
import {TransferType, XTransferList} from "shared/reducers/xTransferList";
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

const filterForDoubleEntries = (entries:any[] | undefined) => {

  if (entries === undefined){
    return undefined;
  }

  return entries.filter((entry: any, index:number) => {
    return index ===  entries.findIndex( (tempEntry) => tempEntry.txid === entry.txid && tempEntry.type === entry.type );});};


const createTxListByCurrency = (txList: any) => {

  const xUSDList = txList.filter( (txEntry: any) =>
      txEntry.type === TransferType.xUSDIn
      || txEntry.type === TransferType.xUSDOut
      || txEntry.type === TransferType.xUSDPending
       );
  const xhvList = txList.filter( (txEntry: any) =>
      txEntry.type === TransferType.XHVIn
      || txEntry.type === TransferType.XHVOut
      || txEntry.type === TransferType.XHVPending
      || txEntry.type === TransferType.Mining);

  return {

    [Ticker.XHV]: xhvList,
    [Ticker.xUSD]: xUSDList
  }
};

export const mergeAndSort = (result: {[key:string]: any | undefined [], in?: any [] | undefined, out?: any[] | undefined, pending?: any[] | undefined, pool?: any[] | undefined }) => {

  result.out = filterForDoubleEntries(result.out);

  const txTypes: string[] = Object.keys(result);
  let all: any[] = [];

  txTypes.forEach( (txType: string) => {
    const txArray =  result[txType];
    if (!txArray) {
      return;
    }
      txArray.forEach( (txEntry: any) => txEntry['direction'] = txType );
      all = [...all, ...txArray];

  } );

  all.sort((a, b) => b.timestamp - a.timestamp);
  return all;
};
