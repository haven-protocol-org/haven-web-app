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
import { createWallet } from "../../../actions";

class Create extends Component {
  state = {
    auth: false,
    step: 1,
    error: "",
    verify_seed: "",
    seed: ""
  };

  componentDidMount() {
    this.props.getSeed();
  }

  nextStep = () => {
    const { step, seed, verify_seed } = this.state;
    const valid = seed === verify_seed;
    const stepThree = step === 3;

    // Until step three incremennt the steps
    if (step < 3) {
      this.setState({ step: step + 1 });
    }
    // On step three, if seed_testnet.txt is invalid display error messsage for 2s
    else if (stepThree && !valid) {
      this.setState({ error: "Sorry, that seed is incorrect" });

      setTimeout(() => {
        this.setState({ error: "" });
      }, 2000);
    }
    // On step three, if seed_testnet.txt is valid, set loading to true and push true to authUser reducer
    else if (stepThree && valid) {
      // const auth = true;

      this.setState({
        loading: true
      });
        history.push("/wallet/assets");
    } else {
      return null;
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
        return <CreateSeed value={this.props.wallet.seed} readOnly={true} />;
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
    const { step, loading } = this.state;
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
          loading={loading}
          nextStep={this.nextStep}
          prevStep={this.prevStep}
        >
          <div>{this.handleSwitch()}</div>
        </Auth>
      </Container>
    );
  }
}

export const mapStateToProps = state => ({
  wallet: state.walletCreation
});

export default connect(
  mapStateToProps,
  { getSeed: createWallet }
)(Create);
