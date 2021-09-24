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
  Ticker,
} from "./styles";
import { Label, Error } from "../../../../assets/styles/type.js";

class AddressDropdown extends React.Component {
  state = {
    displayMenu: false,
    selected: this.props.placeholder,
    buttonRef: null
  };

  constructor(props) {
    super(props)
    this.buttonRef = React.createRef();
  }

  showDropdownMenu = (event) => {
    //event.preventDefault();
    //event.stopPropagation();
    // blu - 23.09.2021, commenting these out - seem redundant and stop the click outside of other dropdowns from firing
    this.setState({ displayMenu: true });
    document.addEventListener("click", this.onClickOutside);
  };

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false });
    document.removeEventListener("click", this.onClickOutside);
  };

  onClickOutside = (e) => {
    const { target } = e;
    const { current } = this.buttonRef;
    if (current && !current.contains(target)) this.hideDropdownMenu();
  }

  componentWillUnmount = () => {
    document.removeEventListener("click", this.onClickOutside);
  }

  renderOptions = () => {
    const { onClick, options } = this.props;
    return options.map((option) => {
      const { address, label, index } = option;

      const first = address.substring(0, 4);
      const last = address.substring(address.length - 4);
      const truncated = first + "...." + last;

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
      address,
      hideCreateAddress,
      disabled
    } = this.props;

    const first = address.substring(0, 4);
    const last = address.substring(address.length - 4);
    const truncated = first + "...." + last;

    return (
      <Container>
        <Labels>
          <Label>{label}</Label>
          <Error>{error}</Error>
        </Labels>
        <Select>
          <Button type="button" ref={this.buttonRef} disabled={disabled} onClick={this.showDropdownMenu}>
            <Row>
              <Block>
                <Name>{!value ? placeholder : value}</Name>
                <Ticker>{address}</Ticker>
              </Block>
            </Row>
          </Button>
          {displayMenu && (
            <Wrapper>
              {this.renderOptions()}
              {!hideCreateAddress && (
                <Item key="addAddress" onClick={editAddress}>
                  <Row>
                    <Block>
                      <Name>{"Create address"}</Name>
                    </Block>
                    {editable && <Edit onClick={editAddress}>Create</Edit>}
                  </Row>
                </Item>
              )}
            </Wrapper>
          )}
        </Select>
      </Container>
    );
  }
}

export default AddressDropdown;
