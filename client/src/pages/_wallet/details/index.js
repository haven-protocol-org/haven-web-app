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

import { History, Row } from "./styles";
import {connect} from "react-redux";
import {getPriceData} from "../../../actions";
import {getPriceValues} from "../../../reducers/pricedata";
import {getPriceDates} from "../../../reducers/pricedata";

class Details extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    if (this.props.prices.length === 0)
    {
      this.props.getPriceData();
    }
  }


  render() {
    const { id } = this.props.match.params;
    const price = 11111111;
    const amount = 1111111;
    const value = 1111111;

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
          prices={this.props.prices}
          labels={this.props.labels}
          />
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
          <History>

            {this.props.transferList.pending.map((transaction, index) => {

            return  <Transaction
                key={index}
                status={transaction.type}
                date={new Date(transaction.timestamp * 1000).toLocaleDateString()}
                tx={transaction.txid}
                amount={amount}
            />

          })}

            {this.props.transferList.out.map((transaction, index) => {

              return  <Transaction
                  key={index}
                  status={transaction.type}
                  date={new Date(transaction.timestamp * 1000).toLocaleDateString()}
                  tx={transaction.txid}
                  amount={amount}
              />

            })}

            {this.props.transferList.in.map((transaction, index) => {

              return  <Transaction
                  key={index}
                  status={transaction.type}
                  date={new Date(transaction.timestamp * 1000).toLocaleDateString()}
                  tx={transaction.txid}
                  amount={amount}
              />

            })}
          </History>
        </Body>
      </Page>
    );
  }
}

export const mapStateToProps = state => ({
  transferList: state.transferList,
  labels:getPriceDates(state),
    prices:getPriceValues(state)
});

export default connect(
    mapStateToProps,
    { getPriceData }
)(Details);

