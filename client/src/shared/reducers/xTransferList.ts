import { Ticker } from "./types";
import { AnyAction } from "redux";
import {
  GET_TRANSFERS_SUCCEED,
} from "../actions/types";
import { HavenAppState } from "../../platforms/desktop/reducers";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import MoneroIncomingTransfer from "haven-wallet-core/src/main/js/wallet/model/MoneroIncomingTransfer";
import { TxEntry, Conversion } from "shared/components/tx-history/container";
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
        txEntry.mempool = walletTx.inTxPool() || walletTx.getNumConfirmations() === 0;
        txEntry.isIncoming = true;
        txEntry.isConfirmed = walletTx.isConfirmed();
        txEntry.isFailed = walletTx.isFailed();
        txEntry.conversion = getConversion(walletTx, txEntry.isIncoming );
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
        txEntry.mempool = walletTx.inTxPool() || walletTx.getNumConfirmations() === 0;
        txEntry.isConfirmed = walletTx.isConfirmed();
        txEntry.isFailed = walletTx.isFailed();
        txEntry.conversion = getConversion(walletTx, txEntry.isIncoming);
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

  txEntries.sort((a: TxEntry, b: TxEntry) => b.isFailed !== a.isFailed? b.isFailed? -1: 1: b.timestamp - a.timestamp);

  return txEntries;
};

function getConversion(walletTx: MoneroTxWallet, isIncoming: boolean ) : Conversion {
  let conversion: Conversion = {isConversion: false};
  let possibleConversion : MoneroOutgoingTransfer = (isIncoming) ? walletTx.getOutgoingTransfer() : walletTx.getIncomingTransfers() ;
  if( possibleConversion && possibleConversion ){
    if( Array.isArray(possibleConversion) ){
      possibleConversion = possibleConversion[0];
    }
    conversion.amount = possibleConversion.getAmount();
    conversion.assetId = possibleConversion.getCurrency();
    conversion.isConversion = true;
  }
  return conversion;
}


export const hasNoTxsEntries = (state: HavenAppState): boolean => {

  return state.xTransferList.length === 0;

}



export const getHeightOfFirstIncomingTx = (state: HavenAppState) :number => {

const currentHeight = state.chain.walletHeight;
const walletTxs = state.xTransferList;

const firstTxHeight: number = walletTxs.reduce(
    (height: number, walletTx: MoneroTxWallet) => {
      const incomings:
        | undefined
        | MoneroIncomingTransfer[] = walletTx.getIncomingTransfers();

      if (incomings !== undefined) {
        const incomingHeight = walletTx.getHeight();
        if (incomingHeight !== undefined) {
          height = Math.min(height, incomingHeight);
        }
      }
      return height;
    },
    currentHeight
  );

  return firstTxHeight;
}
