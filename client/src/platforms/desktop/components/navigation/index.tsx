// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports
import {
  Container,
  Haven,
  Logo,
  Brand,
  Button,
  Logout,
  Tag,
  Dropdown,
  State,
  Chevron,
  Wrapper,
  Network,
  Row,
  NetworkStatus
} from "./styles";
import Icon from "assets/haven.svg";
import { closeWallet } from "../../actions";
import { selectIsLoggedIn } from "../../reducers/walletSession";
import { NET_TYPE_NAME } from "constants/env";
import { DesktopAppState } from "../../reducers";
import { DaemonStates } from "../../reducers/daemonStates";
import dropdown from "../../../../assets/icons/dropdown.svg";
import Arrow from "../../../../assets/icons/chevron.js";

interface NavigationProps {
  daemonStates: DaemonStates;
  isLoggedIn: boolean;
  show_networks: boolean;
  logout: () => void;
}

class Navigation extends Component<NavigationProps, any> {
  state = {
    show_networks: false
  };

  handleLogout = () => {
    this.props.logout();
  };

  showNetworks = () => {
    this.setState({
      show_networks: !this.state.show_networks
    });
  };

  render() {
    const auth = this.props.isLoggedIn;
    const { node, wallet } = this.props.daemonStates;
    const { show_networks } = this.state;

    return (
      <Container>
        <Brand to={auth === true ? "/wallet/assets" : "/"}>
          <Logo src={Icon} />
          <Haven>HAVEN</Haven>

          <NetworkStatus>
            <Wrapper onClick={this.showNetworks} show_networks={show_networks}>
              <Row>
                <Tag>{NET_TYPE_NAME}</Tag>
                <Dropdown show_networks={show_networks ? true : false}>
                  <Arrow color="#000" />
                </Dropdown>
              </Row>
              {show_networks && (
                <Network>
                  <Tag>Mainnet</Tag>
                  <Tag>Stagenet</Tag>
                  <Tag>Testnet</Tag>
                </Network>
              )}
            </Wrapper>
            {!wallet.isRunning && (
              <State isActive={wallet.isRunning}>Wallet Offline</State>
            )}
            {!node.isRunning && (
              <State isActive={node.isRunning}>Node Offline</State>
            )}
          </NetworkStatus>
        </Brand>
        {auth === false ? (
          <Button to="/">Login</Button>
        ) : (
          <Logout onClick={this.handleLogout}>Logout</Logout>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  isLoggedIn: selectIsLoggedIn(state),
  daemonStates: state.daemonStates
});

export const NavigationDesktop = connect(
  mapStateToProps,
  { logout: closeWallet }
)(Navigation);
