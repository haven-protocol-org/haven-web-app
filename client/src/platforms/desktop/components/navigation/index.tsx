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
  Legal,
} from "./styles";

import { Body, Label } from "assets/styles/type";
import { closeWallet } from "shared/actions/wallet";
import { selectIsLoggedIn } from "../../../../shared/reducers/walletSession";
import { getNetworkByName, isDevMode, NET_TYPE_NAME } from "constants/env";
import { DesktopAppState } from "../../reducers";
import { LocalNode, SelectedNode } from "platforms/desktop/types";
import { selectisLocalNode } from "platforms/desktop/reducers/selectedNode";
import { selectBlockHeight } from "shared/reducers/chain";
import Buttons from "./buttons/index.js";

interface NavigationProps {
  node: SelectedNode;
  isLoggedIn: boolean;
  height: number;
  isLocalNode: boolean;
  show_networks: boolean;
  logout: (isWeb: boolean) => void;
  chain: any;
  isClosingSession: boolean;
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

    // @ts-ignore
    const { chainHeight, walletHeight } = this.props.chain;
    const syncStarted = chainHeight !== 0;
    const syncedFinished = syncStarted && chainHeight === walletHeight;

    return (
      <Container>
        <Brand>
          <Icon />
          <Haven>HAVEN</Haven>
        </Brand>

        <Menu>
          <Buttons
            isLoading={this.props.isClosingSession}
            auth={auth}
            onClick={this.handleLogout}
          />

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
                <Label>{chainHeight}</Label>
              </OptionsDoubleRow>
              {syncedFinished ? (
                <OptionsDoubleRow>
                  <Body>Vault Synced</Body>
                  <Label>Yes</Label>
                </OptionsDoubleRow>
              ) : (
                <OptionsDoubleRow>
                  <Body>Vault Height</Body>
                  <Label>{walletHeight}</Label>
                </OptionsDoubleRow>
              )}
              <OptionsDoubleRow>
                <Body>Help</Body>
                <Legal
                  target="_blank"
                  href="https://havenprotocol.org/knowledge/"
                >
                  <Label>Knowledge Base</Label>
                </Legal>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Legal</Body>
                <Legal target="_blank" href="https://havenprotocol.org/legal/">
                  <Label>Terms & Conditions</Label>
                </Legal>
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
  chain: state.chain,
  isClosingSession: state.walletSession.isClosingSession,
});

export const NavigationDesktop = connect(mapStateToProps, {
  logout: closeWallet,
})(Navigation);
