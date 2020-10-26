// Library Imports
import React, { Component } from "react";

// Relative Imports
import Auth from "../../../components/_auth/multi-create";
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
    selectCreate: true,
    selectRestore: false,
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

  handlePaste = () => {
    readText()
      .then((response) => {
        this.setState({
          verify_seed: response,
          action: "Seed Pasted",
        });
      })
      .then(
        setTimeout(() => {
          this.setState({
            action: "Paste Seed",
          });
        }, 1000)
      )
      .catch((error) => {
        this.setState({
          error: "Clipboard is empty",
        });
      });
  };

  handleSwitch = () => {
    const windowWidth = window.innerWidth;
    const { step, verify_seed, error } = this.state;

    switch (step) {
      case 1:
        return <Placeholder platform={"web"} />;
      case 2:
        return (
          <CreateSeed
            value={this.state.mnemonicString}
            rows={windowWidth < 600 ? "6" : "4"}
            readOnly={true}
          />
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
      selectCreate: true,
      selectRestore: false,
    });
  };

  selectRestore = () => {
    this.setState({
      selectCreate: false,
      selectRestore: true,
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
        <Auth
          title="Create a Vault"
          link="/"
          route="Login"
          label="Have a Vault?"
          submit="Generate"
          step={step}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          disabled={disabled}
          loading={this.props.isRequestingLogin}
          selectCreate={this.selectcreate}
          selectRestore={this.selectRestore}
          selectedCreate={this.state.selectcreate}
          selectedRestore={this.state.selectRestore}
        >
          <>{this.handleSwitch()}</>
        </Auth>
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
