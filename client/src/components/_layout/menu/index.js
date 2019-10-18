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
import {SyncBar} from "../../sync-bar";
import {selectSyncState} from "../../../reducers/chain";
import {isDevMode} from "../../../constants/env";

class Menu extends Component {


  render() {
    const { unlockedBalance, lockedBalance, isSyncing, bHeight, scannedHeight } = this.props;


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
            <Value>XHV Balance</Value>
            {lockedBalance > 0 ? (
              <div>
                <Pending>
                  You have {convertBalanceForReading(lockedBalance)} XHV pending
                  <br />
                  Your balances will be updated shortly.
                </Pending>
              </div>

            ) : null}
              { isDevMode()? ( <SyncBar bHeight={bHeight} scannedHeight={scannedHeight}/>) :null

              }

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
  ...state.balance, ...selectSyncState(state)
});

export default connect(
  mapStateToProps,
  null
)(Menu);
