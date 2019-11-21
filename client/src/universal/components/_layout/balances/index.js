// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Pending, Value, Wrapper, Amount } from "./styles";
import { connect } from "react-redux";
import { NO_BALANCE } from "../../../reducers/balance";
import { convertBalanceForReading } from "../../../../utility/utility";
import { selectSyncState } from "../../../../platforms/web/reducers/chain";
import { Spinner } from "../../spinner";
import { ProgressBar } from "../../progress-bar";

class Balances extends Component {
  render() {
    const {
      unlockedBalance,
      lockedBalance,
      isSyncing,
      blockHeight,
      scannedHeight
    } = this.props;

    const amount = (scannedHeight / blockHeight) * 100;
    const percentage = amount.toFixed(2);

    return (
      <Wrapper>
        <Amount isSyncing={isSyncing}>
          {unlockedBalance === NO_BALANCE ? (
            <Spinner />
          ) : (
            convertBalanceForReading(unlockedBalance)
          )}
        </Amount>
        <Value>
          {isSyncing ? `Syncing Vault... ${percentage}%` : "XHV Balance"}
        </Value>
        {isSyncing && <ProgressBar percentage={percentage} />}
        {lockedBalance > 0 ? (
          <Pending>
            You have {convertBalanceForReading(lockedBalance)} XHV pending.
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
