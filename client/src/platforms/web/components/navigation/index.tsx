// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports
import {
  Container,
  Haven,
  Brand,
  Icon,
  Menu,
  Options,
  OptionsIcon,
  OptionsList,
  OptionsSVG,
  Arr,
  Scan,
  Arrow,
} from "./styles.js";

import Buttons from "./buttons/index.js";
import { closeWallet } from "shared/actions/wallet";
import { syncFromFirstIncomingTx, rescanSpent } from "shared/actions/refresh";
import { selectIsLoggedIn } from "shared/reducers/walletSession";
import { APP_VERSION, NET_TYPE_NAME } from "constants/env";
import { WebAppState } from "platforms/web/reducers/index.js";
import { selectSyncState } from "shared/reducers/chain";
import { SyncState } from "shared/types/types.js";
import { HavenAppState } from "platforms/desktop/reducers/index.js";
import { Spinner } from "../../../../shared/components/spinner/index.js";

import Cell from "./cell";
import Link from "./link";
import Tab from "./tab";

interface NavigationProps {
  isLoggedIn: boolean;
  auth: boolean;
  logout: (isWeb: boolean) => void;
  getStoredWallets: () => void;
  syncFromFirstIncomingTx: () => void;
  rescanSpent: () => void;
  isClosingSession: boolean;
  syncState: SyncState;
  basicActive: boolean;
  advancedActive: boolean;
  restoreHeight: number;
  startedResync: boolean;
}

class Navigation extends Component<NavigationProps, {}> {
  state = {
    showOptions: false,
    showNotifications: false,
    mouseIsHovering: false,
    basicActive: true,
    advancedActive: false,
    startedResync: false,
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

  selectBasic = () => {
    this.setState({
      basicActive: true,
      advancedActive: false,
    });
  };

  selectAdvanced = () => {
    this.setState({
      basicActive: false,
      advancedActive: true,
    });
  };

  refreshVault = (e: any) => {
    this.setState({
      startedResync: true,
    });

    // this.handleRefreshRequest(e);
  };

  render() {
    const auth = this.props.isLoggedIn;
    // @ts-ignore
    const { connected } = this.props;
    const { blockHeight, scannedHeight, isSyncing } = this.props.syncState;
    const networkLabel = `${NET_TYPE_NAME}  v${APP_VERSION}`;
    console.log("RESYNCING", this.state.startedResync);

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
              {!auth && (
                <>
                  <Cell body="Network" label={networkLabel} />
                  <Link
                    body="Help"
                    label="Knowledge Base"
                    url={`https://havenprotocol.org/knowledge`}
                  />
                  <Link
                    body="Legal"
                    label="Terms"
                    url={`https://havenprotocol.org/legal`}
                  />
                </>
              )}

              {auth && (
                <>
                  <Tab
                    basicActive={this.state.basicActive}
                    basicSelect={this.selectBasic}
                    advancedSelect={this.selectAdvanced}
                    advancedActive={this.state.advancedActive}
                  />

                  {this.state.basicActive ? (
                    <>
                      <Cell body="Network" label={networkLabel} />
                      {!isSyncing ? (
                        <>
                          <Cell body="Vault Synced" label="Yes" />
                        </>
                      ) : (
                        <Cell body="Vault Height" label={scannedHeight} />
                      )}
                      <Link
                        body="Help"
                        label="Knowledge Base"
                        url={`https://havenprotocol.org/knowledge`}
                      />
                      <Link
                        body="Legal"
                        label="Terms"
                        url={`https://havenprotocol.org/legal`}
                      />
                    </>
                  ) : (
                    <>
                      <Cell
                        body="Vault Status"
                        label={connected ? "Online" : "Offline"}
                      />
                      <Cell body="Block Height" label={blockHeight} />
                      <Cell
                        body="Refresh Height"
                        label={this.props.restoreHeight}
                      />

                      <Scan onClick={(e: any) => this.refreshVault(e)}>
                        {this.state.startedResync ? (
                          <Spinner />
                        ) : (
                          "Refresh Vault"
                        )}
                      </Scan>
                      {/*<Scan onClick={(e: any) => this.refreshVault(e)}>
                        Refresh Vault
                      </Scan>*/}
                    </>
                  )}
                </>
              )}
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
  connected: state.connectedNode.isWalletConectedToDaemon,
  isClosingSession: state.walletSession.isClosingSession,
  restoreHeight: state.walletSession.restoreHeight,
});

export const NavigationWeb = connect(mapStateToProps, {
  logout: closeWallet,
  syncFromFirstIncomingTx,
  rescanSpent,
})(Navigation);
