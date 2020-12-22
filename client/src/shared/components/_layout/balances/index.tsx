// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Pending, Value, Wrapper, Amount } from "./styles";
import { connect } from "react-redux";
import { convertBalanceToMoney } from "utility/utility";
import { Spinner } from "../../spinner";
import { ProgressBar } from "../../progress-bar";
import { HavenAppState } from "platforms/desktop/reducers";
import { SyncState } from "shared/types/types";
import { selectSyncState } from "shared/reducers/chain";
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
            convertBalanceToMoney(unlockedBalance)
          )}
        </Amount>
        <Value>
          {isSyncing ? `Syncing Vault... ${percentage}%` : ticker + " Balance"}
        </Value>
        {isSyncing && <ProgressBar percentage={percentage} />}
        {lockedBalance.greater(0) ? (
          <Pending>
            You have {convertBalanceToMoney(lockedBalance) + " " + ticker}{" "}
            pending.
            <br />
            Balances are updating.
          </Pending>
        ) : null}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: HavenAppState) => ({
  balances: state.xBalance,
  syncState: selectSyncState(state)
});
export default connect(
  mapStateToProps,
  null
)(Balances);
