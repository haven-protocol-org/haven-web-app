// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Pending, Value, Wrapper, Amount } from "./styles";
import { connect } from "react-redux";
import { convertBalanceForReading } from "utility/utility";
import { selectWebSyncState } from "platforms/web/reducers/chain";
import { Spinner } from "../../spinner";
import { ProgressBar } from "../../progress-bar";
import { DesktopAppState } from "platforms/desktop/reducers";
import { WebAppState } from "platforms/web/reducers";
import { SyncState } from "shared/types/types";
import { isDesktop, OFFSHORE_ENABLED } from "constants/env";
import { selectDesktopSyncState } from "platforms/desktop/reducers/chain";
import { NO_BALANCE, XBalances } from "shared/reducers/xBalance";
import { Ticker } from "shared/reducers/types";

interface BalanceProps {
  syncState: SyncState;
  balances: XBalances;
}

interface BalanceState {
  currentTicker: Ticker;
  currentIndex: number;
}

class Balances extends Component<BalanceProps, BalanceState> {
  state: BalanceState = {
    currentIndex: 0,
    currentTicker: Object.keys(Ticker)[0] as Ticker
  };

  onClickNext() {
    if (!OFFSHORE_ENABLED) {
      return;
    }

    const tickerNum: number = Object.keys(Ticker).length;

    let nextIndex = this.state.currentIndex + 1;
    if (nextIndex === tickerNum) {
      nextIndex = 0;
    }
    this.setState({
      currentIndex: nextIndex,
      currentTicker: Object.keys(Ticker)[nextIndex] as Ticker
    });
  }

  render() {
    const ticker = this.state.currentTicker;

    const { unlockedBalance, lockedBalance } = this.props.balances[ticker];
    const { isSyncing, blockHeight, scannedHeight } = this.props.syncState;

    const amount = (scannedHeight / blockHeight) * 100;
    const percentage = amount.toFixed(2);

    return (
      <Wrapper onClick={() => this.onClickNext()}>
        <Amount isSyncing={isSyncing}>
          {unlockedBalance === NO_BALANCE ? (
            <Spinner />
          ) : (
            convertBalanceForReading(unlockedBalance)
          )}
        </Amount>
        <Value>
          {isSyncing ? `Syncing Vault... ${percentage}%` : ticker + " Balance"}
        </Value>
        {isSyncing && <ProgressBar percentage={percentage} />}
        {lockedBalance.greater( 0) ? (
          <Pending>
            You have {convertBalanceForReading(lockedBalance) + " " + ticker}{" "}
            pending.
            <br />
            Balances are updating.
          </Pending>
        ) : null}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: DesktopAppState | WebAppState) => ({
  balances: state.xBalance,
  syncState: isDesktop()
    ? selectDesktopSyncState(state as DesktopAppState)
    : selectWebSyncState(state)
});
export default connect(mapStateToProps, null)(Balances);
