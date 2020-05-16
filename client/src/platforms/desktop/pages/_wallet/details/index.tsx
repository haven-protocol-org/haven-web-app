import React, { Component } from "react";
import { connect } from "react-redux";
import { Details } from "shared/pages/_wallet/details";
import { selectSimplePrice } from "shared/reducers/simplePrice";
import { Ticker } from "shared/reducers/types";
import { convertToMoney } from "utility/utility";
import { TxHistoryDesktop } from "../../../components/TxHistory";
import { DesktopAppState } from "../../../reducers";

class DetailsDesktopContainer extends Component<any, any> {
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
        <TxHistoryDesktop assetId={this.props.match.params.id} />
      </Details>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  balances: state.xBalance,
  lastPrice: selectSimplePrice(state),
});

export const DetailsDesktop = connect(
  mapStateToProps,
  {}
)(DetailsDesktopContainer);
