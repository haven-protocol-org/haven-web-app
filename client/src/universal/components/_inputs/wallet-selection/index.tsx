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
  Row, Ticker
} from "./styles";
import { Label, Error } from "assets/styles/type.js";
import {SavedWallet} from "../../../../platforms/desktop/reducers/walletSession";


interface WalletSelectionProps {
  onClick:(option: SavedWallet) => void,
  options:SavedWallet[] | null,
  placeholder:string,
  label: string,
  error: string,
  value: SavedWallet | null
}

export class WalletSelection extends React.Component<WalletSelectionProps,any> {


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
    return options && options.map(option => {
      const { name, address } = option;
      return (
        <Item key={name} onClick={() => onClick(option)}>
          <Row>
            <Name>{name}</Name>
            <Ticker>{address}</Ticker>
          </Row>
        </Item>
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
            {value === null ? (
                placeholder
            ) : (
                <Row>
                  <Name>{value.name}</Name>
                </Row>
            )}
          </Button>
          {displayMenu && <Wrapper>{this.renderOptions()}</Wrapper>}
        </Select>
      </Container>
    );
  }
}
