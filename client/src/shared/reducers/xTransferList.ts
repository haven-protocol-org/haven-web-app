import { Ticker } from "./types";
import { AnyAction, combineReducers } from "redux";
import {
  GET_TRANSFERS_FAILED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED,
} from "../actions/types";
import { INITAL_FETCHING_STATE, XFetching } from "./types";
import { HavenAppState } from "../../platforms/desktop/reducers";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import { TransactionProps } from "shared/components/tx-history/component";
import MoneroIncomingTransfer from "haven-wallet-core/src/main/js/wallet/model/MoneroIncomingTransfer";
import { TxEntry } from "shared/components/tx-history/container";
import { bigIntegerToBigInt } from "utility/utility";
import MoneroOutgoingTransfer from "haven-wallet-core/src/main/js/wallet/model/MoneroOutgoingTransfer";



const INITAL_STATE: MoneroTxWallet[] = [];

const fetching = (
  state = INITAL_FETCHING_STATE,
  action: AnyAction
): XFetching => {
  switch (action.type) {
    case GET_TRANSFERS_SUCCEED:
    case GET_TRANSFERS_FAILED:
    case GET_TRANSFERS_FETCHING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const list = (state = INITAL_STATE, action: AnyAction): MoneroTxWallet[] => {
  switch (action.type) {
    case GET_TRANSFERS_SUCCEED:
      return { ...action.payload };
    default:
      return state;
  }
};

export const xTransferList = combineReducers({
  list,
  fetching,
});

export const selectTransferListByTicker = (
  state: HavenAppState,
  tickerId: Ticker
): TxEntry[] => {
  

  const walletTxs = state.xTransferList;
  const txEntries: TxEntry[] = walletTxs.list.reduce( (list:TxEntry[], walletTx: MoneroTxWallet) => {


    
   // const props: Partial<TransactionProps> = {};

    const incomings: undefined | MoneroIncomingTransfer [] = walletTx.getIncomingTransfers();
    const outgoing: undefined | MoneroOutgoingTransfer = walletTx.getOutgoingTransfer();
    if (incomings !== undefined && incomings[0].getCurrency()  === tickerId) {


      const txEntry: Partial<TxEntry> = {};
      txEntry.hash = walletTx.getHash();
      txEntry.amount =  bigIntegerToBigInt(walletTx.getIncomingAmount());
      txEntry.fee = bigIntegerToBigInt(walletTx.getFee());
      txEntry.height = walletTx.getHeight();
      txEntry.unlockHeight = walletTx.getUnlockHeight();
      txEntry.mempool = walletTx.inTxPool();
      txEntry.isConfirmed = walletTx.isConfirmed();
      txEntry.isMinerTx = walletTx.isMinerTx();
      txEntry.timestamp = walletTx.getReceivedTimestamp();
      list.push(txEntry as TxEntry);


    }

    if (outgoing !== undefined && outgoing.getCurrency()  === tickerId) {

      const txEntry: Partial<TxEntry> = {};
      txEntry.amount =  bigIntegerToBigInt(walletTx.getOutgoingAmount());
      txEntry.fee = bigIntegerToBigInt(walletTx.getFee());
      txEntry.height = walletTx.getHeight();
      txEntry.unlockHeight = walletTx.getUnlockHeight();
      txEntry.mempool = walletTx.inTxPool();
      txEntry.isConfirmed = walletTx.isConfirmed();
      txEntry.isMinerTx = walletTx.isMinerTx();
      txEntry.timestamp = walletTx.getLastRelayedTimestamp();
      list.push(txEntry as TxEntry);


    }

    return list;



  }, []) 

  return txEntries;

};


