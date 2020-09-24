// Library Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
// Relative Imports
import { Container } from "./styles";
import Auth from "../../../components/_auth/login";
import FileUpload from "../../../components/_inputs/file-upload";
import Toggle from "../../../components/_inputs/toggle";
import Seed from "../../../components/_inputs/seed";
import { Information } from "../../../../assets/styles/type.js";
import { readText } from "../../../../vendor/clipboard/clipboard-polyfill";

export default class Login extends Component {
  state = {
    seed_phrase: "",
    error: "",
    action: "Paste from Clipboard",
    vault_file: "",
    selectSeed: false,
    selectKeystore: true,
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
    const { seed_phrase, error, action, selectSeed, vault_file } = this.state;

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
                Haven recommends logging in with a Vault File, not a Seed Phrase
                as it's more secure. While your Seed is <strong>never</strong>{" "}
                sent across the internet, your Vault will need to resync every
                time you login, providing a degraded experience.
              </Information>
            </>
          ) : (
            <>
              <Toggle
                label="Vault Password"
                placeholder="Enter vault password"
                name="vault_file"
                value={vault_file}
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
                A Vault File is more secure then a Seed Phrase because it's an
                encrypted file that requires a password. In addition, it
                prevents your wallet from resyncing every login, providing a
                smoother experience. If you don't have Vault File please restore
                a vault with your seed to generate one.
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
