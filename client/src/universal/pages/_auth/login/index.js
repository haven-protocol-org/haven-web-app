// Library Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import * as clipboard from "clipboard-polyfill";
// Relative Imports
import { Container } from "./styles";
import Auth from "../../../components/_auth/login";
import Seed from "../../../components/_inputs/seed";
import { Information } from "../../../../assets/styles/type.js";

export default class Login extends Component {
  state = {
    seed_phrase: "",
    error: "",
    action: "Paste from Clipboard"
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

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

  handlePaste = () => {
    clipboard
      .readText()
      .then(response => {
        this.setState({
          seed_phrase: response,
          action: "Pasted from Clipboard"
        });
      })
      .then(
        setTimeout(() => {
          this.setState({
            action: "Paste from Clipboard"
          });
        }, 1000)
      )
      .catch(error => {
        this.setState({
          error: "Clipboard is empty"
        });
      });
  };

  render() {
    const windowWidth = window.innerWidth;
    const { seed_phrase, error, action } = this.state;

    return (
      <Container>
        <Auth
          title="Vault Login"
          link="/create"
          route="Create a Vault"
          label="Don’t have a Vault?"
          disable={seed_phrase === "" ? true : this.props.isRequestingLogin}
          onClick={() => this.handleLogin()}
          loading={this.props.isRequestingLogin}
          submit="Submit"
        >
          <Seed
            label="Seed Phrase or Private Spend Key"
            placeholder="Enter your 25 word seed phrase or Private Spend Key..."
            name="seed_phrase"
            value={seed_phrase}
            error={error}
            actionEvent={this.handlePaste}
            action={action}
            rows={windowWidth < 600 ? "6" : "4"}
            onChange={event => this.handleChange(event)}
          />
          <Information>
            <strong>Disclaimer:</strong> Your seed is used to generate an
            encrypted signature on your device and unlock your account. This
            ensures the security of your seed or keys, as they're never
            submitted to a server or sent across the internet.
          </Information>
        </Auth>
      </Container>
    );
  }
}

Login.propTypes = {
  errorMessage: PropTypes.string,
  login: PropTypes.func.isRequired,
  isRequestingLogin: PropTypes.bool
};
