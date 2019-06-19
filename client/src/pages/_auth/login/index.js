// Library Imports
import React, { Component } from "react";
import history from "../../../history.js";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';


// Relative Imports
import { Container } from "./styles";
import Auth from "../../../components/_auth/login";
import Description from "../../../components/_inputs/description";
import { Information } from "../../../constants/type.js";
import {IN_SESSION} from "../../../reducers/appState";
import { restoreWallet } from "../../../actions";


// const seed_testnet.txt =
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
    const { seed_phrase } = this.state;
    this.props.login(seed_phrase);
  };

  render() {

    if (this.props.session === IN_SESSION) {
      return <Redirect to='/wallet/assets'/>
    }


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
          onClick={() => this.handleLogin()}
          loading={loading}
          information="Before entering your seed phrase please ensure you’re not on a public
        or unsecured wifi connection."
          submit="Submit"
        >
          <Description
            label="Seed Phrase"
            placeholder="Enter your 25 word seed phrase..."
            name="seed_phrase"
            value={seed_phrase}
            error={error}
            onChange={(event) => this.handleChange(event)}
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
  session: state.appState.session
});

export default connect(
  mapStateToProps,
  { login: restoreWallet }
)(Login);
