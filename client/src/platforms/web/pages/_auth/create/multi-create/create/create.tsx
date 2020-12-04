// Library Imports
import React, { Component } from "react";

// Relative Imports
import MultiCreate from "shared/components/_auth/multi-create";
import Input from "shared/components/_inputs/input";
import Toggle from "shared/components/_inputs/toggle";
import { Information } from "assets/styles/type.js";
import CreateSeed from "shared/components/_create/create_seed";
import VerifySeed from "shared/components/_create/verify_seed";
import InputButton from "shared/components/_inputs/input_button";
import { connect } from "react-redux";
import { selectisRequestingWalletCreation } from "shared/reducers/walletCreation";
import { WebAppState } from "platforms/web/reducers";
import { storeKeyFileToDisk } from "platforms/web/actions/storage";
import { createNewWallet, startWalletSession } from "shared/actions/wallet";
import { selectIsLoggedIn } from "shared/reducers/walletSession";
import { Redirect } from "react-router";
import Checkbox from "shared/components/checkbox";

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
              confirm_vault_error: "Password doesn't match",
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
              placeholder="Create a vault name"
              name="create_vault_name"
              type="text"
              value={this.state.create_vault_name}
              onChange={this.handleChange}
            />
            <Toggle
              label="Vault Password"
              placeholder="Enter a password"
              name="create_vault_password"
              type={this.state.reveal === true ? "text" : "password"}
              reveal={this.state.reveal}
              value={this.state.create_vault_password}
              onChange={this.handleChange}
              onClick={this.showPassword}
              readOnly={false}
              error=""
              width={undefined}
            />

            <Information>
              Enter a unique name and strong password to create a vault. You
              will be asked to confirm this password on the final step. This
              process will generate an encrypted vault file that enables you to
              store, send and convert assets in complete privacy.
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
              label="I have saved my vault file to my device"
              checked={this.state.checked}
              onChange={this.downloadedFile}
            />

            <Information>
              A vault file uses military grade encryption to secure your assets.
              Store this file in a safe location. To avoid permanent loss of
              assets, never share your seed phrase, vault file or password with
              anyone.
            </Information>
          </>
        );
      case 3:
        return (
          <>
            <CreateSeed
              label="Seed Phrase"
              value={this.state.mnemonicString}
              rows={windowWidth < 600 ? "6" : "4"}
              readOnly={true}
            />
            <Information>
              A seed phrase provides full access to your account. It can be used
              to generate new vault files or login directly. If you lose this
              seed phrase then it’s impossible to recover your funds. Store it
              in a reputable password manager or on a piece of paper. Do not
              share it with anyone.
            </Information>
          </>
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
              Re-enter the seed phrase that was provided on the previous step.
              As a reminder, if you lose both your vault file and password or
              seed phrase then your funds are lost forever with no possibility
              of being recovered. Store them in a safe and secure location.
            </Information>
          </>
        );
      case 5:
        return (
          <>
            <Toggle
              label="Confirm Vault Password"
              placeholder="Confirm password"
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
              Re-enter the password you used to create this vault file. If you
              have forgotten it, please start again. Access to a vault requires
              both the vault file and valid password.
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

    const {
      step,
      verify_seed,
      create_vault_name,
      create_vault_password,
    } = this.state;

    // Simple method to force the user to confirm they downloaded the seed
    const disabled =
      (step === 1 && create_vault_name === "") ||
      create_vault_password === "" ||
      (step === 2 && !this.state.checked) ||
      (step === 4 && verify_seed === "");
    return (
      <MultiCreate
        link="/login"
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
