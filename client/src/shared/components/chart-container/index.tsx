// Library Imports
import React, { Component } from "react";
// Relative Imports
import Chart from "../chart";

import Header from "../_layout/header";
import { Row } from "./styles";
import { connect } from "react-redux";
import { PRICE_RANGE_MONTH } from "../../reducers/priceHistory";
import { getPriceDates, getPriceValues } from "utility/utility";
import { getPriceHistory } from "../../actions";
import Statistic from "../statistic";
import { withRouter } from "react-router";
import { PriceRangeHistory } from "shared/reducers/xPriceHistory";
import { Ticker } from "shared/reducers/types";

class ChartWrapper extends Component<any, any> {
  state = { selectedRangeInDays: PRICE_RANGE_MONTH };

  componentDidMount() {
    this.selectPriceHistory(PRICE_RANGE_MONTH);
  }

  selectPriceHistory(rangeInDays: number | string) {
    this.props.getPriceHistory(rangeInDays);
    this.setState({ selectedRangeInDays: rangeInDays });
  }

  render() {
    const { id } = this.props.match.params;
    const { amount, price, value } = this.props;

    let prices;
    let labels;

    if (id === Ticker.XHV) {
      const priceRangeEntry = this.props.priceHistory.prices.find(
        (priceRangeEntry: PriceRangeHistory) =>
          priceRangeEntry.rangeInDays === this.state.selectedRangeInDays
      );

      prices = getPriceValues(priceRangeEntry.prices);
      labels = getPriceDates(priceRangeEntry.prices);
    } else if (id === Ticker.xUSD) {
      prices = [1.0, 1.0];
      labels = [
        new Date(1792, 3, 2).toLocaleDateString(),
        new Date().toLocaleDateString()
      ];
    }

    return (
      <>
        <Header
          back
          title={`${id} Overview`}
          description="Pricing history and asset values"
        />
        <Chart
          prices={prices}
          labels={labels}
          price={price.toFixed(4)}
          onChangePriceRange={(args: number | string) =>
            this.selectPriceHistory(args)
          }
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
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  priceHistory: state.priceHistory
});

export const ChartContainer = withRouter(
  connect(
    mapStateToProps,
    { getPriceHistory }
  )(ChartWrapper)
);
