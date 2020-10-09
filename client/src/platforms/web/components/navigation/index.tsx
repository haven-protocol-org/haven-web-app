// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports
import { Container, Haven, Brand, Logout, Tag, Icon } from "./styles.js";

import { closeWallet } from "shared/actions/closeWallet";
import { selectIsLoggedIn } from "shared/reducers/walletSession";
import { APP_VERSION, NET_TYPE_NAME } from "constants/env";
import { WebAppState } from "platforms/web/reducers/index.js";

interface NavigationProps {
  isLoggedIn: boolean;
  logout: (isWeb: boolean) => void;
  storeKeyFileToDisk: (name: string) => void;
  storeWalletInDB: (name: string) => void;
  getStoredWallets: () => void;
}

class Navigation extends Component<NavigationProps, {}> {
  handleLogout = () => {
    this.props.logout(true);
  };

  render() {
    const auth = this.props.isLoggedIn;

    return (
      <Container>
        <Brand to={auth === true ? "/wallet/assets" : "/"}>
          <Icon />
          <Haven>HAVEN </Haven>
          <Tag>
            v{APP_VERSION} {NET_TYPE_NAME}
          </Tag>
        </Brand>
        {auth === true && <Logout onClick={this.handleLogout}>Logout</Logout>}
      </Container>
    );
  }
}

const mapStateToProps = (state: WebAppState) => ({
  isLoggedIn: selectIsLoggedIn(state),
});

export const NavigationWeb = connect(mapStateToProps, {
  logout: closeWallet,
})(Navigation);
