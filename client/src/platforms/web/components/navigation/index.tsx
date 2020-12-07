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
  Legal,
  Tab,
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
  getStoredWallets: () => void;
  isClosingSession: boolean;
}

class Navigation extends Component<NavigationProps, {}> {
  state = {
    showOptions: false,
    showNotifications: false,
    mouseIsHovering: false,
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
    if (!this.state.mouseIsHovering) {
      this.setState({ showOptions: false }, () => {
        document.removeEventListener("click", this.hideDropdownMenu);
      });
    }
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
    // @ts-ignore
    const { chainHeight, walletHeight } = this.props.chain;
    // @ts-ignore
    const { connected } = this.props;
    const syncStarted = chainHeight !== 0;
    const syncedFinished = syncStarted && chainHeight === walletHeight;

    return (
      <Container>
        <Brand to={auth ? "/wallet/assets" : "/"}>
          <Icon />
          <Haven>HAVEN</Haven>
        </Brand>
        <Menu>
          <Buttons
            isLoading={this.props.isClosingSession}
            auth={this.props.isLoggedIn}
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
                  {NET_TYPE_NAME} v{APP_VERSION}
                </Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Vault Status</Body>
                <Label>{connected ? "Online" : "Offline"}</Label>
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

const mapStateToProps = (state: WebAppState) => ({
  isLoggedIn: selectIsLoggedIn(state),
  chain: state.chain,
  connected: state.walletSession.isWalletConectedToDaemon,
  isClosingSession: state.walletSession.isClosingSession,
});

export const NavigationWeb = connect(mapStateToProps, {
  logout: closeWallet,
})(Navigation);
