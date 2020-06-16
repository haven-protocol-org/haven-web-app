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
import {
  selectBalances,
  selectTotalBalances,
  XViewBalances,
} from "shared/reducers/xBalance";
import { Ticker } from "shared/reducers/types";

const OFFSHORE_TICKERS = [Ticker.xUSD, Ticker.xBTC, null];

interface BalanceProps {
  syncState: SyncState;
  balances: XViewBalances;
}

interface BalanceState {
  currentTicker: Ticker | null;
  currentIndex: number;
}

class Balances extends Component<BalanceProps, BalanceState> {
  state: BalanceState = {
    currentIndex: 0,
    currentTicker: OFFSHORE_ENABLED ? OFFSHORE_TICKERS[0] : Ticker.XHV,
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

    const { unlockedBalance, lockedBalance, balance } = this.props.balances[
      ticker
    ];

    const totalBalance = prefix + balance.toFixed(4) + suffix;

    const amount = prefix + unlockedBalance.toFixed(4) + suffix;
    const amountLocked = prefix + lockedBalance.toFixed(4) + suffix;
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
        {/*{isSyncing && <ProgressBar percentage={percentage} />}
        {lockedBalance > 0 && (
          <Pending>
            You have {amountLocked} in pending transactions. <br />
            This amount is included within your portfolio balance but not
            available to spend yet.
          </Pending>
        )}*/}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  balances: OFFSHORE_ENABLED
    ? selectTotalBalances(state)
    : selectBalances(state),
  syncState: isDesktop()
    ? selectDesktopSyncState(state as DesktopAppState)
    : selectWebSyncState(state),
});
export const MultiBalance = connect(mapStateToProps, null)(Balances);
