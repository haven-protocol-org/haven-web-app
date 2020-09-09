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
  Tag
} from "./styles.js";
import Icon from "../../../../assets/haven.svg";
import { closeWallet } from "shared/actions";
import { selectIsLoggedIn } from "shared/reducers/walletSession";
import { APP_VERSION, NET_TYPE_NAME } from "constants/env";
import { WebAppState } from "platforms/web/reducers/index.js";


interface NavigationProps {
  isLoggedIn: boolean;
  logout:() => void;
}


class Navigation extends Component<NavigationProps,{}> {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const auth = this.props.isLoggedIn;

    return (
      <Container>
        <Brand to={auth === true ? "/wallet/assets" : "/"}>
          <Logo src={Icon} />
          <Haven>HAVEN </Haven>
          <Tag>
            v{APP_VERSION} {NET_TYPE_NAME}
          </Tag>
        </Brand>
        {auth === true && (
          <Logout onClick={this.handleLogout}>Logout</Logout>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ( state: WebAppState ) => ({
  isLoggedIn: selectIsLoggedIn(state)
});

export const NavigationWeb = connect(
  mapStateToProps,
  { logout: closeWallet }
)(Navigation);
