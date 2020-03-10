// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Pending, Value, Wrapper, Amount } from "./styles";
import { connect } from "react-redux";
import { selectWebSyncState } from "platforms/web/reducers/chain";
import { Spinner } from "../../spinner";
import { ProgressBar } from "../../progress-bar";
import { DesktopAppState } from "platforms/desktop/reducers";
import { SyncState } from "shared/types/types";
import { isDesktop, OFFSHORE_ENABLED } from "constants/env";
import { selectDesktopSyncState } from "platforms/desktop/reducers/chain";
import {NO_BALANCE, selectTotalBalances, XViewBalances} from "shared/reducers/xBalance";
import { Ticker } from "shared/reducers/types";


const OFFSHORE_TICKERS = [Ticker.xUSD, Ticker.xBTC];

interface BalanceProps {
  syncState: SyncState;
  balances: XViewBalances;
}

interface BalanceState {
  currentTicker: Ticker;
  currentIndex: number;
}

class Balances extends Component<BalanceProps, BalanceState> {
  state: BalanceState = {
    currentIndex: 0,
    currentTicker: OFFSHORE_ENABLED? OFFSHORE_TICKERS[0] : Ticker.XHV
  };

  onClickNext() {
    if (!OFFSHORE_ENABLED) {
      return;
    }

    const tickerNum: number = OFFSHORE_TICKERS.length;

    let nextIndex = this.state.currentIndex + 1;
    if (nextIndex === tickerNum) {
      nextIndex = 0;
    }
    this.setState({
      currentIndex: nextIndex,
      currentTicker: OFFSHORE_TICKERS[nextIndex] as Ticker
    });
  }

  render() {
    const ticker = this.state.currentTicker;
    const { prefix, suffix } =
      ticker === Ticker.xUSD
        ? { prefix: "$", suffix: "" }
        : ticker === Ticker.xBTC
        ? { prefix: "₿", suffix: "" }
        : { prefix: "", suffix: " XHV" };

    const xUsdAmount =
      prefix + this.props.balances[ticker].unlockedBalance.toFixed(4) + suffix;
    const xUsdAmountLocked =
      prefix + this.props.balances[ticker].lockedBalance.toFixed(2) + suffix;
    const { isSyncing, blockHeight, scannedHeight } = this.props.syncState;

    const amount = (scannedHeight / blockHeight) * 100;
    const percentage = amount.toFixed(2);

    return (
      <Wrapper onClick={() => this.onClickNext()}>
        <Amount isSyncing={isSyncing}>
          {this.props.balances.xUSD.balance === -1 ? <Spinner /> : xUsdAmount}
        </Amount>
        <Value>{isSyncing ? `Syncing Vault... ${percentage}%` : ``}</Value>
        {isSyncing && <ProgressBar percentage={percentage} />}
        {this.props.balances.xUSD.lockedBalance > 0 ? (
          <Pending>
            You have {xUsdAmountLocked} pending.
            <br />
            Balances are updating.
          </Pending>
        ) : null}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  balances: selectTotalBalances(state),
  syncState: isDesktop()
    ? selectDesktopSyncState(state as DesktopAppState)
    : selectWebSyncState(state)
});
export const MultiBalance = connect(
  mapStateToProps,
  null
)(Balances);
