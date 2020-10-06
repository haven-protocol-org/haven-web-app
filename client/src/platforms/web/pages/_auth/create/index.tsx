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
import { storeKeyFileToDisk } from "platforms/web/actions/storage";

interface CreateWebProps {
  mnenomicVerificationSucceed: (fileName: string) => void;
  mneomicVerifcationFailed: () => void;
  isLoggedIn: boolean;
  mnemonicString: string;
  storeKeyFileToDisk: (fileName: string) => void;
  createNewWallet: (
    path: string | undefined,
    password: string,
    walletName: string
  ) => void;
  isRequestingLogin: boolean;
  walletName: string;
}

class CreateWebContainer extends Component<CreateWebProps, {}> {
  verifySeed = (verified: boolean) => {
    verified
      ? this.props.mnenomicVerificationSucceed(this.props.walletName)
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
        createNewWallet={this.props.createNewWallet}
        createdSeed={this.props.mnemonicString}
        walletName={this.props.walletName}
        storeKeyFile={this.props.storeKeyFileToDisk}
      />
    );
  }
}

const mapStateToProps = (state: WebAppState) => ({
  mnemonicString: state.walletCreation.mnemonicKey,
  walletName: state.walletCreation.name,
  isLoggedIn: selectIsLoggedIn(state),
  isRequestingLogin: selectisRequestingWalletCreation(state),
});

export const CreateWeb = connect(mapStateToProps, {
  createNewWallet,
  storeKeyFileToDisk,
  mnenomicVerificationSucceed,
  mneomicVerifcationFailed,
})(CreateWebContainer);
