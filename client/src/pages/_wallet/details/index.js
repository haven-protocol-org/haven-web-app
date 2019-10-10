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
import { NO_PRICE, PRICE_RANGE_MONTH } from "../../../reducers/priceHistory";
import { selectReadableBalance, NO_BALANCE } from "../../../reducers/balance";
import {
  convertBalanceForReading,
  getPriceDates,
  getPriceValues
} from "../../../utility";
import { Spinner } from "../../../components/spinner";
import { selectBlockchainHeight } from "../../../reducers/chain";
import { core } from "../../../declarations/open_monero.service";
import { selectSimplePrice } from "../../../reducers/simplePrice";

class Details extends Component {
  state = { selectedRangeInDays: PRICE_RANGE_MONTH };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.selectPriceHistory(PRICE_RANGE_MONTH);
    if (this.props.transferList.isEmpty) {
      this.props.getTransfers();
    }
  }

  selectPriceHistory(rangeInDays) {
    this.props.getPriceHistory(rangeInDays);
    this.setState({ selectedRangeInDays: rangeInDays });
  }

  getBalancePriceStats() {
    let amount = this.props.balance === NO_BALANCE ? 1 : this.props.balance;
    let price = this.props.lastPrice === NO_PRICE ? 1 : this.props.lastPrice;
    let value = price * amount;

    return { amount, price, value };
  }

  getTransactionType(tx) {
    if (tx.coinbase) {
      return "Mined";
    } else if (tx.approx_float_amount > 0) {
      return "Received";
    } else if (tx.approx_float_amount < 0) {
      return "Sent";
    } else {
      return null;
    }
  }

  getTransactionStatus(tx) {
    if (
      core.monero_txParsing_utils.IsTransactionUnlocked(
        tx,
        this.props.height
      ) ||
      core.monero_txParsing_utils.IsTransactionConfirmed(tx, this.props.height)
    ) {
      return "completed";
    } else {
      return "pending";
    }
  }

  getLockedReason(tx) {
    return core.monero_txParsing_utils.TransactionLockedReason(
      tx,
      this.props.height
    );
  }

  render() {
    const { id } = this.props.match.params;
    const { amount, price, value } = this.getBalancePriceStats();
    const { txs, isFetching } = this.props.transferList;

    const priceRangeEntry = this.props.priceHistory.prices.find(
      priceRangeEntry =>
        priceRangeEntry.rangeInDays === this.state.selectedRangeInDays
    );

    const prices = getPriceValues(priceRangeEntry.prices);
    const labels = getPriceDates(priceRangeEntry.prices);

    return (
      <Page>
        <Menu />
        <Body>
          <Header
            back
            title={`${id} Overview`}
            description="Pricing history and asset values"
          />
          <Chart
            prices={prices}
            labels={labels}
            price={price.toFixed(4)}
            onChangePriceRange={args => this.selectPriceHistory(args)}
          />
          <Row>
            <Statistic label="Amount" value={amount} />
            <Statistic label="Price" value={`$` + price.toFixed(4)} />
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
              {txs && txs.length > 0 ? (
                txs.map((transaction, index) => {
                  return (
                    <Transaction
                      key={index}
                      type={this.getTransactionType(transaction)}
                      status={this.getTransactionStatus(transaction)}
                      lockedReason={this.getLockedReason(transaction)}
                      price={price}
                      block={transaction.height}
                      date={new Date(
                        transaction.timestamp
                      ).toLocaleDateString()}
                      tx={transaction.hash}
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
        </Body>
      </Page>
    );
  }
}

export const mapStateToProps = state => ({
  transferList: state.transferList,
  priceHistory: state.priceHistory,
  lastPrice: selectSimplePrice(state),
  balance: selectReadableBalance(state),
  height: selectBlockchainHeight(state)
});

export default connect(
  mapStateToProps,
  { getPriceHistory: getPriceHistory, getTransfers }
)(Details);
