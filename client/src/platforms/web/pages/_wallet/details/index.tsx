import { Details } from "shared/pages/_wallet/details";
import React, { Component } from "react";
import { TxHistoryWeb } from "../../../components/TxHistory";
import { connect } from "react-redux";
import { Ticker } from "shared/reducers/types";
import { convertToMoney } from "utility/utility";
import { WebAppState } from "platforms/web/reducers";
import { selectSimplePrice } from "shared/reducers/simplePrice";

class DetailsWebContainer extends Component<any, any> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const assetId = this.props.match.params.id;
    let amount: number;
    let value;
    let price;

    if (assetId === Ticker.XHV) {
      price = this.props.lastPrice;
    } else {
      price = 1;
    }
    amount = convertToMoney(this.props.balances[assetId].unlockedBalance);
    value = amount * price;
    const detailProps = { assetId, value, amount, price };

    return (
      <Details {...detailProps}>
        <TxHistoryWeb />
      </Details>
    );
  }
}

export const mapStateToProps = (state: WebAppState) => ({
  balances: state.xBalance,
  lastPrice: selectSimplePrice(state)
});

export const DetailsWeb = connect(
  mapStateToProps,
  {}
)(DetailsWebContainer);
