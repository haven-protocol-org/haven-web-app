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
import { isDesktop } from "constants/env";
import { selectDesktopSyncState } from "platforms/desktop/reducers/chain";
import { selectTotalBalances, XViewBalances } from "shared/reducers/xBalance";
import { Ticker } from "shared/reducers/types";
import { WebAppState } from "platforms/web/reducers";

const OFFSHORE_TICKERS = [Ticker.xUSD, Ticker.xBTC, null];

interface BalanceProps {
  syncState: SyncState;
  balances: XViewBalances;
}

interface BalanceState {
  currentTicker: Ticker | null;
  currentIndex: number;
  tickerOptions: Array<Ticker | null>;
}

class Balances extends Component<BalanceProps, BalanceState> {
  state: BalanceState = {
    currentIndex: 0,
    currentTicker: OFFSHORE_TICKERS[0],
    tickerOptions: OFFSHORE_TICKERS,
  };

  onClickNext() {
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
    console.log("BALANCES", this.props.balances);

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
  balances: selectTotalBalances(state),
  syncState: isDesktop()
    ? selectDesktopSyncState(state as DesktopAppState)
    : selectWebSyncState(state),
});
export const MultiBalance = connect(mapStateToProps, null)(Balances);
