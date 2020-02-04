// Library Imports
import React, { Component, Fragment } from "react";

// Relative Imports
import Placeholder from "shared/components/_create/placeholder";

import { Body, Buttons, Submit } from "../multi_login/styles";
import CreateSeed from "shared/components/_create/create_seed";
import { createWallet } from "platforms/desktop/actions";
import { DesktopAppState } from "platforms/desktop/reducers";
import { connect } from "react-redux";
import {
  selectErrorMessage,
  WalletCreation
} from "platforms/desktop/reducers/walletCreation";
import { Spinner } from "shared/components/spinner";
import { Information } from "assets/styles/type";
import Description from "shared/components/_inputs/description";
import Input from "shared/components/_inputs/input";
import InputButton from "../../../../../shared/components/_inputs/input_button/index.js";
import { mnenomicVerificationSucceed } from "platforms/desktop/actions";
import { selectIsRequestingLogin } from "platforms/desktop/reducers/walletSession";

interface CreateDesktopProps {
  createWallet: (name: string, pw: string) => void;
  walletCreation: WalletCreation;
  mnenomicVerificationSucceed: (fileName: string) => void;
  loading: boolean;
  errorMessage: string | null;
}

interface CreateDesktopState {
  step: CREATION_STEPS;
  error: string;
  fileName: string;
  pw: string;
  verify_seed: string;
  showPassword: boolean;
  wordsToVerify: SeedVerification[];
}

type SeedVerification = { index: number; word: string };

enum CREATION_STEPS {
  Info,
  Credentials,
  Seed,
  Verification
}

class CreateDesktopContainer extends Component<
  CreateDesktopProps,
  CreateDesktopState
> {
  state: CreateDesktopState = {
    step: CREATION_STEPS.Info,
    error: "",
    verify_seed: "",
    fileName: "",
    pw: "",
    showPassword: false,
    wordsToVerify: []
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate(
    prevProps: Readonly<CreateDesktopProps>,
    prevState: Readonly<CreateDesktopState>,
    snapshot?: any
  ): void {
    if (
      prevProps.walletCreation.isCreated === false &&
      this.props.walletCreation.isCreated &&
      this.state.step === CREATION_STEPS.Credentials
    ) {
      this.setState({ step: CREATION_STEPS.Seed });

      const indexes: number[] = [];
      while (indexes.length < 3) {
        var r = Math.floor(Math.random() * 25);
        if (indexes.indexOf(r) === -1) indexes.push(r);
      }

      const wordsForSeed: SeedVerification[] = [];
      this.props.walletCreation.mnemonicKey
        .split(" ")
        .forEach((word, index) => {
          if (indexes.indexOf(index) > -1) {
            wordsForSeed.push({ index, word });
          }
        });

      wordsForSeed.sort((a, b) => a.index - b.index);

      this.setState({ wordsToVerify: wordsForSeed });
    }
  }

  onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value: string = e.currentTarget.value;

    this.setState<never>({ [name]: value });
  };

  verifySeed(): boolean {
    const userInput = this.state.verify_seed.trim();
    return (
      userInput ===
      this.state.wordsToVerify.map(wordToVerify => wordToVerify.word).join(" ")
    );
  }

  componentWillReceiveProps(nextProps: CreateDesktopProps, nextContext: any) {
    if (nextProps.errorMessage) {
      this.setState({ error: nextProps.errorMessage });
      setTimeout(() => this.setState({ error: "" }), 2000);
    }
  }

  nextStep = () => {
    const { step } = this.state;

    if (step === CREATION_STEPS.Credentials) {
      this.props.createWallet(this.state.fileName, this.state.pw);
      return;
    }

    if (step !== CREATION_STEPS.Verification) {
      this.setState({ step: step + 1 });
    }
    // On step three, if seed is invalid display error messsage for 2s
    if (step === CREATION_STEPS.Verification) {
      const validationSucceed = this.verifySeed();

      if (!validationSucceed) {
        this.setState({ error: "Sorry, that seed is incorrect" });

        setTimeout(() => {
          this.setState({ error: "" });
        }, 2000);
      }

      if (validationSucceed) {
        this.props.mnenomicVerificationSucceed(this.state.fileName);
      } else {
        return null;
      }
    }
  };

  prevStep = () => {
    if (
      this.state.step === CREATION_STEPS.Info ||
      this.state.step === CREATION_STEPS.Seed
    )
      return;

    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState<never>({
      [name]: value
    });
  };

  togglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  handleSwitch = () => {
    const windowWidth = window.innerWidth;
    const { fileName, step, verify_seed, error } = this.state;

    switch (step) {
      case CREATION_STEPS.Info:
        return <Placeholder platform={"desktop"} />;
      case CREATION_STEPS.Credentials:
        return (
          <>
            <Input
              error={this.state.error}
              label="Wallet Name"
              placeholder="Create a wallet name"
              name="fileName"
              type={"text"}
              value={fileName}
              onChange={this.onChangeHandler}
            />

            <InputButton
              // @ts-ignore
              label="Wallet Password"
              placeholder="Enter your wallet password"
              name="pw"
              type={this.state.showPassword === true ? "text" : "password"}
              button={this.state.showPassword === true ? "hide" : "show"}
              value={this.state.pw}
              onChange={this.onChangeHandler}
              onClick={this.togglePassword}
            />

            <Information>
              Creating a new wallet with a name and password means you’ll be
              able to log in without entering your seed phrase. This makes your
              experience more secure, safe and efficient.
            </Information>
          </>
        );
      case CREATION_STEPS.Seed:
        return (
          <CreateSeed
            name={"name"}
            value={this.props.walletCreation.mnemonicKey}
            rows={windowWidth < 600 ? "6" : "4"}
            readOnly={true}
          />
        );
      case CREATION_STEPS.Verification:
        const labelString = (
          <Fragment>
            type in the words{" "}
            <span style={{ color: "#34d8ac" }}>
              {" "}
              {this.state.wordsToVerify
                .map(word => "#" + (word.index + 1))
                .join(" ")}{" "}
            </span>{" "}
            seperated by blank space
          </Fragment>
        );
        return (
          <>
            <Description
              label={labelString}
              placeholder="Refer to the seed phrase to enter the words requested above"
              name={"verify_seed"}
              value={verify_seed}
              error={error}
              onChange={this.onChangeHandler}
              rows={windowWidth < 600 ? "6" : "4"}
            />

            <Information>
              Please verify your Seed Phrase this will ensure that your Seed
              Phrase has been correctly backed up.{" "}
              <strong>
                Store your seed in a safe location and do not share this with
                anyone
              </strong>
            </Information>
          </>
        );
      default:
    }
  };

  render() {
    const { step, fileName, pw } = this.state;

    const createIsValid = fileName.length > 0 && pw.length > 0;
    const seedIsValid = this.verifySeed();

    return (
      <>
        <Body>{this.handleSwitch()}</Body>
        <Buttons buttons="single">
          <Submit
            disabled={
              step === 0
                ? false
                : step === 1 && createIsValid
                ? false
                : step === 2
                ? false
                : !(step === 3 && seedIsValid === true)
            }
            onClick={() => this.nextStep()}
          >
            {this.props.walletCreation.isFetching || this.props.loading ? (
              <Spinner />
            ) : step === 0 ? (
              "Continue"
            ) : step === 1 ? (
              "Create"
            ) : step === 2 ? (
              "Verify"
            ) : (
              "Finish"
            )}
          </Submit>
        </Buttons>
      </>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  walletCreation: state.walletCreation,
  loading: selectIsRequestingLogin(state),
  errorMessage: selectErrorMessage(state)
});

export const CreateDesktop = connect(
  mapStateToProps,
  { createWallet, mnenomicVerificationSucceed }
)(CreateDesktopContainer);
