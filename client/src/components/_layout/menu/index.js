// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Overview, Item, Value, Wrapper, Amount } from "./styles";
import { connect } from "react-redux";
import { getBalances } from "../../../actions";
import { NO_BALANCE } from "../../../reducers/balance";

class Menu extends Component {
  componentDidMount() {
    if (this.props.balance === NO_BALANCE) {
      this.props.getBalances();
    }
  }

  render() {
    const viewBalance =
      this.props.balance === NO_BALANCE
        ? "loading..."
        : this.props.balance / Math.pow(10, 12);

    return (
      <Container>
        <Overview>
          <Wrapper>
            <Amount>{viewBalance}</Amount>
            <Value>Total Balance (XHV)</Value>
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
