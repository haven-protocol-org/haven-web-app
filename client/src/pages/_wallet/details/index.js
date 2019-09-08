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
import { convertBalanceForReading } from "../../../utility";
import { Spinner } from "../../../components/spinner";

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
          {isFetching ? (
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
                      price={price}
                      block={transaction.height}
                      date={new Date(
                        transaction.timestamp * 1000
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
  balance: selectReadableBalance(state)
});

export default connect(
  mapStateToProps,
  { getPriceData: getPriceHistory, getTransfers }
)(Details);
//amount: "-500000778800000"
// approx_float_amount: -500.0007788
// coinbase: false
// hash: "d6b16e33f4b2bf8d1714aa58098c18520ce7ed4a270ba6ffd2189eb29b35832e"
// height: 46658
// id: 47063
// mempool: false
// mixin: 11
// spent_outputs: Array(2)
// 0: {amount: "1000000000000000", key_image: "c68fa7434e3573748dc42ad2fa30b13551f7e04d6c9b65c84161cc0e56d4b37c", mixin: 11, out_index: 1, tx_pub_key: "83bf579af1b840652cbd5f5c019a452b550ba2539eb1e9215e736c920a151c02"}
// 1: {amount: "28160864833614", key_image: "a5759fc2f064a4c08a8d8cf3df76e23210c5f5a1cb491232cd4228332c2f7c7f", mixin: 11, out_index: 0, tx_pub_key: "b40f81b6643f146acc0c88c3fca521ca5988042c42ced1c8e12068947027a875"}
// length: 2
// __proto__: Array(0)
// timestamp: 1565599217000
// total_received: "528160086033614"
// total_sent: "1028160864833614"
// tx_pub_key: "317f902ecb4c429f50aca688fa085e0b59ff67f15590d92000c7cda4634a3cc0"
// unlock_time: 46668