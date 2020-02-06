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
import { closeWallet } from "../../../../universal/actions";
import { selectIsLoggedIn } from "../../reducers/account";
import { APP_VERSION, NET_TYPE_NAME } from "../../../../constants/env";

class Navigation extends Component {
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
        {auth === false ? (
          <Button to="/login">Login</Button>
        ) : (
          <Logout onClick={this.handleLogout}>Logout</Logout>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state)
});

export const NavigationWeb = connect(
  mapStateToProps,
  { logout: closeWallet }
)(Navigation);
