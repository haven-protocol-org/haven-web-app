// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container, Overview, Item, Wrapper, Icon } from "./styles";

import { MultiBalance } from "../../multi-balance";

class Menu extends Component {
  render() {
    return (
      <Container>
        <Overview>
          <MultiBalance />
        </Overview>
        <Wrapper>
          <Item to="/wallet/assets">Assets</Item>
        </Wrapper>
        <Wrapper>
          <Item to="/wallet/convert">Convert</Item>
        </Wrapper>
        <Wrapper>
          <Item to="/wallet/transfer">Transfer</Item>
        </Wrapper>
        <Wrapper>
          <Item to="/wallet/settings">Settings</Item>
        </Wrapper>
      </Container>
    );
  }
}

export default Menu;
