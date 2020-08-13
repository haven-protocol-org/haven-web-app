import React from "react";
// import "./styles.css";
import {
  Container,
  Select,
  Wrapper,
  Item,
  Button,
  Labels,
  Primary,
  Row,
  Trusted,
} from "./styles";
import { Label, Error } from "../../../../assets/styles/type.js";

class Nodes extends React.Component {
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
      const { name, trusted } = option;

      return (
        <Item trusted={trusted} key={name} onClick={() => onClick(option)}>
          <Row>
            <Primary>{name}</Primary>
          </Row>
          {trusted && <Trusted>{trusted && "Trusted"}</Trusted>}
        </Item>
      );
    });
  };

  render() {
    const { displayMenu } = this.state;
    const { label, error, value } = this.props;

    return (
      <Container>
        <Labels>
          <Label>{label}</Label>
          <Error>{error}</Error>
        </Labels>
        <Select>
          <Button
            disabled={this.props.disabled}
            onClick={this.showDropdownMenu}
          >
            <Row>
              <Primary>{value}</Primary>
            </Row>
          </Button>
          {displayMenu && <Wrapper>{this.renderOptions()}</Wrapper>}
        </Select>
      </Container>
    );
  }
}

export default Nodes;
