import React from "react";

import {
  Container,
  Select,
  Wrapper,
  Item,
  Button,
  Labels,
  Name,
  Row,
  Address,
  Ticker,
  Edit,
  Block
} from "./styles";
import { Label, Error } from "../../../../assets/styles/type.js";

class AddressDropdown extends React.Component {
  state = {
    displayMenu: false,
    selected: this.props.placeholder
  };

  showDropdownMenu = event => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  };

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  };

  renderOptions = () => {
    const { onClick, options } = this.props;
    return options.map(option => {
      const { address, name } = option;
      return (
        <Item key={address} onClick={() => onClick({ address, name })}>
          <Row>
            <Block>
              <Address>{address}</Address>
              <Name>{name}</Name>
            </Block>
            <Edit>Edit</Edit>
          </Row>
        </Item>
      );
    });
  };

  render() {
    const { displayMenu } = this.state;
    const { label, error, name, options } = this.props;

    return (
      <Container>
        <Labels>
          <Label>{label}</Label>
          <Error>{error}</Error>
        </Labels>
        <Select>
          <Button onClick={this.showDropdownMenu}>
            <Row>
              <Name>{"Select Address"}</Name>
            </Row>
          </Button>
          {displayMenu && <Wrapper>{this.renderOptions()}</Wrapper>}
        </Select>
      </Container>
    );
  }
}

export default AddressDropdown;
