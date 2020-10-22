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
import { createNewWallet, startWalletSession } from "shared/actions/wallet";
import { selectIsLoggedIn } from "shared/reducers/walletSession";
import { Redirect } from "react-router";
import Checkbox from "../../../../../../../shared/components/checkbox";

interface CreateProps {
  startWalletSession: (fileName: string | undefined) => void;
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
  confirm_vault_password: string;
  confirm_vault_error: string;
  reveal: boolean;
  action: string;
  checked: boolean;
  disabled: boolean;
}

class CreateWalletWeb extends Component<CreateProps, CreateState> {
  state: CreateState = {
    step: 1,
    error: "",
    verify_seed: "",
    mnemonicString: "",
    action: "Paste Seed",
    reveal: false,
    checked: false,
    disabled: false,
    // Create Vault
    create_vault_name: "",
    create_vault_password: "",
    confirm_vault_password: "",
    confirm_vault_error: "",
  };

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.mnemonicString !== "" && this.state.mnemonicString === "") {
      const seed = this.props.mnemonicString;
      //TODO none will understand this, needs to be refactored once
      this.setState({ mnemonicString: seed, step: 2 });
    }
  }

  nextCreateStep = () => {
    const {
      step,
      mnemonicString,
      verify_seed,
      confirm_vault_password,
      create_vault_password,
    } = this.state;
    const validationSucceed = verify_seed === mnemonicString;
    const passwordConfirmed = confirm_vault_password === create_vault_password;

    switch (step) {
      case 1:
        return this.props.createNewWallet(
          undefined,
          this.state.create_vault_password,
          this.state.create_vault_name
        );
        break;
      case 2:
        return this.setState({ step: step + 1 });
        break;
      case 3:
        return this.setState({ step: step + 1 });
        break;
      case 4:
        return !validationSucceed
          ? this.setState({ error: "Sorry, that seed is incorrect" })
          : this.setState({ step: step + 1 });
        break;
      case 5:
        return passwordConfirmed
          ? this.props.startWalletSession(this.props.walletName)
          : this.setState({
              confirm_vault_error: "Sorry, your password is incorrect",
            });
        break;
      default:
        break;
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

  downloadedFile = () => {
    this.setState({
      checked: !this.state.checked,
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
            <Checkbox
              label="I have downloaded my Vault Key"
              checked={this.state.checked}
              onChange={this.downloadedFile}
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
          <>
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
            <Information>
              Please verify your seed phrase that you received on the previous
              step. This seed phrase can be used to restore your Vault on any
              Haven Wallet. It's crucial that you save this in a safe location
              and do not share it with anyone.
            </Information>
          </>
        );
      case 5:
        return (
          <>
            <Toggle
              label="Confirm Vault Password"
              placeholder="Confirm your Vault password"
              name="confirm_vault_password"
              type={this.state.reveal === true ? "text" : "password"}
              reveal={this.state.reveal}
              value={this.state.confirm_vault_password}
              onChange={this.handleChange}
              onClick={this.showPassword}
              readOnly={false}
              error={this.state.confirm_vault_error}
              width={false}
            />
            <Information>
              Please enter your password to confirm you have saved it correctly.
              Before clicking Submit please ensure that you have saved your
              Vault File in a safe and secure place as you will need it when you
              login next.
            </Information>
          </>
        );
      default:
    }
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/wallet/assets" />;
    }

    const { step, verify_seed } = this.state;

    // Simple method to force the user to confirm they downloaded the seed
    const disabled =
      (step === 4 && verify_seed === "") || (step === 2 && !this.state.checked);
    return (
      <MultiCreate
        link="/"
        route="Login"
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
  startWalletSession,
})(CreateWalletWeb);
