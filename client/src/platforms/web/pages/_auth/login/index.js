import {
  selectErrorMessageForLogin,
  selectIsLoggedIn,
  selectIsRequestingLogin
} from "../../../reducers/account";
import { connect } from "react-redux";
import { restoreWallet } from "../../../actions";
import Login from "../../../../../shared/pages/_auth/login";
import { Redirect } from "react-router";
import React, { Component } from "react";

class LoginWebContainer extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/wallet/assets" />;
    }

    return (
      <Login
        isRequestingLogin={this.props.isRequestingLogin}
        errorMessage={this.props.errorMessage}
        login={this.props.login}
      />
    );
  }
}

const mapStateToProps = state => ({
  isRequestingLogin: selectIsRequestingLogin(state),
  isLoggedIn: selectIsLoggedIn(state),
  errorMessage: selectErrorMessageForLogin(state)
});

export const LoginWeb = connect(
  mapStateToProps,
  { login: restoreWallet }
)(LoginWebContainer);
