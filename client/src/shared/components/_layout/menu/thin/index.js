// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Overview, Item } from "./styles";

import { MultiBalance } from "../../multi-balance";

class Menu extends Component {
  render() {
    return (
      <Container>
        <Overview>
          <MultiBalance />
        </Overview>
        <Item to="/wallet/assets">Assets</Item>
        <Item to="/wallet/convert">Convert</Item>
        <Item to="/wallet/transfer">Transfer</Item>
        <Item to="/wallet/settings">Settings</Item>
      </Container>
    );
  }
}

export default Menu;
