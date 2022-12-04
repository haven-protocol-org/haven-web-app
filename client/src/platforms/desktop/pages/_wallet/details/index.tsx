import React, { Component } from "react";
import { connect } from "react-redux";
import { Details } from "shared/pages/_wallet/details";
import { Ticker } from "shared/reducers/types";
import { convertBalanceToMoney } from "utility/utility";
import { TxHistoryDesktop } from "shared/components/tx-history/container";
import { XBalances } from "shared/reducers/xBalance";
import {
  BlockHeaderRate,
  selectXRate,
} from "shared/reducers/blockHeaderExchangeRates";
import { HavenAppState } from "platforms/desktop/reducers";
import { useParams } from "react-router";

interface DetailsProps {
  balances: XBalances;
  rates: BlockHeaderRate[];
}

interface RouteProps {
  assetId: Ticker;
}


class DetailsContainer extends Component<
DetailsProps & RouteProps,
  any
> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const ticker = this.props.assetId;
    const xRate = selectXRate(this.props.rates, ticker, Ticker.xUSD);
    let amount: number = convertBalanceToMoney(
      this.props.balances[ticker].unlockedBalance, 12
    );
    let value = amount * xRate;
    const detailProps = { assetId: ticker, value, amount, price: xRate };
    return (
      <Details {...detailProps}>
        <TxHistoryDesktop assetId={ticker} />
      </Details>
    );
  }
}

const mapStateToProps = (state: HavenAppState) => ({
  balances: state.xBalance,
  rates: state.blockHeaderExchangeRate,
});

const HavenDetails = connect(
  mapStateToProps,
  {}
)(DetailsContainer);

export const HavenDetailWithParams = () => {
  const {id} = useParams();
  return <HavenDetails assetId={id as Ticker} />
}
