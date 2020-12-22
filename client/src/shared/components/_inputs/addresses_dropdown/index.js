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
      const { address, label, index } = option;

      const first = address.substring(0, 4);
      const last = address.substring(address.length - 4);
      const truncated = first + "...." + last;

      // const handleLabel = label === undefined ? `Address ${index}` : label;

      return (
        <>
          <Item
            key={address}
            onClick={() => onClick({ address, label, index })}
          >
            <Row>
              <Block>
                <Name>{label === undefined ? `Address ${index}` : label} </Name>
                <Address>{truncated}</Address>
              </Block>
            </Row>
          </Item>
        </>
      );
    });
  };

  render() {
    const { displayMenu } = this.state;
    const {
      label,
      error,
      value,
      placeholder,
      editAddress,
      editable,
    } = this.props;

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
          {displayMenu && (
            <Wrapper>
              {this.renderOptions()}
              <Item key="addAddress" onClick={editAddress}>
                <Row>
                  <Block>
                    <Name>{"Create address"}</Name>
                    <Address>{""}</Address>
                  </Block>
                  {editable && <Edit onClick={editAddress}>Create</Edit>}
                </Row>
              </Item>
            </Wrapper>
          )}
        </Select>
      </Container>
    );
  }
}

export default AddressDropdown;
