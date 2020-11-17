// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
// Relative Imports
import {
  Arr,
  Arrow,
  Brand,
  Button,
  Container,
  Haven,
  Icon,
  Logout,
  Menu,
  Options,
  OptionsDoubleRow,
  OptionsIcon,
  OptionsList,
  OptionsSVG,
} from "./styles";

import { Body, Label } from "assets/styles/type";
import { closeWallet } from "shared/actions/wallet";
import { selectIsLoggedIn } from "../../../../shared/reducers/walletSession";
import { getNetworkByName, isDevMode, NET_TYPE_NAME } from "constants/env";
import { DesktopAppState } from "../../reducers";
import { LocalNode, SelectedNode } from "platforms/desktop/types";
import { selectisLocalNode } from "platforms/desktop/reducers/connectedNode";
import { selectBlockHeight } from "shared/reducers/chain";

interface NavigationProps {
  node: SelectedNode;
  isLoggedIn: boolean;
  height: number;
  isLocalNode: boolean;
  show_networks: boolean;
  logout: (isWeb: boolean) => void;
}

class Navigation extends Component<NavigationProps, any> {
  state = {
    current_network: getNetworkByName(),
    showOptions: false,
    showNotifications: false,
  };

  onComponentDidMount() {
    this.setState({
      current_network: NET_TYPE_NAME,
    });
  }

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

  showNotifications = (event: any) => {
    event.preventDefault();
    this.setState({ showNotifications: true }, () => {
      document.addEventListener("click", this.hideNotifications);
    });
  };

  hideNotifications = () => {
    this.setState({ showNotifications: false }, () => {
      document.removeEventListener("click", this.hideNotifications);
    });
  };

  userFocused = () => {
    this.setState({ showNotifications: true });
  };

  handleClick = () => {
    this.setState({ showNotifications: true }, () => {
      document.addEventListener("click", this.hideNotifications);
    });
  };

  handleLogout = () => {
    this.props.logout(false);
  };

  showOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions,
    });
  };

  render() {
    const auth = this.props.isLoggedIn;
    const { current_network } = this.state;
    const { node, height } = this.props;

    return (
      <Container>
        <Brand>
          <Icon />
          <Haven>HAVEN</Haven>
        </Brand>

        <Menu>
          {auth === false ? (
            <Button to="/">Login</Button>
          ) : (
            <Logout onClick={this.handleLogout}>Logout</Logout>
          )}

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
                <Label>{current_network}</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Type</Body>
                <Label>{node.location}</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Block</Body>
                <Label>{height}</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Version</Body>
                <Label>v{window.havenProcess.appVersion}</Label>
              </OptionsDoubleRow>
            </OptionsList>
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  isLoggedIn: selectIsLoggedIn(state),
  node: state.connectedNode,
  isLocalNode: selectisLocalNode(state.connectedNode),
  height: selectBlockHeight(state),
});

export const NavigationDesktop = connect(mapStateToProps, {
  logout: closeWallet,
})(Navigation);
