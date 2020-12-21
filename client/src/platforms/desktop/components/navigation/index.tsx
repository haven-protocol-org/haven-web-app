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
import Buttons from "./buttons/index.js";

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
    mouseIsHovering: false,
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
    if (!this.state.mouseIsHovering) {
      this.setState({ showOptions: false }, () => {
        document.removeEventListener("click", this.hideDropdownMenu);
      });
    }
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

  handleMouseEnter = () => {
    this.setState({
      mouseIsHovering: true,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      mouseIsHovering: false,
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
          <Buttons isLoading={false} auth={auth} onClick={this.handleLogout} />

          <Options onClick={this.showDropdownMenu}>
            <OptionsIcon>
              <OptionsSVG />
            </OptionsIcon>
          </Options>
        </Menu>
        {this.state.showOptions && (
          <>
            <OptionsList
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <Arrow>
                <Arr />
              </Arrow>
              <OptionsDoubleRow>
                <Body>Network</Body>
                <Label>
                  {current_network === "testnet" ? "Testnet" : "Mainnet"}
                  {` `} v{window.havenProcess.appVersion}
                </Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Node Type</Body>
                <Label>{node.location}</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Block Height</Body>
                <Label>{height}</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Vault Height</Body>
                <Label>...</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Help</Body>
                <Label>Knowledge Base</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Legal</Body>
                <Label>Terms & Conditions</Label>
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
