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
import { getReadableBalance, NO_BALANCE } from "../../../reducers/balance";

class Menu extends Component {
  state = {
    lockedBalance: 0,
    lockedTime: 20
  };

  componentDidMount() {
    if (this.props.balance === NO_BALANCE) {
      this.props.getBalances();
    }
  }

  render() {
    const { lockedBalance, lockedTime } = this.state;
    const balance = lockedBalance.toFixed(4);
    const viewBalance =
      this.props.balance === NO_BALANCE ? "loading..." : this.props.balance;

    return (
      <Container>
        <Overview>
          <Wrapper>
            <Amount>
              {viewBalance === "loading..." ? viewBalance : viewBalance}
            </Amount>
            <Value>XHV Balance</Value>
            {balance > 0 ? (
              <Pending>
                You recently received {balance} XHV. <br />
                In ~{lockedTime} mins it'll be unlocked and added to your
                balance.
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
  balance: getReadableBalance(state)
});

export default connect(
  mapStateToProps,
  { getBalances }
)(Menu);
