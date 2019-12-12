import {
  EmptyState,
  History,
  Message,
  NoTransactions
} from "../../../../shared/pages/_wallet/details/styles";
import { Spinner } from "../../../../shared/components/spinner";
import { convertBalanceForReading } from "../../../../utility/utility";
import empty from "../../../../assets/illustration/no_transactions.svg";
import React, { Component } from "react";
import { getTransfers } from "../../actions";
import { connect } from "react-redux";
import { Transaction } from "../../../../shared/components/transaction";
import Header from "../../../../shared/components/_layout/header/index.js";
import { withRouter } from "react-router-dom";
import { selectBlockHeight } from "../../reducers/chain";
import { getTransferListByTicker } from "../../../../shared/reducers/xTransferList";

class TxHistoryContainer extends Component {
  getTransactionType(status) {
    if (status === "in") {
      return "Received";
    } else if (status === "out") {
      return "Sent";
    } else if (status === "block") {
      return "Mined";
    } else if (status === "exchange") {
      return "Exchange";
    } else {
      return status;
    }
  }

  render() {
    const all = this.props.transferList;
    const isFetching = false;

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
              all.map((transaction, index) => {
                return (
                  <Transaction
                    key={index}
                    bHeight={this.props.height}
                    type={this.getTransactionType(transaction.type)}
                    status={transaction.type}
                    price={this.props.price}
                    block={transaction.height}
                    date={new Date(
                      transaction.timestamp * 1000
                    ).toLocaleDateString()}
                    tx={transaction.txid}
                    mempool={transaction.height === 0}
                    amount={convertBalanceForReading(
                      Math.abs(transaction.amount)
                    )}
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

export const mapStateToProps = (state, props) => ({
  transferList: getTransferListByTicker(state, props.match.params.id),
  height: selectBlockHeight(state),
  price: state.simplePrice.price
});

export const TxHistoryDesktop = withRouter(
  connect(
    mapStateToProps,
    { getTransfers }
  )(TxHistoryContainer)
);
