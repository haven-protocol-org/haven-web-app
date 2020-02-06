import {
  selectIsLoggedIn,
  selectIsRequestingLogin
} from "../../../reducers/account";
import { connect } from "react-redux";
import {
  createWallet,
  mnenomicVerificationSucceed,
  mneomicVerifcationFailed
} from "../../../actions";
import { Component } from "react";
import React from "react";
import { Redirect } from "react-router";
import { CreateWebComponent } from "../../../../../shared/pages/_auth/create";

class CreateWebContainer extends Component {


  verifySeed = (typedSeed) => {
    const verified = typedSeed === this.props.mnemonicString;
    verified
      ? this.props.mnenomicVerificationSucceed()
      : this.props.mneomicVerifcationFailed();
    return verified;
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/wallet/assets" />;
    }

    return (
      <CreateWebComponent
        verifySeed={this.verifySeed}
        isRequestingLogin={this.props.isRequestingLogin}
        getSeed={this.props.getSeed}
        createdSeed={this.props.mnemonicString}
      />
    );
  }
}

const mapStateToProps = state => ({
  mnemonicString: state.keys.mnemonic_string,
  isLoggedIn: selectIsLoggedIn(state),
  isRequestingLogin: selectIsRequestingLogin(state)
});

export const CreateWeb = connect(
  mapStateToProps,
  {
    getSeed: createWallet,
    mnenomicVerificationSucceed,
    mneomicVerifcationFailed
  }
)(CreateWebContainer);
