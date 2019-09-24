// Library Imports
import React, { Component } from "react";
import history from "../../../history.js";
import { connect } from "react-redux";

// Relative Imports
import Auth from "../../../components/_auth/create/index.js";
import Placeholder from "../../../components/_create/placeholder";
import CreateSeed from "../../../components/_create/create_seed";
import VerifySeed from "../../../components/_create/verify_seed";
import { Container } from "./styles";
import {
  createWallet,
  mnenomicVerificationSucceed,
  mneomicVerifcationFailed
} from "../../../actions";
import {Redirect} from "react-router";
import {selectIsLoggedIn} from "../../../reducers/account";

class Create extends Component {
  state = {
    step: 1,
    error: "",
    verify_seed: ""
  };

  componentDidMount() {
    this.props.getSeed();
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
        this.props.mnemonicString === this.state.verify_seed;

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
    const { step, verify_seed, error, loading } = this.state;

    switch (step) {
      case 1:
        return <Placeholder />;
      case 2:
        return (
          <CreateSeed
            value={this.props.mnemonicString}
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
            onChange={this.handleChange}
            loading={loading}
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
    const disabled = (step === 3 && verify_seed === "");
    return (
      <Container>
        <Auth
          title="Create a Vault"
          description="To create a new vault please generate a new seed phrase."
          link="/login"
          route="Sign In!"
          label="Have a Vault already?"
          submit="Generate"
          step={step}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          disabled={disabled}
        >
          <div>{this.handleSwitch()}</div>
        </Auth>
      </Container>
    );
  }
}

export const mapStateToProps = state => ({
  mnemonicString: state.keys.mnemonic_string,
  isLoggedIn:selectIsLoggedIn(state)
});

export default connect(
  mapStateToProps,
  {
    getSeed: createWallet,
    mnenomicVerificationSucceed,
    mneomicVerifcationFailed
  }
)(Create);
