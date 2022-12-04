// Library Imports
import React, { Component } from "react";
// Relative Imports
import Chart from "../chart";

import Header from "../_layout/header";
import { Row } from "./styles";
import { connect } from "react-redux";
import { PRICE_RANGE_MONTH } from "../../reducers/priceHistory";
import { getPriceDates, getPriceValues, iNum } from "utility/utility";
import { getPriceHistory } from "../../actions";
import Statistic from "../statistic";
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
    const { assetId, amount, price, value } = this.props;

    let prices;
    let labels;

    if (assetId === Ticker.XHV) {
      const priceRangeEntry = this.props.priceHistory.prices.find(
        (priceRangeEntry: PriceRangeHistory) =>
          priceRangeEntry.rangeInDays === this.state.selectedRangeInDays
      );

      prices = getPriceValues(priceRangeEntry.prices);
      labels = getPriceDates(priceRangeEntry.prices);
    } else if (assetId === Ticker.xUSD) {
      prices = [1.0, 1.0];
      labels = [
        new Date(1792, 3, 2).toLocaleDateString(),
        new Date().toLocaleDateString(),
      ];
    }

    return (
      <>
        <Header
          back
          title={`${assetId} Overview`}
          description="Pricing history and asset values"
        />

        {this.props.assetId === Ticker.XHV || this.props.assetId === Ticker.xUSD ? ( <Chart
          prices={prices}
          labels={labels}
          ticker={assetId}
          price={price.toFixed(2)}
          onChangePriceRange={(args: number | string) =>
            this.selectPriceHistory(args)
          }
        />): null}
        <Row>
          <Statistic label="Amount" value={iNum(amount)} />
          <Statistic label="Price" value={`$` + iNum(price)} />
          <Statistic
            label="Value"
            value={value.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          />
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  priceHistory: state.priceHistory,
});

export const ChartContainer =
  connect(mapStateToProps, { getPriceHistory })(ChartWrapper)

