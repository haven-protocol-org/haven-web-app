// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Overview, Item, Value, Wrapper, Amount } from "./styles";

import RPC from "../../rpc";

class Menu extends Component {
  state = {
    dCurrentBalance: 0.0,
    error: ""
  };

  getBalance = () => {
    // NEAC - parameters to configure for a call to the backend RPC code
    var strMethod = "get_balance";
    var objParams = { account_index: 0, address_index: [0] };

    RPC.call_rpc(strMethod, objParams)
      .then(
        function(objResponse) {
          debugger;
          if (objResponse.hasOwnProperty("result")) {
            // Got a balance - display it somehow

            debugger;
            this.setState({
              dCurrentBalance: (objResponse.result.balance / 1000000000000).toFixed(12)
            });
          }
        }.bind(this)
      )
      .catch(
        function(myError) {
          this.setState({ error: myError.message });
          setTimeout(() => {
            this.setState({ error: "" });
          }, 2000);
        }.bind(this)
      );
  };

  render() {
    const { dCurrentBalance } = this.state;

    // Trigger a call to getBalance()
    setTimeout(() => {
      this.getBalance({ error: "" });
    }, 5000);

    return (
      <Container>
        <Overview>
          <Wrapper>
            <Amount>{dCurrentBalance}</Amount>
            <Value>Total Balance (XHV)</Value>
          </Wrapper>
        </Overview>

        <Item to="/wallet/assets">Assets</Item>
        <Item to="/wallet/exchange">Exchange</Item>
        <Item to="/wallet/transfer">Transfer</Item>
        <Item to="/wallet/settings">Settings</Item>
      </Container>
    );
  }
}

export default Menu;
