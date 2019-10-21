// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Overview, Item } from "./styles";

import Balances from "../balances/index.js";

class Menu extends Component {
  render() {
    return (
      <Container>
        <Overview>
          <Balances />
        </Overview>
        <Item to="/wallet/assets">Assets</Item>
        <Item to="/wallet/transfer">Transfer</Item>
        <Item to="/wallet/settings">Settings</Item>
      </Container>
    );
  }
}

export default Menu;
