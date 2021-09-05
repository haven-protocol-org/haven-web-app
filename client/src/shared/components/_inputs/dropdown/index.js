import React from "react";
import {
  Container,
  Select,
  Wrapper,
  Item,
  Button,
  Labels,
  Ticker,
  Name,
  Row,
} from "./styles";
import { Label, Error } from "../../../../assets/styles/type.js";

class Dropdown extends React.Component {
  state = {
    displayMenu: false,
    selected: this.props.placeholder,
    buttonRef: null
  };

  constructor(props) {
    super(props)

    this.buttonRef = React.createRef();
  }

  showDropdownMenu = () => {
    this.setState({ displayMenu: true });
  }

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false });
  }

  onClickOutside = (e) => {
    const { target } = e;
    const { current } = this.buttonRef;
    if (current && !current.contains(target)) this.hideDropdownMenu();
  }

  componentDidMount = () => {
    document.addEventListener("click", this.onClickOutside);
  }

  componentWillUnmount = () => {
    document.removeEventListener("click", this.onClickOutside);
  }

  renderOptions = () => {
    const { onClick, options } = this.props;
    return options.map((option) => {
      const { name, ticker } = option;
      return (
        <Item key={name} onClick={() => onClick(option)}>
          <Row>
            <Name>{name}</Name>
            {ticker ? <Ticker>{ticker}</Ticker> : null}
          </Row>
        </Item>
      );
    });
  };

  render() {
    const { displayMenu } = this.state;
    const {
      label,
      error,
      placeholder,
      value,
      ticker,
      width,
      disabled,
    } = this.props;

    return (
      <Container width={width}>
        <Labels>
          <Label>{label}</Label>
          <Error>{error}</Error>
        </Labels>
        <Select>
          <Button type="button" ref={this.buttonRef} disabled={disabled} onClick={this.showDropdownMenu}>
            {value === "Select Asset" ? (
              placeholder
            ) : (
              <Row>
                <Name>{value}</Name>
                <Ticker>{ticker}</Ticker>
              </Row>
            )}
          </Button>
          {displayMenu && <Wrapper>{this.renderOptions()}</Wrapper>}
        </Select>
      </Container>
    );
  }
}

export default Dropdown;
