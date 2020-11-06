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
  Edit,
  Block,
} from "./styles";
import { Label, Error } from "../../../../assets/styles/type.js";

class AddressDropdown extends React.Component {
  state = {
    displayMenu: false,
    selected: this.props.placeholder,
  };

  showDropdownMenu = (event) => {
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
    return options.map((option) => {
      const { address, label } = option;

      const first = address.substring(0, 4);
      const last = address.substring(address.length - 4);
      const truncated = first + "...." + last;

      return (
        <>
          <Item key={address} onClick={() => onClick({ address, label })}>
            <Row>
              <Block>
                <Name>{label}</Name>
                <Address>{truncated}</Address>
              </Block>
            </Row>
          </Item>
          <Item>
            <Row>
              <Block>
                <Name>{"Add new subaddress"}</Name>
                <Address>{""}</Address>
              </Block>
              {this.props.editable && (
                <Edit onClick={this.props.editAddress}>Add New</Edit>
              )}
            </Row>
          </Item>
        </>
      );
    });
  };

  render() {
    const { displayMenu } = this.state;
    const { label, error, value, placeholder } = this.props;

    return (
      <Container>
        <Labels>
          <Label>{label}</Label>
          <Error>{error}</Error>
        </Labels>
        <Select>
          <Button onClick={this.showDropdownMenu}>
            <Row>
              <Name>{!value ? placeholder : value}</Name>
            </Row>
          </Button>
          {displayMenu && <Wrapper>{this.renderOptions()}</Wrapper>}
        </Select>
      </Container>
    );
  }
}

export default AddressDropdown;
