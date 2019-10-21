// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Pending, Value, Wrapper, Amount } from "./styles";

import { connect } from "react-redux";
import { NO_BALANCE } from "../../../reducers/balance";
import { convertBalanceForReading } from "../../../utility";
import { Spinner } from "../../spinner";

import { ProgressBar } from "../../progress-bar";

import { selectSyncState } from "../../../reducers/chain";

class Balances extends Component {
  render() {
    const {
      unlockedBalance,
      lockedBalance,
      isSyncing,
      bHeight,
      scannedHeight
      // scannedDate
    } = this.props;

    return (
      <Wrapper>
        <Amount isSyncing={isSyncing}>
          {unlockedBalance === NO_BALANCE ? (
            <Spinner />
          ) : (
            convertBalanceForReading(unlockedBalance)
          )}
        </Amount>
        <Value>{isSyncing ? "Syncing Wallet..." : "XHV Balance"}</Value>
        {isSyncing && <ProgressBar max={bHeight} value={scannedHeight} />}
        {lockedBalance > 0 ? (
          <Pending>
            You have {convertBalanceForReading(lockedBalance)} XHV pending
            <br />
            Balances are updating.
          </Pending>
        ) : null}
      </Wrapper>
    );
  }
}

export const mapStateToProps = state => ({
  ...state.balance,
  ...selectSyncState(state)
});

export default connect(
  mapStateToProps,
  null
)(Balances);
