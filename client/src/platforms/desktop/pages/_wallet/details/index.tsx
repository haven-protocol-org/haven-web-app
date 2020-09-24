import React, { Component } from "react";
import { connect } from "react-redux";
import { Details } from "shared/pages/_wallet/details";
import { Ticker } from "shared/reducers/types";
import { convertToMoney } from "utility/utility";
import { TxHistoryDesktop } from "shared/components/tx-history/container";
import { XBalances } from "shared/reducers/xBalance";
import {
  BlockHeaderRate,
  selectXRate,
} from "shared/reducers/blockHeaderExchangeRates";
import { RouteComponentProps } from "react-router";
import { HavenAppState } from "platforms/desktop/reducers";

interface DetailsProps {
  balances: XBalances;
  rates: BlockHeaderRate[];
}

interface RouteProps {
  id: Ticker;
}

class DetailsContainer extends Component<
DetailsProps & RouteComponentProps<RouteProps>,
  any
> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const ticker = this.props.match.params.id;
    const xRate = selectXRate(this.props.rates, ticker, Ticker.xUSD);
    let amount: number = convertToMoney(
      this.props.balances[ticker].unlockedBalance
    );
    let value = amount * xRate;
    const detailProps = { assetId: ticker, value, amount, price: xRate };

    return (
      <Details {...detailProps}>
        <TxHistoryDesktop assetId={this.props.match.params.id} />
      </Details>
    );
  }
}

const mapStateToProps = (state: HavenAppState) => ({
  balances: state.xBalance,
  rates: state.blockHeaderExchangeRate,
});

export const HavenDetails = connect(
  mapStateToProps,
  {}
)(DetailsContainer);
