// Library Imports
import React, { Component } from "react";

// Relative Imports
import MultiCreate from "../../../components/_auth/multi-create";
import MultiRestore from "../../../components/_auth/multi-restore";
import Input from "../../../components/_inputs/input";
import Toggle from "../../../components/_inputs/toggle";
import { Information } from "../../../../assets/styles/type.js";
import CreateSeed from "../../../components/_create/create_seed";
import VerifySeed from "../../../components/_create/verify_seed";
import { Container } from "./styles";
import { decrypt } from "../../../../utility/utility-encrypt";
import PropTypes from "prop-types";
import InputDownload from "../../../components/_inputs/input_download";
import testFile from "../../../../assets/whitepapers/wp_english.png";

export class CreateWebComponent extends Component {
  state = {
    step: 1,
    error: "",
    verify_seed: "",
    mnemonicString: "",
    action: "Paste Seed",
    selectedCreate: true,
    selectedRestore: false,
    vault_name: "",
    reveal: false,
    // Create Vault
    create_vault_name: "",
    create_vault_password: "",
    keyStoreFile: testFile,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getSeed(undefined, "secret");
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.createdSeed !== "" && this.state.mnemonicString === "") {
      const seed = await decrypt(this.props.createdSeed);
      this.setState({ mnemonicString: seed });
    }
  }

  nextCreateStep = () => {
    const { step } = this.state;

    // Until step three incremennt the steps
    if (step < 4) {
      this.setState({ step: step + 1 });
    }
    // On step three, if seed is invalid display error messsage for 2s
    else if (step === 4) {
      const { mnemonicString, verify_seed } = this.state;

      const validationSucceed = verify_seed === mnemonicString;
      this.props.verifySeed(validationSucceed);

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

  nextRestoreStep = () => {
    const { step } = this.state;

    // Until step three incremennt the steps
    if (step < 4) {
      this.setState({ step: step + 1 });
    }
    // On step three, if seed is invalid display error messsage for 2s
    else if (step === 4) {
      const { mnemonicString, verify_seed } = this.state;

      const validationSucceed = verify_seed === mnemonicString;
      this.props.verifySeed(validationSucceed);

      if (!validationSucceed) {
        this.setState({ error: "Sorry, that seed is incorrect" });
        setTimeout(() => {
          this.setState({ error: "" });
        }, 2000);
      }
    }
  };

  prevRestoreStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  showPassword = () => {
    this.setState({
      reveal: !this.state.reveal,
    });
  };

  handleFileChange = (event) => {
    const fileUploaded = event.target.files[0];
    this.setState({
      keyStoreFile: fileUploaded.name,
    });
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
              value={this.state.create_vault_name}
              onChange={this.handleChange}
            />
            <Toggle
              label="Vault Password"
              placeholder="Create a Vault password"
              name="create_vault_password"
              button="SHOW"
              type={this.state.reveal === true ? "text" : "password"}
              reveal={this.state.reveal}
              value={this.state.create_vault_password}
              onChange={this.handleChange}
              onClick={this.showPassword}
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
            <InputDownload
              label="Vault File"
              value={this.state.keyStoreFile}
              onChange={this.handleFileChange}
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
            onClick={this.handlePaste}
          />
        );
      default:
    }
  };

  handleRestoreFlow = () => {
    const windowWidth = window.innerWidth;
    const { step, verify_seed, error } = this.state;

    switch (step) {
      case 1:
        return (
          <>
            <VerifySeed
              label="Enter Seed Phrase"
              name="verify_seed"
              placeholder="Enter your 24 word seed phrase"
              value={verify_seed}
              error={error}
              rows={windowWidth < 600 ? "6" : "4"}
              action={this.state.action}
              onChange={this.handleChange}
              onClick={this.handlePaste}
            />
            <Information>
              Please enter the seed phrase you have from a Vault you created
              previously. This is a 24 word phrase that will be used to restore
              your wallet and generate a more secure Vault File that you can use
              to login with in the future.
            </Information>
          </>
        );
      case 2:
        return (
          <>
            <Input
              label="Vault Name"
              placeholder="Create a Vault name"
              name="create_vault_name"
              value={this.state.create_vault_name}
              onChange={this.handleChange}
            />
            <Toggle
              label="Vault Password"
              placeholder="Create a Vault password"
              name="create_vault_password"
              button="show"
              type={this.state.reveal === true ? "text" : "password"}
              reveal={this.state.reveal}
              value={this.state.create_vault_password}
              onChange={this.handleChange}
              onClick={this.showPassword}
            />
            <Information>
              A Vault name and password, in addtion to the seed you entered on
              the previous step are used to generate a secure Vault File. If you
              lose your Vault File and Seed then your funds are lost forever and
              impossible to recover. Please store them in a safe location when
              prompted to do so on the next step.
            </Information>
          </>
        );
      case 3:
        return (
          <>
            <InputDownload
              label="Vault File"
              value={this.state.keyStoreFile}
              onChange={this.handleFileChange}
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
      case 4:
        return (
          <>
            <Toggle
              label="Vault Password"
              placeholder="Create a Vault password"
              name="create_vault_password"
              button="show"
              type={this.state.reveal === true ? "text" : "password"}
              reveal={this.state.reveal}
              value={this.state.create_vault_password}
              onChange={this.handleChange}
              onClick={this.showPassword}
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

  selectCreate = () => {
    this.setState({
      selectedCreate: true,
      selectedRestore: false,
    });
  };

  selectRestore = () => {
    this.setState({
      selectedCreate: false,
      selectedRestore: true,
    });
  };

  showPassword = () => {
    this.setState({
      reveal: !this.state.reveal,
    });
  };

  render() {
    const { step, verify_seed, selectedCreate } = this.state;
    const disabled = step === 4 && verify_seed === "";

    return (
      <Container>
        {selectedCreate ? (
          <MultiCreate
            title="Create a Vault"
            link="/"
            route="Sign In!"
            label="Have a Vault?"
            step={step}
            nextStep={this.nextCreateStep}
            prevStep={this.prevCreateStep}
            disabled={disabled}
            loading={this.props.isRequestingLogin}
            selectCreate={this.selectCreate}
            selectRestore={this.selectRestore}
            selectedCreate={this.state.selectedCreate}
            selectedRestore={this.state.selectedRestore}
          >
            {this.handleCreateFlow()}
          </MultiCreate>
        ) : (
          <MultiRestore
            title="Create a Vault"
            link="/"
            route="Sigin"
            label="Have a Vault?"
            step={step}
            nextStep={this.nextRestoreStep}
            prevStep={this.prevRestoreStep}
            disabled={disabled}
            selectCreate={this.selectCreate}
            selectRestore={this.selectRestore}
            selectedCreate={this.state.selectedCreate}
            selectedRestore={this.state.selectedRestore}
          >
            {this.handleRestoreFlow()}
          </MultiRestore>
        )}
      </Container>
    );
  }
}

CreateWebComponent.propTypes = {
  getSeed: PropTypes.func.isRequired,
  isRequestingLogin: PropTypes.bool,
  verifySeed: PropTypes.func.isRequired,
  createdSeed: PropTypes.any.isRequired,
};
