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
import MoneroIncomingTransfer from "haven-wallet-core/src/main/js/wallet/model/MoneroIncomingTransfer";
import { TxEntry } from "shared/components/tx-history/container";
import { bigIntegerToBigInt } from "utility/utility";
import MoneroOutgoingTransfer from "haven-wallet-core/src/main/js/wallet/model/MoneroOutgoingTransfer";

const INITAL_STATE: MoneroTxWallet[] = [];

export const xTransferList = (
  state = INITAL_STATE,
  action: AnyAction
): MoneroTxWallet[] => {
  switch (action.type) {
    case GET_TRANSFERS_SUCCEED:
      return action.payload;
    default:
      return state;
  }
};

export const selectTransferListByTicker = (
  state: HavenAppState,
  tickerId: Ticker
): TxEntry[] => {
  const walletTxs = state.xTransferList;
  const txEntries: TxEntry[] = walletTxs.reduce(
    (list: TxEntry[], walletTx: MoneroTxWallet) => {
      // const props: Partial<TransactionProps> = {};

      const incomings:
        | undefined
        | MoneroIncomingTransfer[] = walletTx.getIncomingTransfers();
      const outgoing:
        | undefined
        | MoneroOutgoingTransfer = walletTx.getOutgoingTransfer();

      if (incomings !== undefined && incomings[0].getCurrency() === tickerId) {
        const txEntry: Partial<TxEntry> = {};
        txEntry.hash = walletTx.getHash();
        txEntry.amount = bigIntegerToBigInt(walletTx.getIncomingAmount());
        txEntry.fee = bigIntegerToBigInt(walletTx.getFee());
        txEntry.height = walletTx.getHeight();
        txEntry.unlockHeight = walletTx.getUnlockHeight();
        txEntry.mempool = walletTx.inTxPool();
        txEntry.isIncoming = true;
        txEntry.isConfirmed = walletTx.isConfirmed();
        txEntry.isMinerTx = walletTx.isMinerTx();
        txEntry.timestamp = walletTx.isConfirmed()
          ? walletTx.getBlock().getTimestamp()
          : Date.now() / 1000;
        list.push(txEntry as TxEntry);
      }

      if (outgoing !== undefined && outgoing.getCurrency() === tickerId) {
        const txEntry: Partial<TxEntry> = {};
        txEntry.hash = walletTx.getHash();
        txEntry.amount = bigIntegerToBigInt(walletTx.getOutgoingAmount());
        txEntry.fee = bigIntegerToBigInt(walletTx.getFee());
        txEntry.height = walletTx.getHeight();
        txEntry.unlockHeight = walletTx.getUnlockHeight();
        txEntry.isIncoming = false;
        txEntry.mempool = walletTx.inTxPool();
        txEntry.isConfirmed = walletTx.isConfirmed();
        txEntry.isMinerTx = walletTx.isMinerTx();
        txEntry.timestamp = walletTx.isConfirmed()
          ? walletTx.getBlock().getTimestamp()
          : Date.now() / 1000;
        list.push(txEntry as TxEntry);
      }

      return list;
    },
    []
  );

  txEntries.sort((a: TxEntry, b: TxEntry) => b.timestamp - a.timestamp);

  return txEntries;
};
