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
  Options,
  Menu,
} from "./styles";
import Icon from "assets/haven.svg";
import { closeWallet } from "../../actions";
import { selectIsLoggedIn } from "../../reducers/walletSession";
import { getNetworkByName, isDevMode, NET_TYPE_NAME } from "constants/env";
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
    show_networks: false,
    current_network: getNetworkByName(),
  };

  onComponentDidMount() {
    this.setState({
      current_network: NET_TYPE_NAME,
    });
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const auth = this.props.isLoggedIn;
    const { show_networks, current_network } = this.state;
    const { wallet, node, isLocalNode } = this.props;
    return (
      <Container>
        <Brand>
          <Logo src={Icon} />
          <Haven>HAVEN</Haven>

          <NetworkStatus>
            <Wrapper show_networks={show_networks}>
              <Row>
                <Tag>
                  {current_network} <Refresh />
                </Tag>
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
          <Options />
        </Menu>
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
