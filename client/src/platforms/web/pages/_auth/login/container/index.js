import {
  selectErrorMessageForLogin,
  selectIsLoggedIn,
  selectIsRequestingLogin
} from "shared/reducers/walletSession";
import { connect } from "react-redux";
import { restoreWalletByMnemomic, openWalletByData } from "shared/actions/wallet";
import Login from "../component";
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
        loginByMnemomic={this.props.loginByMnemomic}
        loginByKeysData={this.props.loginByKeysData}
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
  { loginByMnemomic: restoreWalletByMnemomic, loginByKeysData: openWalletByData }
)(LoginWebContainer);
