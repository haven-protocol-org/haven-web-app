// Library Imports
import React, { Component } from "react";

// Relative Imports
import MultiCreate from "shared/components/_auth/multi-create";
import Input from "shared/components/_inputs/input";
import Toggle from "shared/components/_inputs/toggle";
import { Information } from "assets/styles/type.js";
import CreateSeed from "shared/components/_create/create_seed";
import VerifySeed from "shared/components/_create/verify_seed";
import { Container } from "../styles";
import InputButton from "shared/components/_inputs/input_button";
import { connect } from "react-redux";
import { selectisRequestingWalletCreation } from "shared/reducers/walletCreation";
import { WebAppState } from "platforms/web/reducers";
import { storeKeyFileToDisk } from "platforms/web/actions/storage";
import {
  createNewWallet,
  mnenomicVerificationSucceed,
  mneomicVerifcationFailed,
} from "shared/actions/wallet";
import { selectIsLoggedIn } from "shared/reducers/walletSession";
import { Redirect } from "react-router";

interface CreateProps {
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

interface CreateState {
  step: number;
  error: string;
  mnemonicString: string;
  verify_seed: string;
  create_vault_name: string;
  create_vault_password: string;
  reveal: boolean;
  action: string;
}

class CreateWalletWeb extends Component<CreateProps, CreateState> {
  state: CreateState = {
    step: 1,
    error: "",
    verify_seed: "",
    mnemonicString: "",
    action: "Paste Seed",
    reveal: false,
    // Create Vault
    create_vault_name: "",
    create_vault_password: "",
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.mnemonicString !== "" && this.state.mnemonicString === "") {
      const seed = this.props.mnemonicString;
      //TODO none will understand this, needs to be refactored once
      this.setState({ mnemonicString: seed, step: 2 });
    }
  }

  nextCreateStep = () => {
    const { step } = this.state;

    if (step === 1) {
      this.props.createNewWallet(
        undefined,
        this.state.create_vault_password,
        this.state.create_vault_name
      );
      return;
    }

    // Until step three incremennt the steps
    if (step < 4) {
      this.setState({ step: step + 1 });
    }

    // On step three, if seed is invalid display error messsage for 2s
    else if (step === 4) {
      const { mnemonicString, verify_seed } = this.state;

      const validationSucceed = verify_seed === mnemonicString;

      validationSucceed
        ? this.props.mnenomicVerificationSucceed(this.props.walletName)
        : this.props.mneomicVerifcationFailed();

      if (!validationSucceed) {
        this.setState({ error: "Sorry, that seed is incorrect" });
        setTimeout(() => {
          this.setState({ error: "" });
        }, 2000);
      }
    }
  };

  prevCreateStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState<never>({
      [name]: value,
    });
  };

  showPassword = () => {
    this.setState({
      reveal: !this.state.reveal,
    });
  };

  onDownLoad = (event: any) => {
    this.props.storeKeyFileToDisk(this.props.walletName);
  };

  handleCreateFlow = () => {
    const windowWidth = window.innerWidth;
    const { step, verify_seed, error } = this.state;

    switch (step) {
      case 1:
        return (
          <>
            <Input
              label="Vault Name"
              placeholder="Create a Vault name"
              name="create_vault_name"
              type="text"
              value={this.state.create_vault_name}
              onChange={this.handleChange}
            />
            <Toggle
              label="Vault Password"
              placeholder="Create a Vault password"
              name="create_vault_password"
              type={this.state.reveal === true ? "text" : "password"}
              reveal={this.state.reveal}
              value={this.state.create_vault_password}
              onChange={this.handleChange}
              onClick={this.showPassword}
              readOnly={false}
              error=""
              width={false}
            />
            <Information>
              A Vault name and password are used to generate a secure Vault
              File. Additionally, you'll also receive a seed phrase so you can
              recover your funds if you lose your Vault File. If you lose your
              Vault File and Seed then your funds are lost forever and
              impossible to recover. Please store them in a safe location when
              prompted to do so.
            </Information>
          </>
        );
      case 2:
        return (
          <>
            <InputButton
              label="Vault File"
              name="Vault File"
              placeholder="Error"
              value={this.props.walletName}
              button={"Save"}
              type="text"
              readOnly={true}
              onClick={this.onDownLoad}
            />
            <Information>
              This is your Vault File and it contains your private keys, seed
              phrase, assets and is encrypted with your password. Using this
              Vault File to login is safer and also prevents you from having to
              resync your vault each time you login. Click Save to store it in a
              safe location.
            </Information>
          </>
        );
      case 3:
        return (
          <CreateSeed
            value={this.state.mnemonicString}
            rows={windowWidth < 600 ? "6" : "4"}
            readOnly={true}
          />
        );
      case 4:
        return (
          <VerifySeed
            label="Verify Seed Phrase"
            name="verify_seed"
            placeholder="Enter your seed"
            value={verify_seed}
            error={error}
            rows={windowWidth < 600 ? "6" : "4"}
            action={this.state.action}
            onChange={this.handleChange}
          />
        );
      default:
    }
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/wallet/assets" />;
    }

    const { step, verify_seed } = this.state;
    const disabled = step === 4 && verify_seed === "";
    return (
      <MultiCreate
        link="/"
        route="Sign In"
        label="Have a Vault?"
        step={step}
        nextStep={this.nextCreateStep}
        prevStep={this.prevCreateStep}
        disabled={disabled}
        loading={this.props.isRequestingLogin}
      >
        {this.handleCreateFlow()}
      </MultiCreate>
    );
  }
}

const mapStateToProps = (state: WebAppState) => ({
  mnemonicString: state.walletCreation.mnemonicKey,
  walletName: state.walletCreation.name,
  isRequestingLogin: selectisRequestingWalletCreation(state),
  isLoggedIn: selectIsLoggedIn(state),
});

export const CreateWalletWebComponent = connect(mapStateToProps, {
  createNewWallet,
  storeKeyFileToDisk,
  mnenomicVerificationSucceed,
  mneomicVerifcationFailed,
})(CreateWalletWeb);
