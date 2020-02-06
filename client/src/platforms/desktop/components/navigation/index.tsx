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
  State
} from "./styles";
import Icon from "assets/haven.svg";
import { closeWallet } from "../../actions";
import { selectIsLoggedIn } from "../../reducers/walletSession";
import { NET_TYPE_NAME } from "constants/env";
import { DesktopAppState } from "../../reducers";
import { DaemonStates } from "../../reducers/daemonStates";

interface NavigationProps {
  daemonStates: DaemonStates;
  isLoggedIn: boolean;
  logout: () => void;
}

class Navigation extends Component<NavigationProps, any> {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const auth = this.props.isLoggedIn;

    const { node, wallet } = this.props.daemonStates;

    return (
      <Container>
        <Brand to={auth === true ? "/wallet/assets" : "/"}>
          <Logo src={Icon} />
          <Haven>HAVEN</Haven>
          <Tag>{NET_TYPE_NAME}</Tag>
          {!wallet.isRunning && (
            <State isActive={wallet.isRunning}>Wallet Offline</State>
          )}
          {!node.isRunning && (
            <State isActive={node.isRunning}>Node Offline</State>
          )}
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
