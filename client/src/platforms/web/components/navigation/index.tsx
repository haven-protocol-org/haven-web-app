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
import { syncFromFirstIncomingTx, rescanSpent } from "shared/actions/refresh"
import { selectIsLoggedIn } from "shared/reducers/walletSession";
import { APP_VERSION, NET_TYPE_NAME } from "constants/env";
import { WebAppState } from "platforms/web/reducers/index.js";
import { logM } from "utility/utility";
import { selectSyncState } from "shared/reducers/chain";
import { SyncState } from "shared/types/types.js";
import { HavenAppState } from "platforms/desktop/reducers/index.js";

interface NavigationProps {
  isLoggedIn: boolean;
  auth: boolean;
  logout: (isWeb: boolean) => void;
  getStoredWallets: () => void;
  syncFromFirstIncomingTx: () => void;
  rescanSpent:() => void;
  isClosingSession: boolean;
  syncState: SyncState;
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

  handleRefreshRequest = (event: any) => {
    this.props.syncFromFirstIncomingTx();
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
    const { connected } = this.props;
    const { blockHeight, scannedHeight, isSyncing} = this.props.syncState

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
              { auth && (
                <>
              <OptionsDoubleRow>
                <Body>Vault Status</Body>
                <Label>{connected ? "Online" : "Offline"}</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Block Height</Body>
                <Label>{blockHeight}</Label>
              </OptionsDoubleRow>
              
               {!isSyncing ? (
                <>
                <OptionsDoubleRow>
                  <Body>Vault Synced</Body>
                  <Label>Yes</Label>
                </OptionsDoubleRow>
                <OptionsDoubleRow onClick={(e: any) => this.handleRefreshRequest(e)} >
                  <Body >Rescan Wallet</Body>
                  <Label></Label>
                </OptionsDoubleRow>
                </>
              ) : (
                <OptionsDoubleRow>
                  <Body>Vault Height</Body>
                  <Label>{scannedHeight}</Label>
                </OptionsDoubleRow>
              )}
                </>
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
  syncState: selectSyncState(state as HavenAppState),
  connected: state.walletSession.isWalletConectedToDaemon,
  isClosingSession: state.walletSession.isClosingSession,
});

export const NavigationWeb = connect(mapStateToProps, {
  logout: closeWallet, syncFromFirstIncomingTx, rescanSpent
})(Navigation);
