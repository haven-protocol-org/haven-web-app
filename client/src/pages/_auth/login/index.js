// Library Imports
import React, { Component } from "react";
import history from "../../../history.js";
import { connect } from "react-redux";
import { currentUser } from "../../../actions";

// Relative Imports
import { Container } from "./styles";
import Auth from "../../../components/_auth/login";
import Description from "../../../components/_inputs/description";
import { Information } from "../../../constants/type.js";
import RPC from "../../../components/rpc";

// const seed =
//   "whip cactus theme clever relief category crucial decorate ghost veteran owner exile essay turkey spawn transfer potato island add forward script donor marriage choose";

class Login extends Component {
  state = {
    auth: "",
    loading: false,
    seed_phrase: "",
    error: ""
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleLogin = () => {
    // Deconstruct state
    // const { seed_phrase } = this.state;

    // NEAC - parameters to configure for a call to the backend RPC code
    var strMethod = "restore_deterministic_wallet";
    var objParams = {
        seed: this.state.seed_phrase,
        seed_offset: "",
        language: "English"
    };

    RPC.call_rpc(strMethod, objParams)
      .then(
        function(objResponse) {
          if (objResponse.hasOwnProperty("result")) {
            this.setState({
              loading: true
            });

            const user = {
              auth: true,
              address: objResponse.address,
              seedPhrase: objResponse.seed,
              privateKey:
                "df008d3b68990dcf4b7c7ee2876b076e962780ed3d1d3cb01e57c5c9913222b1",
              spendKey:
                "8ac0f2094ed292a5ca0bd65055475b182e33e09b4017d67b2a817f88a831b52e",
              viewKey:
                "dcbce83bf1ac67579757b080a9bc096e487e2a039086b1e2caeffca9ae1a3862"
            };

            history.push("/wallet/assets");
            // Also push true into Redux for App.js to use
            this.props.currentUser(user);
          } else if (objResponse.hasOwnProperty("error")) {
            throw new Error(objResponse.error);
          } else {
            throw new Error("unknown error occurred");
          }
        }.bind(this)
      )
      .catch(
        function(myError) {
          this.setState({ error: myError.message });
          setTimeout(() => {
            this.setState({ error: "" });
          }, 2000);
        }.bind(this)
      );

    // NEAC - commented out the following code, because it needs to wait for the async response from the backend RPC code
    /*
    // If invalid set an error state for 2 seconds
    if (valid === false) {
      this.setState({ error: "Sorry, that seed is incorrect" });
      setTimeout(() => {
        this.setState({ error: "" });
      }, 2000);
    } else if (valid === true) {
      // If valid then set the state to loading and auth to true

      this.setState({
        loading: true
      });

      const user = {
        auth: true,
        seedPhrase:
          "5b9b3c29734c60540d551eab0e7daa9b24cdf4be845f6cb8b457fc047deffe6a",
        privateKey:
          "df008d3b68990dcf4b7c7ee2876b076e962780ed3d1d3cb01e57c5c9913222b1",
        spendKey:
          "8ac0f2094ed292a5ca0bd65055475b182e33e09b4017d67b2a817f88a831b52e",
        viewKey:
          "dcbce83bf1ac67579757b080a9bc096e487e2a039086b1e2caeffca9ae1a3862"
      };

      // After 2.5s redirect the user. This is to simulate aysnc request
      setTimeout(() => {
        history.push("/wallet/assets");
        // Also push true into Redux for App.js to use
        this.props.currentUser(user);
      }, 2500);
    }
*/
  };

  render() {
    const { seed_phrase, error, loading } = this.state;

    return (
      <Container>
        <Auth
          title="Vault Login"
          description="To access your vault please enter your seed phrase"
          link="/wallet/create"
          route="Create a Vault"
          label="Don’t have a Vault?"
          disable={this.state.loading}
          onClick={this.handleLogin}
          loading={loading}
          information="Before entering your seed phrase please ensure you’re not on a public
        or unsecured wifi connection."
          submit="Submit"
        >
          <Description
            label="Seed Phrase"
            placeholder="Enter your 24 word seed phrase..."
            name="seed_phrase"
            value={seed_phrase}
            error={error}
            onChange={this.handleChange}
          />
          <Information>
            Before entering your Seed Phrase please ensure you're not on a
            public wifi and no one is looking at your screen.
          </Information>
        </Auth>
      </Container>
    );
  }
}

export const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { currentUser }
)(Login);
