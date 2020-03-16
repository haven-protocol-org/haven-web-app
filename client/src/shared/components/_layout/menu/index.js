// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Overview, Item } from "./styles";

import Balances from "../balances";
import { OFFSHORE_ENABLED } from "../../../../constants/env";
import { MultiBalance } from "../multi-balance";

class Menu extends Component {
  render() {
    return (
      <Container>
        <Overview>
          <MultiBalance />
        </Overview>
        <Item to="/wallet/assets">Assets</Item>
        {OFFSHORE_ENABLED ? <Item to="/wallet/exchange">Exchange</Item> : ""}
        <Item to="/wallet/transfer">Transfer</Item>
        <Item to="/wallet/settings">Settings</Item>
      </Container>
    );
  }
}

export default Menu;
