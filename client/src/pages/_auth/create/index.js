// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Relative Imports
import Auth from "../../../shared/components/_auth/create/index.js";
import Placeholder from "../../../shared/components/_create/placeholder";
import CreateSeed from "../../../shared/components/_create/create_seed";
import VerifySeed from "../../../shared/components/_create/verify_seed";
import { Container } from "./styles";
import { decrypt } from "../../../utility";
import PropTypes from "prop-types";

export class Create extends Component {
  state = {
    step: 1,
    error: "",
    verify_seed: "",
    mnemonicString: ""
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getSeed();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.mnemonicString !== "" && this.state.mnemonicString === "") {
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
      const validationSucceed =
        this.state.mnemonicString === this.state.verify_seed;

      if (!validationSucceed) {
        this.setState({ error: "Sorry, that seed is incorrect" });

        setTimeout(() => {
          this.setState({ error: "" });
        }, 2000);
      }

      // On step three, if seed is valid, set loading to true and push true to authUser reducer
      if (validationSucceed) {
        this.props.mnenomicVerificationSucceed();
      } else {
        return null;
      }
    }
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleSwitch = () => {
    const windowWidth = window.innerWidth;
    const { step, verify_seed, error } = this.state;

    switch (step) {
      case 1:
        return <Placeholder />;
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
            value={verify_seed}
            error={error}
            rows={windowWidth < 600 ? "6" : "4"}
            onChange={this.handleChange}
          />
        );
      default:
    }
  };

  render() {
    const { step, verify_seed } = this.state;
    const disabled = step === 3 && verify_seed === "";
    return (
      <Container>
        <Auth
          title="Create a Vault"
          link="/login"
          route="Sign In!"
          label="Have a Vault already?"
          submit="Generate"
          step={step}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          disabled={disabled}
          loading={this.props.isRequestingLogin}
        >
          <>{this.handleSwitch()}</>
        </Auth>
      </Container>
    );
  }
}

Create.propTypes = {
  getSeed: PropTypes.func.isRequired,
  isRequestingLogin: PropTypes.bool,
  verifySeed: PropTypes.func.isRequired,
  createdSeed: PropTypes.string.isRequired
};
