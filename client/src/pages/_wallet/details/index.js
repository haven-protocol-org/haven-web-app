// Library Imports
import React, { Component } from "react";

// Relative Imports
import Page from "../../../components/_layout/page";
import Body from "../../../components/_layout/body";
import Menu from "../../../components/_layout/menu";
import Header from "../../../components/_layout/header";
import Transaction from "../../../components/transaction";
import Statistic from "../../../components/statistic";
import Chart from "../../../components/chart";
import empty from "../../../assets/illustration/no_transactions.svg";

import { History, Row, Message, EmptyState, NoTransactions } from "./styles";
import { connect } from "react-redux";
import { getPriceHistory, getTransfers } from "../../../actions";
import { getPriceValues, NO_PRICE } from "../../../reducers/priceHistory";
import { getPriceDates } from "../../../reducers/priceHistory";
import { selectReadableBalance, NO_BALANCE } from "../../../reducers/balance";
import {convertBalanceForReading, logM} from "../../../utility";
import { Spinner } from "../../../components/spinner";
import {selectBlockchainHeight} from "../../../reducers/chain";
import {core} from "../../../declarations/open_monero.service";

class Details extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    if (this.props.prices.length === 0) {
      this.props.getPriceData();
    }

    if (this.props.transferList.isEmpty) {
      this.props.getTransfers();
    }
  }

  fetchData = () => {};

  getBalancePriceStats() {
    let amount = this.props.balance === NO_BALANCE ? 1 : this.props.balance;
    let price = this.props.lastPrice === NO_PRICE ? 1 : this.props.lastPrice;
    let value = price * amount;

    return { amount, price, value };
  }

   getTransactionType(tx) {
    if (tx.coinbase) {
      return "Mined";
    }
    else if (tx.approx_float_amount > 0 ) {
      return "Received";
    } else if (tx.approx_float_amount < 0) {
      return "Sent"; }
   else {
      return null;
    }
  }

  getTransactionStatus(tx) {

      if (core.monero_txParsing_utils.IsTransactionUnlocked(tx, this.props.height) || core.monero_txParsing_utils.IsTransactionConfirmed(tx, this.props.height))
      {
          return 'completed'
      }
      else
      {
          return 'pending'
      }

  }

  render() {
    const { id } = this.props.match.params;
    const { amount, price, value } = this.getBalancePriceStats();
    const { txs, isFetching } = this.props.transferList;

    const centerSpinner = {
      display: "flex",
      justifyContent: "center",
      gridColumn: "1 /3",
      width: "100%"
    };

    return (
      <Page>
        <Menu />
        <Body>
          <Header
            back
            title={`${id} Overview`}
            description="Pricing history and asset values"
          />
          <Chart prices={this.props.prices} labels={this.props.labels} />
          <Row>
            <Statistic label="Amount" value={amount} />
            <Statistic
              label="Price"
              value={price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              })}
            />
            <Statistic
              label="Value"
              value={value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              })}
            />
          </Row>

          <Header
            title="History"
            description={`Review your ${id} transaction history`}
          />
          {isFetching && txs == null ? (
            <EmptyState>
              <Spinner />
              <Message>Loading transaction history...</Message>
            </EmptyState>
          ) : (
            <History>
              {txs.length > 0 ? (
                txs.map((transaction, index) => {
                  return (
                    <Transaction
                      key={index}
                      type={this.getTransactionType(transaction)}
                      status={this.getTransactionStatus(transaction)}
                      price={price}
                      block={transaction.height}
                      date={new Date(
                        transaction.timestamp
                      ).toLocaleDateString()}
                      tx={transaction.hash}
                      amount={convertBalanceForReading(Math.abs(transaction.amount))}
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
        </Body>
      </Page>
    );
  }
}

export const mapStateToProps = state => ({

  transferList: state.transferList,
  labels: getPriceDates(state),
  prices: getPriceValues(state),
  lastPrice: state.priceHistory.lastPrice,
  balance: selectReadableBalance(state),
    height:selectBlockchainHeight(state)
});

export default connect(
  mapStateToProps,
  { getPriceData: getPriceHistory, getTransfers }
)(Details);
