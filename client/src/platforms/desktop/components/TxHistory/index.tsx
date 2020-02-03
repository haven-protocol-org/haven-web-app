import {
  EmptyState,
  History,
  Message,
  NoTransactions
} from "shared/pages/_wallet/details/styles";
import { Spinner } from "shared/components/spinner";
import {
  convertBalanceForReading,
  createRemainingTimeString, getCurrentValueInUSD
} from "utility/utility";
import empty from "assets/illustration/no_transactions.svg";
import React, { Component } from "react";
import { getTransfers } from "../../actions";
import { connect } from "react-redux";
import { Transaction } from "shared/components/transaction";
import Header from "shared/components/_layout/header/index.js";
import { selectBlockHeight } from "../../reducers/chain";
import {getTransferListByTicker} from "shared/reducers/xTransferList";
import { withRouter } from "react-router";
import { Ticker } from "shared/reducers/types";
import { DesktopAppState } from "platforms/desktop/reducers";

interface TxHistoryProps {
  transferList: any [] | null | undefined;
  height: number;
  price: number;
  assetId: Ticker;
  getTransfers: () => void;
}

class TxHistoryContainer extends Component<TxHistoryProps, any> {
  static getTransactionType(direction: string, type: string) {
    if (direction === "in" && type === "block") {
      return "Mined";
    } else if (direction === "out") {
      return "Sent";
    } else if (direction === "in") {
      return "Received";
    } else {
      return direction;
    }
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
                const currentValueInUSD = getCurrentValueInUSD(
                  transaction.amount,
                  this.props.assetId, this.props.price
                );
                const transactionDate = new Date(
                  transaction.timestamp * 1000
                ).toLocaleDateString();
                const isMempool =
                  transaction.direction === "pending" ||
                  transaction.direction === "pool";
                const readableAmount = convertBalanceForReading(
                  transaction.amount
                );
                const txType = TxHistoryContainer.getTransactionType(
                  transaction.direction,
                  transaction.type
                );

                let blocksTillUnlocked: number = 0;

                // when unlock_time is 0 we have a regular tx which is unlocked after 10 confirmations
                if (transaction.unlock_time === 0) {
                  blocksTillUnlocked = Math.max(
                    10 - transaction.confirmations,
                    0
                  );
                }
                // if unlock_time is higher than transaction height then we expect a mining
                // income where unlock_time is the index of the block where it is unlocked
                else if (transaction.unlock_time > transaction.height) {
                  if (transaction.unlock_time > currentHeight) {
                    blocksTillUnlocked =
                      transaction.unlock_time - currentHeight;
                  }
                }
                const minutesTillUnlocked = blocksTillUnlocked * 2;
                const timeTillUnlocked =
                  minutesTillUnlocked > 0
                    ? createRemainingTimeString(minutesTillUnlocked)
                    : null;

                return (
                  <Transaction
                    key={index}
                    type={txType}
                    status={transaction.direction}
                    currentValueInUSD={currentValueInUSD}
                    block={transaction.height}
                    date={transactionDate}
                    tx={transaction.txid}
                    fee={convertBalanceForReading(transaction.fee)}
                    mempool={isMempool}
                    amount={readableAmount}
                    timeTillUnlocked={timeTillUnlocked}
                  />
                );
              })
            ) : (
              <EmptyState>
                <NoTransactions src={empty} />
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

export const mapStateToProps = (state: DesktopAppState, props: any) => ({
  transferList: getTransferListByTicker(state, props.match.params.id),
  height: selectBlockHeight(state),
  price: state.simplePrice.price
});

export const TxHistoryDesktop = withRouter(
  connect(mapStateToProps, { getTransfers })(TxHistoryContainer)
);
