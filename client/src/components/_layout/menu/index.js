// Library Imports
import React, { Component } from "react";

// Relative Imports
import {
  Container,
  Overview,
  Pending,
  Item,
  Value,
  Wrapper,
  Amount
} from "./styles";

import { connect } from "react-redux";
import { NO_BALANCE } from "../../../reducers/balance";
import { convertBalanceForReading } from "../../../utility";
import { Spinner } from "../../spinner";

import { ProgressBar } from "../../progress-bar";

import { selectSyncState } from "../../../reducers/chain";
import { isDevMode } from "../../../constants/env";

class Menu extends Component {
  render() {
    const {
      unlockedBalance,
      lockedBalance,
      isSyncing,
      bHeight,
      scannedHeight
    } = this.props;

    // These are temporary props to mock the progress bar
    const tempHeight = 552251; // Prop for missing bHeight prop
    const tempSync = true; // If syncing then show the progress bar
    const tempLockedBalance = 3; // If there's a locked balance

    return (
      <Container>
        <Overview>
          <Wrapper>
            <Amount>
              {unlockedBalance === NO_BALANCE ? (
                <Spinner />
              ) : (
                convertBalanceForReading(unlockedBalance)
              )}
            </Amount>
            <Value>{tempSync ? "Syncing Wallet" : "XHV Balance"}</Value>
            {tempSync && <ProgressBar max={tempHeight} value={bHeight} />}
            {tempLockedBalance > 0 ? (
              <Pending>
                You have {convertBalanceForReading(lockedBalance)} XHV pending
                <br />
                Balances are updating.
              </Pending>
            ) : null}
          </Wrapper>
        </Overview>
        <Item to="/wallet/assets">Assets</Item>
        <Item to="/wallet/transfer">Transfer</Item>
        <Item to="/wallet/settings">Settings</Item>
      </Container>
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
)(Menu);
