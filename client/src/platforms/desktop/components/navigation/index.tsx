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
  NetworkStatus,
  Options,
  OptionsDoubleRow,
  OptionsIcon,
  OptionsList,
  State,
  Wrapper,
} from "./styles";
import OptionsSVG from "../../../../assets/icons/options.svg";
import { Body, Label } from "assets/styles/type";

import { closeWallet } from "../../actions";
import { selectIsLoggedIn } from "../../reducers/walletSession";
import {
  APP_VERSION,
  getNetworkByName,
  isDevMode,
  NET_TYPE_NAME,
} from "constants/env";
import { DesktopAppState } from "../../reducers";
import { NodeState } from "platforms/desktop/types";
import { WalletState } from "platforms/desktop/ipc/ipc-types";
import { selectisLocalNode } from "platforms/desktop/reducers/havenNode";
import { ThreeState } from "shared/types/types";

interface NavigationProps {
  wallet: WalletState;
  node: NodeState;
  isLoggedIn: boolean;
  isLocalNode: boolean;
  show_networks: boolean;
  logout: () => void;
}

class Navigation extends Component<NavigationProps, any> {
  state = {
    current_network: getNetworkByName(),
    showOptions: false,
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

  handleLogout = () => {
    this.props.logout();
  };

  showOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions,
    });
  };

  render() {
    const auth = this.props.isLoggedIn;
    const { current_network } = this.state;
    const { wallet, node, isLocalNode } = this.props;

    return (
      <Container>
        <Brand>
          <Icon />
          <Haven>HAVEN</Haven>
          <NetworkStatus>
            <Wrapper></Wrapper>
            {isDevMode() &&
              wallet.isRunning &&
              wallet.isConnectedToDaemon === ThreeState.False && (
                <State isActive={false}>Wallet not connected to a daemon</State>
              )}
            {isDevMode() &&
              wallet.isRunning &&
              wallet.isConnectedToDaemon === ThreeState.True && (
                <State isActive={true}>
                  Wallet connected {isLocalNode ? "local" : "remote"} daemon
                </State>
              )}
          </NetworkStatus>
        </Brand>

        <Menu>
          {auth === false ? (
            <Button to="/">Login</Button>
          ) : (
            <Logout onClick={this.handleLogout}>Logout</Logout>
          )}

          <Options onClick={this.showDropdownMenu}>
            <OptionsIcon src={OptionsSVG} />
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
                <Body>Wallet</Body>
                <Label>{wallet.isRunning ? "Online" : "Offline"}</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Block</Body>
                <Label>{"ADD_BLOCK_NUMBER"}</Label>
              </OptionsDoubleRow>
              <OptionsDoubleRow>
                <Body>Application</Body>
                <Label>v{APP_VERSION}</Label>
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
  wallet: state.walletRPC,
  node: state.havenNode,
  isLocalNode: selectisLocalNode(state.havenNode),
});

export const NavigationDesktop = connect(mapStateToProps, {
  logout: closeWallet,
})(Navigation);
