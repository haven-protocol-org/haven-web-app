import React from "react";
// import "./styles.css";
import {
  Container,
  Select,
  Wrapper,
  Item,
  Button,
  Labels,
  Name,
  Row
} from "./styles";
import { Label, Error } from "assets/styles/type.js";

interface WalletSelectionProps {
  onClick: (option: string) => void;
  options: string[] | null;
  placeholder: string;
  label: string;
  error: string;
  value: string | null;
}

export class WalletSelection extends React.Component<
  WalletSelectionProps,
  any
> {
  state = {
    displayMenu: false,
    selected: this.props.placeholder
  };

  showDropdownMenu = (event: any) => {
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
    return (
      options &&
      options.map(option => {
        return (
          <Item key={option} onClick={() => onClick(option)}>
            <Row>
              <Name>{option}</Name>
            </Row>
          </Item>
        );
      })
    );
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
            {value === null ? (
              placeholder
            ) : (
              <Row>
                <Name>{value}</Name>
              </Row>
            )}
          </Button>
          {displayMenu && <Wrapper>{this.renderOptions()}</Wrapper>}
        </Select>
      </Container>
    );
  }
}
