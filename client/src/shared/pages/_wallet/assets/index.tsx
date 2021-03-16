// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
// Relative Imports
import Body from "../../../components/_layout/body";
import Header from "../../../components/_layout/header";
import Overview from "../../../components/_layout/overview";
import Cell from "../../../components/cell";
import CellDisabled from "../../../components/cell_disabled";

import { AssetList } from "constants/assets";
import { convertBalanceToMoney, logM } from "utility/utility";
import { Ticker } from "shared/reducers/types";
import { DesktopAppState } from "platforms/desktop/reducers";
import {
  selectValueInOtherAsset,
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

const Enabled_TICKER = [Ticker.xUSD, Ticker.XHV, Ticker.XAG, Ticker.XAU, Ticker.xCNY, Ticker.xEUR];

class AssetsPage extends Component<AssetsProps, any> {
  state = {
    forexPriceFetched: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderEnabledTokens = () => {
    const enabledTokens = AssetList.filter((asset: any) =>
      Enabled_TICKER.includes(asset.id as Ticker)
    );
    return enabledTokens.map((data) => {
      const { token, ticker, id } = data;

      const xTicker = id;

      const unlockedBalance = convertBalanceToMoney(
        this.props.balances[xTicker].unlockedBalance
      );


      logM(this.props.balances);

      const totalBalance = convertBalanceToMoney(this.props.balances[xTicker].balance);

      const lockedBalance = convertBalanceToMoney(
        this.props.balances[xTicker].lockedBalance
      );

      const value = selectValueInOtherAsset(this.props.balances[xTicker], this.props.rates, xTicker, Ticker.xUSD);// this.props.assetsInUSD[xTicker]!.unlockedBalance;
      const xRate = selectXRate(this.props.rates, xTicker, Ticker.xUSD);

      return (
        <Cell
          fullwidth="fullwidth"
          key={token}
          tokenName={token}
          ticker={xTicker}
          price={xRate}
          value={value}
          totalBalance={totalBalance}
          lockedBalance={lockedBalance}
          unlockedBalance={unlockedBalance}
        />
      );
    });
  };

  renderDisabledTokens = () => {
    const disabledTokens = AssetList.filter(
      (asset: any) => !Enabled_TICKER.includes(("x" + asset.ticker) as Ticker)
    );

    return disabledTokens.map((data) => {
      const { token, ticker, symbol, id } = data;

      const xTicker = id;
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
    const unlockedBalance = convertBalanceToMoney(
      this.props.balances.XHV.unlockedBalance
    );

    const totalBalance = convertBalanceToMoney(this.props.balances.XHV.balance);

    const lockedBalance = convertBalanceToMoney(this.props.balances.XHV.lockedBalance);

    const xhvInUSD = selectValueInOtherAsset(this.props.balances.XHV, this.props.rates, Ticker.xUSD, Ticker.XHV).unlockedBalance;

    const xRate = selectXRate(this.props.rates, Ticker.XHV, Ticker.xUSD);

    return (
      <Body>
        <Overview />
        <Header
          title="Available Assets"
          description="Overview of all available Haven assets"
        />
        <Cell
          //@ts-ignore
          key={1}
          tokenName={"Haven"}
          ticker={"XHV"}
          price={xRate}
          value={xhvInUSD}
          fullwidth="fullwidth"
          totalBalance={totalBalance.toFixed(2)}
          lockedBalance={lockedBalance}
          unlockedBalance={unlockedBalance}
        />
        {this.renderEnabledTokens()}
     {/*    <Header
          title="Coming Soon"
          description="Upcoming Haven asset integrations"
        />
        {this.renderDisabledTokens()} */}
      </Body>
    );
  }
}

export const mapStateToProps = (state: DesktopAppState | WebAppState) => ({
  rates: state.blockHeaderExchangeRate,
  balances: state.xBalance,
});

export const Assets = connect(mapStateToProps, {})(AssetsPage);
