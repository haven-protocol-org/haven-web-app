import React from "react";
// import "./styles.css";
import {
  Container,
  Select,
  Wrapper,
  Item,
  Button,
  Labels,
  Ticker,
  Name,
  Row
} from "./styles";
import { Label, Error } from "../../../../assets/styles/type.js";

class Dropdown extends React.Component {
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
    const { label, error, placeholder, value, ticker, width } = this.props;

    return (
      <Container width={width}>
        <Labels>
          <Label>{label}</Label>
          <Error>{error}</Error>
        </Labels>
        <Select>
          <Button onClick={this.showDropdownMenu}>
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
