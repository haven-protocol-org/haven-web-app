// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Container } from "./styles";
import Auth from "../../../../../../shared/components/_auth/login";
import Toggle from "../../../../../../shared/components/_inputs/toggle";
import Seed from "../../../../../../shared/components/_inputs/seed";
import { Information } from "../../../../../../assets/styles/type.js";
import InputUpload from "../../../../../../shared/components/_inputs/input_upload/index.js";
import { generatePW } from "utility/utility-encrypt";

interface LoginProps {
  errorMessageLogin: string;
  errorMessageCreation: string;
  isWalletCreated: boolean;
  isRequestingWalletCreation: boolean;
  loginByMnemomic: (
    path: string | undefined,
    seed: string,
    pw: string,
    walletName: string | undefined
  ) => void;
  loginByKeysData: (keysData: Uint8Array, pw: string, fileName: string) => void;
  startWalletSession: (fileName: string | undefined) => void;
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

  componentDidUpdate(
    prevProps: Readonly<LoginProps>,
    prevState: Readonly<LoginState>,
    snapshot?: any
  ): void {
    if (prevProps.errorMessageLogin === "" && this.props.errorMessageLogin) {
      this.setState({ error: this.props.errorMessageLogin });
      setTimeout(() => this.setState({ error: "" }), 2000);
    }
    if (
      prevProps.errorMessageCreation === "" &&
      this.props.errorMessageCreation
    ) {
      this.setState({ error: this.props.errorMessageCreation });
      setTimeout(() => this.setState({ error: "" }), 2000);
    }

    if (prevProps.isWalletCreated === false && this.props.isWalletCreated) {
      this.props.startWalletSession(undefined);
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
      fileName,
      password,
      selectKeystore,
    } = this.state;
    if (selectKeystore) {
      this.props.loginByKeysData(keyData, password, fileName);
    } else {
      const randomPW = generatePW(54);
      this.props.loginByMnemomic(undefined, seed_phrase, randomPW, undefined);
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

          let fileName: string = filesUploaded[0].name;
          fileName = fileName.replace(".keys", "");

          this.setState({
            keyData: keyFileData,
            fileName,
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
      this.props.isRequestingWalletCreation ||
      (selectSeed && seed_phrase === "") ||
      (selectKeystore && (fileName === "" || password === ""));

    return (
      <Container>
        <Auth
          title={this.state.selectKeystore ? "Vault Login" : "Seed Login"}
          description={"Privately store, exchange and transfer assets"}
          link="/create"
          route="Create or Restore"
          label="Need a Vault?"
          disable={isLoginDisabled}
          onClick={() => this.handleLogin()}
          loading={
            this.props.isRequestingLogin ||
            this.props.isRequestingWalletCreation
          }
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
                You can login here with your seed phrase, however Haven
                recommends using a vault file, as it’s encrypted and requires a
                password. The seed phrase is intended as a backup, for when you
                no longer possess a vault file. If you need a new vault file,
                click the “Restore” button below.
              </Information>
            </>
          ) : (
            <>
              <InputUpload
                label="Vault File"
                value={
                  this.state.fileName === ""
                    ? "Select vault file"
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
              {/* @ts-ignore */}
              <Toggle
                label="Vault Password"
                placeholder="Enter password"
                name="password"
                value={password}
                error={error}
                onChange={(event: React.FormEvent<HTMLInputElement>) =>
                  this.handleChange(event)
                }
                onClick={this.showPassword}
                reveal={this.state.reveal}
              />
              <Information>
                Select your vault file and enter your password. If you are new
                to Haven and want to start storing, sending and converting
                assets in complete privacy, then click the "Create" button to
                get started.
              </Information>
            </>
          )}
        </Auth>
      </Container>
    );
  }
}
