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
import {createWallet, restoreWallet} from "../../../actions";
import walletCreation from "../../../reducers/walletCreation";

const seed =
  "whip cactus theme clever relief category crucial decorate ghost veteran owner exile essay turkey spawn transfer potato island add forward script donor marriage choose";

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
      setTimeout(() => {
   /*     const user = {
          auth: true,
          seedPhrase:
            "5b9b3c29734c60540d551eab0e7daa9b24cdf4be845f6cb8b457fc047deffe6a",
          privateKey:
            "df008d3b68990dcf4b7c7ee2876b076e962780ed3d1d3cb01e57c5c9913222b1",
          spendKey:
            "8ac0f2094ed292a5ca0bd65055475b182e33e09b4017d67b2a817f88a831b52e",
          viewKey:
            "dcbce83bf1ac67579757b080a9bc096e487e2a039086b1e2caeffca9ae1a3862"
        };*/

        history.push("/wallet/assets");
      }, 2500);
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
    const { step, seed, verify_seed, error, loading } = this.state;

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
          link="/wallet/login"
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



