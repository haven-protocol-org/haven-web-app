// Library Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
// Relative Imports
import { Container } from "./styles";
import Auth from "../../../components/_auth/login";
import FileUpload from "../../../components/_inputs/file-upload";

import Input from "../../../components/_inputs/input";
import Toggle from "../../../components/_inputs/toggle";
import Seed from "../../../components/_inputs/seed";
import { Information } from "../../../../assets/styles/type.js";
import { readText } from "../../../../vendor/clipboard/clipboard-polyfill";

export default class Login extends Component {
  state = {
    seed_phrase: "",
    error: "",
    action: "Paste from Clipboard",
    key_store: "",
    selectSeed: true,
    selectKeystore: false,
    keyStoreFile: "",
    reveal: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(nextProps, nextContext) {
    if (nextProps.errorMessage) {
      this.setState({ error: nextProps.errorMessage });
      setTimeout(() => this.setState({ error: "" }), 2000);
    }
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleLogin = () => {
    // Deconstruct state
    const { seed_phrase } = this.state;
    this.props.login(seed_phrase, "secret");
  };

  handlePaste = () => {
    readText()
      .then((response) => {
        this.setState({
          seed_phrase: response,
          action: "Pasted from Clipboard",
        });
      })
      .then(
        setTimeout(() => {
          this.setState({
            action: "Paste from Clipboard",
          });
        }, 1000)
      )
      .catch((error) => {
        this.setState({
          error: "Clipboard is empty",
        });
      });
  };

  handleFileChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log("fileUploaded", fileUploaded);
    this.setState({
      keyStoreFile: fileUploaded.name,
    });
  };

  selectSeed = () => {
    this.setState({
      selectSeed: true,
      selectKeystore: false,
    });
  };

  selectKeystore = () => {
    this.setState({
      selectSeed: false,
      selectKeystore: true,
    });
  };

  showPassword = () => {
    this.setState({
      reveal: !this.state.reveal,
    });
  };

  render() {
    const windowWidth = window.innerWidth;
    const { seed_phrase, error, action, selectSeed, key_store } = this.state;

    return (
      <Container>
        <Auth
          title="Vault Login"
          link="/create"
          route="Create or Restore a Vault"
          label="Don’t have a Vault?"
          disable={seed_phrase === "" ? true : this.props.isRequestingLogin}
          onClick={() => this.handleLogin()}
          loading={this.props.isRequestingLogin}
          submit="Submit"
          selectSeed={this.selectSeed}
          selectKeystore={this.selectKeystore}
          selectedSeed={this.state.selectSeed}
          selectedKeystore={this.state.selectKeystore}
        >
          {selectSeed ? (
            <>
              <Seed
                label="Seed Phrase or Private Spend Key"
                placeholder="Enter your 25 word seed phrase or Private Spend Key..."
                name="seed_phrase"
                value={seed_phrase}
                error={error}
                actionEvent={this.handlePaste}
                action={action}
                rows={windowWidth < 600 ? "6" : "4"}
                onChange={(event) => this.handleChange(event)}
              />
              <Information>
                <strong>Disclaimer:</strong> Your seed is used to generate an
                encrypted signature on your device and unlock your account. This
                ensures the security of your seed or keys, as they're never
                submitted to a server or sent across the internet.
              </Information>
            </>
          ) : (
            <>
              <Toggle
                label="Keystore Password"
                placeholder="Enter keystore password"
                name="key_store"
                value={key_store}
                error={error}
                onChange={(event) => this.handleChange(event)}
                onClick={this.showPassword}
                reveal={this.state.reveal}
              />
              <FileUpload
                title="Upload a file"
                onChange={this.handleFileChange}
                keyStoreFile={this.state.keyStoreFile}
              />
              <Information>
                Before entering your Keystore Password please ensure you're not
                on a public wifi and no one is looking at your screen.
              </Information>
            </>
          )}
        </Auth>
      </Container>
    );
  }
}

Login.propTypes = {
  errorMessage: PropTypes.string,
  login: PropTypes.func.isRequired,
  isRequestingLogin: PropTypes.bool,
};
