// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports
import {
  Container,
  Haven,
  Brand,
  Logout,
  Tag,
  Icon,
  Auth,
  Menu,
  Options,
  OptionsDoubleRow,
  OptionsIcon,
  OptionsList,
  OptionsSVG,
  Arr,
  Arrow,
} from "./styles.js";
import { Body, Label } from "assets/styles/type";
import Buttons from "./buttons/index.js";
import { closeWallet } from "shared/actions/wallet";
import { selectIsLoggedIn } from "shared/reducers/walletSession";
import { APP_VERSION, NET_TYPE_NAME } from "constants/env";
import { WebAppState } from "platforms/web/reducers/index.js";

interface NavigationProps {
  isLoggedIn: boolean;
  auth: boolean;
  logout: (isWeb: boolean) => void;
  storeKeyFileToDisk: (name: string) => void;
  storeWalletInDB: (name: string) => void;
  getStoredWallets: () => void;
}

class Navigation extends Component<NavigationProps, {}> {
  state = {
    showOptions: false,
    showNotifications: false,
  };

  handleLogout = () => {
    this.props.logout(true);
  };

  showDropdownMenu = (event: any) => {
    event.preventDefault();
    this.setState({ showOptions: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  };

  hideDropdownMenu = () => {
    this.setState({ showOptions: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  };

  render() {
    const auth = this.props.isLoggedIn;

    return (
      <Container>
        <Brand to={auth ? "/wallet/assets" : "/"}>
          <Icon />
          <Haven>HAVEN</Haven>
          <Tag>
            v{APP_VERSION} {NET_TYPE_NAME}
          </Tag>
        </Brand>
        <Menu>
          <Buttons auth={this.props.isLoggedIn} onClick={this.handleLogout} />
          <Options onClick={this.showDropdownMenu}>
            <OptionsIcon>
              <OptionsSVG />
            </OptionsIcon>
          </Options>
        </Menu>
        {this.state.showOptions && (
          <>
            <OptionsList>
              <Arrow>
                <Arr />
              </Arrow>
              <OptionsDoubleRow>
                <Body>Network</Body>
                <Label>{"test"}</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Type</Body>
                <Label>{"test"}</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Block</Body>
                <Label>{"test"}</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Version</Body>
                <Label>v{"test"}</Label>
              </OptionsDoubleRow>
            </OptionsList>
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: WebAppState) => ({
  isLoggedIn: selectIsLoggedIn(state),
});

export const NavigationWeb = connect(mapStateToProps, {
  logout: closeWallet,
})(Navigation);
