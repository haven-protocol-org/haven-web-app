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
import { convertBalanceToMoney } from "utility/utility";
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
  selectLastExchangeRates,
} from "shared/reducers/blockHeaderExchangeRates";
import { Row } from "./styles";
import Statistic from "shared/components/statistic";
import { selectMcRatio, selectOffshoreVBS, selectOnshoreVBS } from "shared/reducers/circulatingSupply";
import { selectBlockap } from "shared/reducers/chain";
import bigInt from "big-integer";
import { Title } from "assets/styles/type";


interface AssetsProps {
  balances: XBalances;
  rates: BlockHeaderRate[];
  assetsInUSD: XViewBalance;
  showPrivateDetails: boolean;
  offshoreVBS:number | null;
  onshoreVBS:number | null;
  blockCap: number;
  mcapRatio: number | null;
}

interface AssetsState {}

const Enabled_TICKER = [
  Ticker.xUSD,
  Ticker.XHV,
  Ticker.XAG,
  Ticker.XAU,
  Ticker.xCNY,
  Ticker.xEUR,
  Ticker.xBTC,
  Ticker.xAUD,
  Ticker.xGBP,
  Ticker.xCHF
];

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

      const numDecimals = (xTicker === Ticker.XAG || xTicker === Ticker.XAU || xTicker === Ticker.xBTC) ? 4 : 2;

      const unlockedBalance = convertBalanceToMoney(
        this.props.balances[xTicker].unlockedBalance, numDecimals
      );

      const totalBalance = convertBalanceToMoney(
        this.props.balances[xTicker].balance, numDecimals
      );

      const lockedBalance = convertBalanceToMoney(
        this.props.balances[xTicker].lockedBalance, numDecimals
      );

      const value = selectValueInOtherAsset(
        this.props.balances[xTicker],
        this.props.rates,
        xTicker,
        Ticker.xUSD
      ); // this.props.assetsInUSD[xTicker]!.unlockedBalance;
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
          showPrivateDetails={this.props.showPrivateDetails}
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

    const lockedBalance = convertBalanceToMoney(
      this.props.balances.XHV.lockedBalance
    );

    const xhvInUSD = selectValueInOtherAsset(
      this.props.balances.XHV,
      this.props.rates,
      Ticker.xUSD,
      Ticker.XHV
    ).unlockedBalance;

    const xRate = selectXRate(this.props.rates, Ticker.XHV, Ticker.xUSD);
    const offshoreVBS = this.props.offshoreVBS ? Math.floor(this.props.offshoreVBS) : 0;
    const onshoreVBS = this.props.onshoreVBS ? Math.floor(this.props.onshoreVBS) : 0;
    const blockCap = this.props.blockCap;

    const lastRates = this.props.rates[this.props.rates.length - 1];
    const xhvSpot = lastRates ? convertBalanceToMoney(lastRates.XUSD, 4) : 0;
    const xhvMa = lastRates ? convertBalanceToMoney(lastRates.UNUSED1, 4) : 0;
    const xusdSpot = lastRates ? convertBalanceToMoney(lastRates.UNUSED2, 4) : 0;
    const xusdMa = lastRates ? convertBalanceToMoney(lastRates.UNUSED3, 4) : 0;
    const mcapRatio = this.props.mcapRatio ? this.props.mcapRatio.toFixed(4) : '--';
 
    return (
      <Body>
        {lastRates && <>
          <Row>
            <Statistic label="VBS" value={1} />
            <Statistic label="XHV Spot" value={"$" + xhvSpot} />
            <Statistic label="XHV MA" value={"$" + xhvMa} />
            <Statistic label="MCap Ratio" value={mcapRatio} />
            <Statistic label="xUSD Spot" value={"$" + xusdSpot} />
            <Statistic label="xUSD MA" value={"$" + xusdMa} />
          </Row>
        </>}
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
          showPrivateDetails={this.props.showPrivateDetails}
        />
        {this.renderEnabledTokens()}
      </Body>
    );
  }
}

export const mapStateToProps = (state: DesktopAppState | WebAppState) => ({
  rates: state.blockHeaderExchangeRate,
  balances: state.xBalance,
  showPrivateDetails: state.walletSession.showPrivateDetails,
  onshoreVBS: selectOnshoreVBS(state),
  offshoreVBS: selectOffshoreVBS(state),
  blockCap: selectBlockap(state),
  mcapRatio: selectMcRatio(state),
});

export const Assets = connect(mapStateToProps, {})(AssetsPage);
