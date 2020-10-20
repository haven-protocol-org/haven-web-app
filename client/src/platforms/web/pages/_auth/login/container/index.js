import {
  selectErrorMessageForLogin,
  selectIsLoggedIn,
  selectIsRequestingLogin,
} from "shared/reducers/walletSession";
import { connect } from "react-redux";
import {
  restoreWalletByMnemomic,
  openWalletByData,
  startWalletSession,
} from "shared/actions/wallet";
import Login from "../component";
import { Redirect } from "react-router";
import React, { Component } from "react";
import {
  selectisRequestingWalletCreation,
  selectIsWalletCreated,
  selectErrorMessageForWalletCreation,
} from "shared/reducers/walletCreation";

class LoginWebContainer extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/wallet/assets" />;
    }

    return (
      <Login
        isRequestingLogin={this.props.isRequestingLogin}
        isRequestingWalletCreation={this.props.isRequestingWalletCreation}
        isWalletCreated={this.props.isWalletCreated}
        errorMessageLogin={this.props.errorMessageLogin}
        errorMessageCreation={this.props.errorMessageCreation}
        loginByMnemomic={this.props.loginByMnemomic}
        loginByKeysData={this.props.loginByKeysData}
        startWalletSession={this.props.startWalletSession}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isWalletCreated: selectIsWalletCreated(state),
  isRequestingLogin: selectIsRequestingLogin(state),
  isRequestingWalletCreation: selectisRequestingWalletCreation(state),
  isLoggedIn: selectIsLoggedIn(state),
  errorMessageLogin: selectErrorMessageForLogin(state),
  errorMessageCreation: selectErrorMessageForWalletCreation(state),
});

export const LoginWeb = connect(mapStateToProps, {
  loginByMnemomic: restoreWalletByMnemomic,
  loginByKeysData: openWalletByData,
  startWalletSession,
})(LoginWebContainer);
