// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
// Relative Imports
import {
  Arr,
  Arrow,
  Brand,
  Container,
  Haven,
  Icon,
  Menu,
  Options,
  OptionsIcon,
  OptionsList,
  OptionsSVG,
  Legal,
  Scan,
} from "./styles";

import { Body, Label } from "assets/styles/type";
import { closeWallet } from "shared/actions/walletSession";
import { selectIsLoggedIn } from "../../../../shared/reducers/walletSession";
import { getNetworkByName, NET_TYPE_NAME } from "constants/env";
import { DesktopAppState } from "../../reducers";
import { LocalNode, SelectedNode } from "platforms/desktop/types";
import { selectisLocalNode } from "platforms/desktop/reducers/selectedNode";
import { selectBlockHeight } from "shared/reducers/chain";
import { SyncState } from "shared/types/types.js";
import { syncFromFirstIncomingTx, rescanSpent } from "shared/actions/refresh";

// Local files
import Buttons from "./buttons";
import Cell from "./cell";
import Link from "./link";
import Tab from "./tab";

import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";

interface NavigationProps {
  node: SelectedNode;
  isLoggedIn: boolean;
  height: number;
  isLocalNode: boolean;
  show_networks: boolean;
  logout: (isWeb: boolean) => void;
  chain: any;
  isClosingSession: boolean;
  basicActive: boolean;
  advancedActive: boolean;
  startedResync: boolean;
  showModal: (modalType: MODAL_TYPE) => void;
  syncState: SyncState;
  connected: boolean;
  restoreHeight: number;
}

class Navigation extends Component<NavigationProps, any> {
  state = {
    current_network: getNetworkByName(),
    showOptions: false,
    showNotifications: false,
    mouseIsHovering: false,
    basicActive: true,
    advancedActive: false,
    startedResync: false,
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
    this.props.logout(true);
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
    const { current_network } = this.state;
    const { node, connected, restoreHeight } = this.props;

    // @ts-ignore
    const { chainHeight, walletHeight } = this.props.chain;
    const syncStarted = chainHeight !== 0;
    const syncedFinished = syncStarted && chainHeight === walletHeight;

    const version = window.havenProcess.appVersion;

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

              {!auth && (
                <>
                  <Cell
                    body="Network"
                    label={
                      current_network === "testnet"
                        ? `Testnet v${version}`
                        : `Mainnet v${version}`
                    }
                  />
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
                      <Cell
                        body="Network"
                        label={
                          current_network === "testnet"
                            ? `Testnet v${version}`
                            : `Mainnet v${version}`
                        }
                      />
                      {!syncStarted ? (
                        <>
                          <Cell body="Vault Status" label="Synced" />
                        </>
                      ) : (
                        <Cell
                          body="Sync Status"
                          label={
                            walletHeight === chainHeight
                              ? "Synced"
                              : walletHeight + "/" + chainHeight
                          }
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
                      <Cell body="Block Height" label={chainHeight} />
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

const mapStateToProps = (state: DesktopAppState) => ({
  isLoggedIn: selectIsLoggedIn(state),
  node: state.connectedNode,
  isLocalNode: selectisLocalNode(state.connectedNode),
  height: selectBlockHeight(state),
  chain: state.chain,
  isClosingSession: state.walletSession.isClosingSession,
  connected: state.connectedNode.isWalletConectedToDaemon,
  restoreHeight: state.walletSession.restoreHeight,
});

export const NavigationDesktop = connect(mapStateToProps, {
  logout: closeWallet,
  syncFromFirstIncomingTx,
  rescanSpent,
  showModal,
})(Navigation);
