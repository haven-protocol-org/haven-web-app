import { selectIsLoggedIn } from "shared/reducers/walletSession";
import { connect } from "react-redux";
import {
  createNewWallet,
  mnenomicVerificationSucceed,
  mneomicVerifcationFailed,
} from "shared/actions/wallet";
import { Component } from "react";
import React from "react";
import { Redirect } from "react-router";
import { CreateWebComponent } from "../../../../../shared/pages/_auth/multi-create";
import { WebAppState } from "platforms/web/reducers";
import { selectisRequestingWalletCreation } from "shared/reducers/walletCreation";

interface CreateWebProps {
  mnenomicVerificationSucceed: (fileName: string) => void;
  mneomicVerifcationFailed: () => void;
  isLoggedIn: boolean;
  mnemonicString: string;
  getSeed: (fileName: string, password: string) => void;
  isRequestingLogin: boolean;
}

class CreateWebContainer extends Component<CreateWebProps, {}> {
  verifySeed = (verified: boolean) => {
    verified
      ? this.props.mnenomicVerificationSucceed("placeholder")
      : this.props.mneomicVerifcationFailed();
  };

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

const mapStateToProps = (state: WebAppState) => ({
  mnemonicString: state.walletCreation.mnemonicKey,
  isLoggedIn: selectIsLoggedIn(state),
  isRequestingLogin: selectisRequestingWalletCreation(state),
});

export const CreateWeb = connect(mapStateToProps, {
  getSeed: createNewWallet,
  mnenomicVerificationSucceed,
  mneomicVerifcationFailed,
})(CreateWebContainer);
