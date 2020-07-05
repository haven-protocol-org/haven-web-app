// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports
import {
  Container,
  Haven,
  Logo,
  Brand,
  Tag,
  State,
  Wrapper,
  Row,
  NetworkStatus,
  Button,
  Logout,
  Menu,
  Options,
  OptionsList,
  OptionsSingleRow,
  OptionsDoubleRow,
  OptionsIcon,
} from "./styles";
import Icon from "assets/haven.svg";
import OptionsSVG from "../../../../assets/icons/options.svg";
import { Body, Label } from "../../../../assets/styles/type.js";

import { closeWallet } from "../../actions";
import { selectIsLoggedIn } from "../../reducers/walletSession";
import {
  getNetworkByName,
  isDevMode,
  NET_TYPE_NAME,
  APP_VERSION,
} from "constants/env";
import { DesktopAppState } from "../../reducers";
import { Refresh } from "platforms/desktop/components/rescan";
import { NodeState } from "platforms/desktop/types";
import { WalletState } from "platforms/desktop/ipc/ipc-types";
import { selectisLocalNode } from "platforms/desktop/reducers/havenNode";

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
    refreshNetwork: "Refresh Network",
  };

  onComponentDidMount() {
    this.setState({
      current_network: NET_TYPE_NAME,
    });
  }

  handleLogout = () => {
    this.props.logout();
  };

  showOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions,
    });
  };

  refreshNetwork = () => {
    this.setState({
      refreshNetwork: "Refreshing Network...",
    });
    setTimeout(() => {
      this.setState({
        refreshNetwork: "Refresh Network",
      });
    }, 3000);
  };

  render() {
    const auth = this.props.isLoggedIn;
    const { current_network } = this.state;
    const { wallet, node, isLocalNode } = this.props;

    return (
      <Container>
        <Brand>
          <Logo src={Icon} />
          <Haven>HAVEN</Haven>
          <NetworkStatus>
            <Wrapper>
              <Row>
                <Tag>{current_network}</Tag>
              </Row>
            </Wrapper>
            {isDevMode && wallet.isRunning && !wallet.isConnectedToDaemon && (
              <State isActive={false}>Wallet not connected to a daemon</State>
            )}
            {isDevMode && wallet.isRunning && wallet.isConnectedToDaemon && (
              <State isActive={true}>
                Wallet connected to a {isLocalNode ? "local" : "remote"} daemon
              </State>
            )}
            {!wallet.isRunning && (
              <State isActive={wallet.isRunning}>Wallet Offline</State>
            )}
            {!node.isRunning && isLocalNode && (
              <State isActive={node.isRunning}>Node Offline</State>
            )}
          </NetworkStatus>
        </Brand>

        <Menu>
          {auth === false ? (
            <Button to="/">Login</Button>
          ) : (
            <Logout onClick={this.handleLogout}>Logout</Logout>
          )}

          <Options onClick={this.showOptions}>
            <OptionsIcon src={OptionsSVG} />
          </Options>
        </Menu>
        {this.state.showOptions && (
          <OptionsList>
            <OptionsDoubleRow>
              <Body>Network</Body>
              <Label>{current_network}</Label>
            </OptionsDoubleRow>
            <OptionsDoubleRow>
              <Body>Node</Body>
              <Label>{node.location}</Label>
            </OptionsDoubleRow>
            <OptionsDoubleRow>
              <Body>Application</Body>
              <Label>v{APP_VERSION}</Label>
            </OptionsDoubleRow>

            <OptionsSingleRow onClick={this.refreshNetwork}>
              <Body>{this.state.refreshNetwork}</Body>
            </OptionsSingleRow>
          </OptionsList>
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
