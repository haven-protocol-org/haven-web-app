// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Relative Imports
import { Container } from "./styles";
import Auth from "../../../components/_auth/login";
import Description from "../../../components/_inputs/description";
import { Information } from "../../../constants/type.js";
// import MultiLogin from "../../../components/_auth/multi_login";

import { restoreWallet } from "../../../actions";
import {
  selectErrorMessageForLogin,
  selectIsLoggedIn,
  selectIsRequestingLogin
} from "../../../reducers/account";

class Login extends Component {
  state = {
    seed_phrase: "",
    error: ""
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.errorMessage) {
      this.setState({ error: nextProps.errorMessage });
      setTimeout(() => this.setState({ error: "" }), 2000);
    }
  }

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
    const windowWidth = window.innerWidth;
    if (this.props.isLoggedIn) {
      return <Redirect to="/wallet/assets" />;
    }

    // <External href="/team">Learn more</External>

    const { seed_phrase, error } = this.state;

    return (
      <Container>
        <Auth
          title="Vault Login"
          description="To access your Vault enter your seed phrase"
          link="/create"
          route="Create a Vault"
          label="Don’t have a Vault?"
          disable={seed_phrase === "" ? true : this.props.isRequestingLogin}
          onClick={() => this.handleLogin()}
          loading={this.props.isRequestingLogin}
          submit="Submit"
        >
          <Description
            label="Seed Phrase or Private Spend Key"
            placeholder="Enter your 25 word seed phrase or Private Spend Key..."
            name="seed_phrase"
            value={seed_phrase}
            error={error}
            rows={windowWidth < 600 ? "6" : "4"}
            onChange={event => this.handleChange(event)}
          />
          <Information>
            Ensure you’re not on a public or unsecured wifi when entering your
            seed.{" "}
            <strong>
              For your security, your seed is encrypted on your device and never
              sent to a server.
            </strong>
          </Information>
        </Auth>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isRequestingLogin: selectIsRequestingLogin(state),
  isLoggedIn: selectIsLoggedIn(state),
  errorMessage: selectErrorMessageForLogin(state)
});

export default connect(
  mapStateToProps,
  { login: restoreWallet }
)(Login);
