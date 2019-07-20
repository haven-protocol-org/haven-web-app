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
import { getBalances } from "../../../actions";
import { selectReadableBalance, NO_BALANCE } from "../../../reducers/balance";
import { convertBalanceForReading } from "../../../utility";
import { Spinner } from "../../spinner";

class Menu extends Component {
  state = {
    lockedBalance: 4.124211,
    lockedTime: 20
  };

  componentDidMount() {
    if (this.props.balance === NO_BALANCE) {
      this.props.getBalances();
    }
  }

  render() {
    const { balance, unlocked_balance, blocks_to_unlock } = this.props;

    return (
      <Container>
        <Overview>
          <Wrapper>
            <Amount>
              {unlocked_balance === NO_BALANCE ? (
                <Spinner />
              ) : (
                convertBalanceForReading(balance - unlocked_balance)
              )}
            </Amount>
            <Value>XHV Balance</Value>
            {balance !== unlocked_balance ? (
              <div>
                <Pending>
                  You have {convertBalanceForReading(unlocked_balance)} XHV
                  pending
                  <br />
                  Your balances will be updated shortly.
                </Pending>
              </div>
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
  ...state.balance
});

export default connect(
  mapStateToProps,
  { getBalances }
)(Menu);
