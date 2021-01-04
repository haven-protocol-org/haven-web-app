// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports
import {
  Container,
  Haven,
  Auth,
  NoAuth,
  Icon,
  Menu,
  Options,
  OptionsIcon,
  OptionsList,
  OptionsSVG,
  Scan,
  Arr,
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

import Cell from "./cell";
import Link from "./link";
import Tab from "./tab";

import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";

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
  showModal: (modalType: MODAL_TYPE) => void;
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

  refreshVault = () => {
    this.props.showModal(MODAL_TYPE.RescanBC);
  };

  render() {
    const auth = this.props.isLoggedIn;
    // @ts-ignore
    const { connected } = this.props;
    const { blockHeight, scannedHeight, isSyncing } = this.props.syncState;
    const networkLabel = `${NET_TYPE_NAME}  v${APP_VERSION}`;

    return (
      <Container>
        {auth ? (
          <Auth to={"/wallet/assets"}>
            <Icon />
            <Haven>HAVEN</Haven>
          </Auth>
        ) : (
          <NoAuth href="https://havenprotocol.org" target="_blank">
            <Icon />
            <Haven>HAVEN</Haven>
          </NoAuth>
        )}
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
                          <Cell body="Vault Status" label="Synced" />
                        </>
                      ) : (
                        <Cell
                          body="Sync Status"
                          label={scannedHeight + "/" + blockHeight}
                        />
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
                        body="Vault Connected"
                        label={connected ? "Yes" : "No"}
                      />
                      <Cell body="Block Height" label={blockHeight} />
                      <Cell
                        body="Refresh Height"
                        label={this.props.restoreHeight}
                      />
                      <Scan onClick={this.refreshVault}>Refresh Vault</Scan>
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
  connected: state.walletSession.isWalletConectedToDaemon,
  isClosingSession: state.walletSession.isClosingSession,
  restoreHeight: state.walletSession.restoreHeight,
});

export const NavigationWeb = connect(mapStateToProps, {
  logout: closeWallet,
  syncFromFirstIncomingTx,
  rescanSpent,
  showModal,
})(Navigation);
