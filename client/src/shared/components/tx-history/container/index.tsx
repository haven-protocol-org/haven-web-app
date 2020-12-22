import {
  EmptyState,
  History,
  Message,
  NoTransactions,
  Illustration,
} from "shared/pages/_wallet/details/styles";
import { Spinner } from "shared/components/spinner";
import {
  convertBalanceToMoney,
  createRemainingTimeString,
} from "utility/utility";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Transaction, TransactionProps } from "shared/components/tx-history/component";
import Header from "shared/components/_layout/header/index.js";
import { selectBlockHeight } from "shared/reducers/chain";
import { selectTransferListByTicker } from "shared/reducers/xTransferList";
import { withRouter } from "react-router";
import { Ticker } from "shared/reducers/types";
import { HavenAppState } from "platforms/desktop/reducers";
import {
  BlockHeaderRate,
  selectXRate,
} from "shared/reducers/blockHeaderExchangeRates";
import { getAllTransfers } from "shared/actions/transferHistory";


export interface TxEntry {

  hash:string;
  timestamp: number;
  mempool: boolean;
  amount: bigInt.BigInteger;
  fee: bigInt.BigInteger;
  unlockHeight: number;
  height:number;
  isConfirmed: boolean;
  isMinerTx: boolean;
  isIncoming: boolean;
}


interface TxHistoryProps {
  transferList: TxEntry[];
  height: number;
  rates: BlockHeaderRate[];
  assetId: Ticker;
  getAllTransfers:() => void;
}

class TxHistoryContainer extends Component<TxHistoryProps, any> {

  static getTransactionType(tx: TxEntry) {
    if (tx.isMinerTx) {
      return "Mined";
    } else if (tx.mempool) {
      return "Pending";
    } else if (!tx.isIncoming) {
      return "Sent";
    } else  {
      return "Received";
    }
  }

  componentDidMount() {
    this.props.getAllTransfers();
  }

  render() {
    const all = this.props.transferList;
    const isFetching = false;
    const currentHeight = this.props.height;

    return (
      <>
        <Header
          title="History"
          description={`Review your ${this.props.assetId} transaction history`}
        />
        {isFetching && all == null ? (
          <EmptyState>
            <Spinner />
            <Message>Loading transaction history...</Message>
          </EmptyState>
        ) : (
          <History>
            {all && all.length > 0 ? (
              all.map((transaction: any, index: number) => {
                const txProps: TransactionProps = prepareTxInfo(
                  transaction,
                  currentHeight,
                  this.props.assetId,
                  this.props.rates
                )
                return <Transaction {...txProps} key={index} />;
              })
            ) : (
              <EmptyState>
                <NoTransactions>
                  <Illustration />
                </NoTransactions>
                <Message>
                  No transactions found. Once you send, receive or exchange
                  tokens your transactions will appear here.
                </Message>
              </EmptyState>
            )}
          </History>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: HavenAppState, props: any) => ({
  transferList: selectTransferListByTicker(state, props.match.params.id),
  height: selectBlockHeight(state),
  rates: state.blockHeaderExchangeRate,
});

export const TxHistoryDesktop = withRouter(
  connect(mapStateToProps, { getAllTransfers })(TxHistoryContainer)
);




const prepareTxInfo = (
  tx: TxEntry,
  currentHeight: number,
  ticker: Ticker,
  rates: BlockHeaderRate[]
): TransactionProps => {
  const xRate = selectXRate(rates, ticker, Ticker.xUSD);

  const transactionDate = new Date(
    tx.timestamp * 1000
  ).toLocaleDateString();
  const mempool = tx.mempool;
  const readableAmount = convertBalanceToMoney(tx.amount);
  const currentValueInUSD = readableAmount * xRate;

  const txType = TxHistoryContainer.getTransactionType(
    tx
  );

  let blocksTillUnlocked: number = 0;

  // when unlock_time is 0 we have a regular tx which is unlocked after 10 confirmations
  if (tx.unlockHeight === 0) {
    blocksTillUnlocked = Math.max(tx.height + 10 - currentHeight,0);
  }
  // if unlock_time is higher than transaction height then we expect a mining
  // income where unlock_time is the index of the block where it is unlocked
  else if (tx.unlockHeight > tx.height) {
    if (tx.unlockHeight > currentHeight) {
      blocksTillUnlocked = tx.unlockHeight - currentHeight;
    }
  }
  const minutesTillUnlocked = blocksTillUnlocked * 2;
  const timeTillUnlocked =
    minutesTillUnlocked > 0
      ? createRemainingTimeString(minutesTillUnlocked)
      : null;

  return {
    timeTillUnlocked,
    type: txType,
    currentValueInUSD,
    mempool,
    date: transactionDate,
    amount: readableAmount,
    hash: tx.hash,
    fee: convertBalanceToMoney(tx.fee),
    block: tx.height
  };
};
