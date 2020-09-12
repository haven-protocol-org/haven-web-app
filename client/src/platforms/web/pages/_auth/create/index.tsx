import {
  selectIsLoggedIn,
  selectIsRequestingLogin
} from "shared/reducers/walletSession";
import { connect } from "react-redux";
import {
  createNewWallet,
  mnenomicVerificationSucceed,
  mneomicVerifcationFailed
} from "shared/actions/wallet";
import { Component } from "react";
import React from "react";
import { Redirect } from "react-router";
import { CreateWebComponent } from "../../../../../shared/pages/_auth/create";
import { WebAppState } from "platforms/web/reducers";

interface CreateWebProps {
  mnenomicVerificationSucceed: (fileName: string) => void,
  mneomicVerifcationFailed:() => void,
  isLoggedIn: boolean,
  mnemonicString: string,
  getSeed:(fileName: string, password: string) => void,
  isRequestingLogin: boolean
}


class CreateWebContainer extends Component<CreateWebProps,{}> {


  verifySeed = (verified: boolean) => {
    verified
      ? this.props.mnenomicVerificationSucceed('placeholder')
      : this.props.mneomicVerifcationFailed();
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

const mapStateToProps = (state: WebAppState ) => ({
  mnemonicString: state.walletCreation.mnemonicKey,
  isLoggedIn: selectIsLoggedIn(state),
  isRequestingLogin: selectIsRequestingLogin(state)
});

export const CreateWeb = connect(
  mapStateToProps,
  {
    getSeed: createNewWallet,
    mnenomicVerificationSucceed,
    mneomicVerifcationFailed
  }
)(CreateWebContainer);
