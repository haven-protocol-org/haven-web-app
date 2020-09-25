// Library Imports
import React, { Component } from "react";

// Relative Imports
import MultiCreate from "../../../components/_auth/multi-create";
import Input from "../../../components/_inputs/input";
import Toggle from "../../../components/_inputs/toggle";
import { Information } from "../../../../assets/styles/type.js";

import Placeholder from "../../../components/_create/placeholder";
import CreateSeed from "../../../components/_create/create_seed";
import VerifySeed from "../../../components/_create/verify_seed";
import { Container } from "./styles";
import { decrypt } from "../../../../utility/utility-encrypt";
import PropTypes from "prop-types";
import { readText } from "../../../../vendor/clipboard/clipboard-polyfill";

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

  nextStep = () => {
    const { step } = this.state;
    const stepThree = step === 3;

    // Until step three incremennt the steps
    if (step < 3) {
      this.setState({ step: step + 1 });
    }
    // On step three, if seed is invalid display error messsage for 2s
    else if (stepThree) {
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

  prevStep = () => {
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
    alert("ALET");
    this.setState({
      reveal: !this.state.reveal,
    });
  };

  handleSwitch = () => {
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
              // @ts-ignore
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
            <CreateSeed
              value={this.state.mnemonicString}
              rows={windowWidth < 600 ? "6" : "4"}
              readOnly={true}
            />
          </>
        );
      case 3:
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
    const { step, verify_seed } = this.state;
    const disabled = step === 3 && verify_seed === "";

    return (
      <Container>
        <MultiCreate
          title="Create a Vault"
          link="/"
          route="Sign In!"
          label="Have a Vault?"
          submit="Generate"
          step={step}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          disabled={disabled}
          loading={this.props.isRequestingLogin}
          selectCreate={this.selectCreate}
          selectRestore={this.selectRestore}
          selectedCreate={this.state.selectedCreate}
          selectedRestore={this.state.selectedRestore}
        >
          <>{this.handleSwitch()}</>
        </MultiCreate>
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
