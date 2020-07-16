// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Value, Wrapper, Amount } from "./styles";
import { connect } from "react-redux";
import { selectWebSyncState } from "platforms/web/reducers/chain";
import { Spinner } from "../../spinner";
import { ProgressBar } from "../../progress-bar";
import { DesktopAppState } from "platforms/desktop/reducers";
import { SyncState } from "shared/types/types";
import { isDesktop} from "constants/env";
import { selectDesktopSyncState } from "platforms/desktop/reducers/chain";
import {
  selectBalances,
  selectTotalBalances,
  XViewBalances,
} from "shared/reducers/xBalance";
import { Ticker } from "shared/reducers/types";
import {selectIsOffshoreEnabled} from "shared/reducers/havenFeature";
import {WebAppState} from "platforms/web/reducers";

const OFFSHORE_TICKERS = [Ticker.xUSD, Ticker.xBTC, null];

interface BalanceProps {
  syncState: SyncState;
  balances: XViewBalances;
  offshoreEnabled: boolean;
}

interface BalanceState {
  currentTicker: Ticker | null;
  currentIndex: number;
  tickerOptions: Array<Ticker | null>;
}

class Balances extends Component<BalanceProps, BalanceState> {
  state: BalanceState = {
    currentIndex: 0,
    currentTicker: this.props.offshoreEnabled ? OFFSHORE_TICKERS[0] : Ticker.XHV,
    tickerOptions: this.props.offshoreEnabled ? OFFSHORE_TICKERS : [Ticker.XHV]
  };

  onClickNext() {
    if (!this.props.offshoreEnabled) {
      return;
    }

    const tickerNum: number = OFFSHORE_TICKERS.length;

    let nextIndex = this.state.currentIndex + 1;
    if (nextIndex === tickerNum) {
      nextIndex = 0;
    }
    this.setState({
      currentIndex: nextIndex,
      currentTicker: OFFSHORE_TICKERS[nextIndex] as Ticker,
    });
  }

  static getDerivedStateFromProps(nextProps: Readonly<BalanceProps>, prevState: Readonly<BalanceState>): any | null {

    if (nextProps.offshoreEnabled && prevState.tickerOptions.length === 1) {
      return {
        tickerOptions: OFFSHORE_TICKERS,
        currentTicker: OFFSHORE_TICKERS[0]
      } as Partial<BalanceState>
    }

    return null;

  }

  render() {
    const ticker = this.state.currentTicker;

    if (ticker === null)
      return (
        <Wrapper onClick={() => this.onClickNext()}>
          <Amount>-/-</Amount>
          <Value>Portfolio Value Hidden</Value>
        </Wrapper>
      );

    const { prefix, suffix } =
      ticker === Ticker.xUSD
        ? { prefix: "$", suffix: "" }
        : ticker === Ticker.xBTC
        ? { prefix: "₿", suffix: "" }
        : { prefix: "Ħ", suffix: "" };

    const { balance } = this.props.balances[ticker];

    const totalBalance = prefix + balance.toFixed(4) + suffix;

    const { isSyncing, blockHeight, scannedHeight } = this.props.syncState;

    const percentage = ((scannedHeight / blockHeight) * 100).toFixed(2);

    return (
      <Wrapper onClick={() => this.onClickNext()}>
        <Amount isSyncing={isSyncing}>
          {balance === -1 ? <Spinner /> : totalBalance}
        </Amount>
        <Value>
          {isSyncing
            ? `Syncing Vault... ${percentage}%`
            : `Portfolio Value (${
                ticker === "XHV" ? ticker : ticker.substring(1)
              }) `}
        </Value>
        {isSyncing && <ProgressBar percentage={percentage} />}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: DesktopAppState | WebAppState) => ({
  offshoreEnabled: selectIsOffshoreEnabled(state),
  balances: selectIsOffshoreEnabled(state)
    ? selectTotalBalances(state)
    : selectBalances(state),
  syncState: isDesktop()
    ? selectDesktopSyncState(state as DesktopAppState)
    : selectWebSyncState(state),
});
export const MultiBalance = connect(mapStateToProps, null)(Balances);
