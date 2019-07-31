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
import LoadMore from "../../../components/load-more";

import { History, Row } from "./styles";
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

  fetchData = () => {
    alert("Load more data");
  };

  getBalancePriceStats() {
    console.log("get balance stats");
    let amount = this.props.balance === NO_BALANCE ? 1 : this.props.balance;
    let price = this.props.lastPrice === NO_PRICE ? 1 : this.props.lastPrice;
    let value = price * amount;

    return { amount, price, value };
  }

  render() {
    const { id } = this.props.match.params;
    const { amount, price, value } = this.getBalancePriceStats();
    const { pending, out, all, isFetching } = this.props.transferList;
    const block = all[5];
    const incoming = this.props.transferList.in;

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
            <div style={centerSpinner}>
              <span style={{ paddingRight: "15px", color: "grey" }}>
                ..loading transfers
              </span>
              <Spinner />
            </div>
          ) : (
            <History>
              {all
                ? all.map((transaction, index) => {
                    return (
                      <Transaction
                        key={index}
                        status={transaction.type}
                        price={price}
                        block={transaction.height}
                        fee={convertBalanceForReading(transaction.fee)}
                        date={new Date(
                          transaction.timestamp * 1000
                        ).toLocaleDateString()}
                        tx={transaction.txid}
                        amount={convertBalanceForReading(transaction.amount)}
                        transaction={transaction}
                      />
                    );
                  })
                : null}
              {/* <LoadMore onClick={this.fetchData} label="Load More" />*/}
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
