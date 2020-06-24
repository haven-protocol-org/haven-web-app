// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { getForex, getSimplePrice } from "shared/actions";
// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import Overview from "../../../components/_layout/overview";
import Cell from "../../../components/cell";
import CellDisabled from "../../../components/cell_disabled";

import {AssetList} from "constants/assets";
import { convertToMoney } from "utility/utility";
import { Ticker } from "shared/reducers/types";
import { OFFSHORE_ENABLED } from "constants/env";
import { DesktopAppState } from "platforms/desktop/reducers";
import {
  selectValueOfAssetsInUSD,
  XBalances,
  XViewBalance,
} from "shared/reducers/xBalance";
import { WebAppState } from "platforms/web/reducers";
import {
  BlockHeaderRate,
  selectXRate,
} from "shared/reducers/blockHeaderExchangeRates";

interface AssetsProps {
  balances: XBalances;
  rates: BlockHeaderRate[];
  assetsInUSD: XViewBalance;
}

interface AssetsState {}

const Enabled_TICKER = [Ticker.xUSD, Ticker.XHV];

class AssetsPage extends Component<AssetsProps, any> {
  state = {
    forexPriceFetched: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderEnabledTokens = () => {
    if (!OFFSHORE_ENABLED) {
      return null;
    }

    const enabledTokens = AssetList.filter((asset: any) =>
      Enabled_TICKER.includes(("x" + asset.ticker) as Ticker)
    );
    return enabledTokens.map((data) => {
      const { token, ticker, symbol } = data;

      const xTicker = ("x" + ticker) as Ticker;

      const unlockedBalance = convertToMoney(
        this.props.balances[xTicker].unlockedBalance
      );

      const totalBalance = convertToMoney(this.props.balances[xTicker].balance);

      const lockedBalance = convertToMoney(
        this.props.balances[xTicker].lockedBalance
      );

      const value = this.props.assetsInUSD[xTicker]!.unlockedBalance;
      const xRate = 1;
      const xRateString = symbol + xRate.toFixed(2);

      return (
        <Cell
          fullwidth="fullwidth"
          key={token}
          tokenName={token}
          ticker={xTicker}
          price={xRate.toFixed(2)}
          value={value}
          totalBalance={totalBalance}
          lockedBalance={lockedBalance}
          unlockedBalance={unlockedBalance}
        />
      );
    });
  };

  renderDisabledTokens = () => {
    const disabledTokens = OFFSHORE_ENABLED
      ? AssetList.filter(
          (asset: any) =>
            !Enabled_TICKER.includes(("x" + asset.ticker) as Ticker)
        )
      : AssetList;

    return disabledTokens.map((data) => {
      const { token, ticker, symbol } = data;

      const xTicker = ("x" + ticker) as Ticker;
      const rates = this.props.rates;
      const xRate = selectXRate(rates, xTicker, Ticker.xUSD);
      const xRateString = symbol + xRate.toFixed(2);

      return (
        <CellDisabled
          fullwidth="fullwidth"
          key={token}
          tokenName={token}
          ticker={"x" + ticker}
          price={xRateString}
          balance={"0.00"}
        />
      );
    });
  };

  render() {
    const unlockedBalance = convertToMoney(
      this.props.balances.XHV.unlockedBalance
    );

    const totalBalance = convertToMoney(this.props.balances.XHV.balance);

    const lockedBalance = convertToMoney(this.props.balances.XHV.lockedBalance);

    const xhvInUSD = this.props.assetsInUSD.XHV!.unlockedBalance;
    const xRate = selectXRate(this.props.rates, Ticker.XHV, Ticker.xUSD);

    return (
      <Body>
        <Overview />
        <Header
          title="Available Assets"
          description="Overview of all available Haven Assets"
        />
        <Cell
          //@ts-ignore
          key={1}
          tokenName={"Haven"}
          ticker={"XHV"}
          price={xRate}
          value={xhvInUSD}
          fullwidth="fullwidth"
          totalBalance={totalBalance}
          lockedBalance={lockedBalance}
          unlockedBalance={unlockedBalance}
        />
        {this.renderEnabledTokens()}
        <Header
          title="Coming Soon"
          description="Overview of Haven Assets coming soon"
        />
        {this.renderDisabledTokens()}
      </Body>
    );
  }
}

export const mapStateToProps = (state: DesktopAppState | WebAppState) => ({
  assetsInUSD: selectValueOfAssetsInUSD(state),
  rates: state.blockHeaderExchangeRate,
  balances: state.xBalance,
});

export const Assets = connect(mapStateToProps, { getForex, getSimplePrice })(
  AssetsPage
);
