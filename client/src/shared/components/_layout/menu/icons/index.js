// Library Imports
import React, { Component } from "react";

// Relative Imports
import {
  Container,
  Overview,
  Item,
  Wrapper,
  Icon,
  Chevron,
  Label,
  Aligner,
  Asset,
  Convert,
  Transfer,
  Settings,
  ChevronInactive,
} from "./styles";

import { MultiBalance } from "../../multi-balance";

class Menu extends Component {
  state = {
    item: "",
  };

  componentDidMount() {
    this.setState({
      item: "assets",
    });
  }

  handleClick = (item) => {
    this.setState({
      item: item,
    });
  };

  render() {
    const { item } = this.state;

    return (
      <Container>
        <Overview>
          <MultiBalance />
        </Overview>
        <Wrapper>
          <Item to="/wallet/assets" onClick={() => this.handleClick("assets")}>
            <Aligner>
              <Asset item={item} />
              <Label>Assets</Label>
            </Aligner>
            {item === "assets" ? <Chevron /> : <ChevronInactive />}
          </Item>
        </Wrapper>
        <Wrapper>
          <Item
            to="/wallet/convert"
            onClick={() => this.handleClick("convert")}
          >
            <Aligner>
              <Convert item={item} />
              <Label>Convert</Label>
            </Aligner>
            {item === "convert" ? <Chevron /> : <ChevronInactive />}
          </Item>
        </Wrapper>
        <Wrapper>
          <Item
            to="/wallet/transfer"
            onClick={() => this.handleClick("transfer")}
          >
            <Aligner>
              <Transfer item={item} />
              <Label>Transfer</Label>
            </Aligner>
            {item === "transfer" ? <Chevron /> : <ChevronInactive />}
          </Item>
        </Wrapper>
        <Wrapper>
          <Item
            to="/wallet/settings"
            onClick={() => this.handleClick("settings")}
          >
            <Aligner>
              <Settings item={item} />
              <Label>Settings</Label>
            </Aligner>
            {item === "settings" ? <Chevron /> : <ChevronInactive />}
          </Item>
        </Wrapper>
      </Container>
    );
  }
}

export default Menu;
