// Library Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
// Relative Imports
import { Container } from "./styles";
import Auth from "../../../../../../shared/components/_auth/login";
import Toggle from "../../../../../../shared/components/_inputs/toggle";
import Seed from "../../../../../../shared/components/_inputs/seed";
import { Information } from "../../../../../../assets/styles/type.js";
import InputUpload from "../../../../../../shared/components/_inputs/input_upload/index.js";

interface LoginProps {
  errorMessage: string;
  loginByMnemomic: (seed: string, pw: string) => void;
  loginByKeysData: (
    keysData: Uint8Array,
    walletData: Uint8Array,
    pw: string
  ) => void;
  isRequestingLogin: boolean;
}

interface LoginState {
  seed_phrase: string;
  error: string;
  action: string;
  password: string;
  fileName: string;
  selectSeed: boolean;
  selectKeystore: boolean;
  keyData: Uint8Array;
  walletCache: Uint8Array;
  reveal: boolean;
}

export default class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    seed_phrase: "",
    error: "",
    fileName: "",
    action: "Paste from Clipboard",
    password: "",
    selectSeed: false,
    selectKeystore: true,
    keyData: new Uint8Array([]),
    walletCache: new Uint8Array([]),
    reveal: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(nextProps: { errorMessage: any }, nextContext: any) {
    if (nextProps.errorMessage) {
      this.setState({ error: nextProps.errorMessage });
      setTimeout(() => this.setState({ error: "" }), 2000);
    }
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const element = event.currentTarget as HTMLInputElement;
    const name = element.name;
    const value = element.value;

    //@ts-ignore
    this.setState({
      [name]: value,
    });
  };

  handleLogin = () => {
    // Deconstruct state
    const {
      seed_phrase,
      keyData,
      walletCache,
      password,
      selectKeystore,
    } = this.state;
    if (selectKeystore) {
      this.props.loginByKeysData(keyData, walletCache, password);
    } else {
      this.props.loginByMnemomic(seed_phrase, "secret");
    }
  };

  handlePaste = () => {};

  handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    const filesUploaded = (event.currentTarget as HTMLInputElement).files;

    let keyFileData: Uint8Array = new Uint8Array([]);

    if (filesUploaded && filesUploaded.length > 0) {
      const fileReader = new FileReader();

      fileReader.onloadend = (ev: ProgressEvent<FileReader>) => {
        if (ev.target?.result !== null) {
          const keyFileArrayBuffer: ArrayBuffer = ev.target
            ?.result as ArrayBuffer;
          keyFileData = new Uint8Array(keyFileArrayBuffer);
          this.setState({
            keyData: keyFileData,
            fileName: filesUploaded[0].name,
          });
        }
      };
      fileReader.readAsArrayBuffer(filesUploaded[0]);
    }
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
    const {
      seed_phrase,
      error,
      action,
      selectSeed,
      password,
      fileName,
      selectKeystore,
    } = this.state;

    const isLoginDisabled =
      this.props.isRequestingLogin ||
      (selectSeed && seed_phrase === "") ||
      (selectKeystore && (fileName === "" || password === ""));

    return (
      <Container>
        <Auth
          title="Vault Login"
          link="/create"
          route="Create or Restore"
          label="Need a Vault?"
          disable={isLoginDisabled}
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
              {/* @ts-ignore */}
              <Seed
                label="Seed Phrase"
                placeholder="Enter your 25 word seed phrase.."
                name="seed_phrase"
                value={seed_phrase}
                error={error}
                actionEvent={this.handlePaste}
                action={action}
                rows={windowWidth < 600 ? "6" : "4"}
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  this.handleChange(event)
                }
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
              {/* @ts-ignore */}
              <Toggle
                label="Vault Password"
                placeholder="Enter Vault password"
                name="password"
                value={password}
                error={error}
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  this.handleChange(event)
                }
                onClick={this.showPassword}
                reveal={this.state.reveal}
              />
              <InputUpload
                label="Vault File"
                value={
                  this.state.fileName === ""
                    ? "Select Vault File"
                    : this.state.fileName
                }
                button="Select"
                type="file"
                action="upload"
                onChange={this.handleFileChange}
                /*
                  // @ts-ignore */
                keyStoreFile={this.state.fileName}
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
