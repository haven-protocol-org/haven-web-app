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
import { NO_BALANCE } from "../../../reducers/balance";
import { convertBalanceForReading } from "../../../utility";
import { Spinner } from "../../spinner";

class Menu extends Component {


  componentDidMount() {
    if (this.props.balance === NO_BALANCE) {
      this.props.getBalances();
    }
  }

  render() {
    const { balance, unlockedBalance, lockedBalance } = this.props;

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
                  You have{" "}
                  {convertBalanceForReading(lockedBalance)} XHV
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
