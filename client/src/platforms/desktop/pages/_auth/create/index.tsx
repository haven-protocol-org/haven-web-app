// Library Imports
import React, { Component } from "react";

// Relative Imports
import Placeholder from "shared/components/_create/placeholder";

import { Body, Buttons, Submit } from "../multi_login/styles";
import CreateSeed from "shared/components/_create/create_seed";
import { createWallet } from "platforms/desktop/actions";
import { Back } from "shared/components/_auth/create/styles";
import { DesktopAppState } from "platforms/desktop/reducers";
import { connect } from "react-redux";
import { WalletCreation } from "platforms/desktop/reducers/walletCreation";
import { Spinner } from "shared/components/spinner";
import { Information } from "assets/styles/type";
import Description from "shared/components/_inputs/description";
import Input from "shared/components/_inputs/input";

// Toggle this component on for the button
// import InputButton from "shared/components/_inputs/input_button";
import {
  openWallet,
  mnenomicVerificationSucceed
} from "platforms/desktop/actions";

interface CreateDesktopProps {
  createWallet: (name: string, pw: string) => void;
  openWallet: (name: string, pw: string) => void;
  walletCreation: WalletCreation;
  mnenomicVerificationSucceed: () => void;
}

interface CreateDesktopState {
  step: CREATION_STEPS;
  error: string;
  fileName: string;
  pw: string;
  verify_seed: string;
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
    const userInput = this.state.verify_seed;
    return (
      userInput ===
      this.state.wordsToVerify.map(wordToVerify => wordToVerify.word).join(" ")
    );
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
        this.props.mnenomicVerificationSucceed();
        this.props.openWallet(this.state.fileName, this.state.pw);
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

  handleSwitch = () => {
    const windowWidth = window.innerWidth;
    const { pw, fileName, step, verify_seed, error } = this.state;

    switch (step) {
      case CREATION_STEPS.Info:
        return <Placeholder platform={"desktop"} />;
      case CREATION_STEPS.Credentials:
        return (
          <>
            <Input
              label="Wallet Name"
              placeholder="Create a wallet name"
              name="fileName"
              type={"text"}
              value={fileName}
              onChange={this.onChangeHandler}
            />

            <Input
              label="Wallet Password"
              placeholder="Create a wallet password"
              name="pw"
              type={"text"}
              value={pw}
              onChange={this.onChangeHandler}
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
        return (
          <>
            <Description
              label={"Enter Seed Phrase"}
              placeholder={"Enter the seed phrase"}
              name={"verify_seed"}
              value={verify_seed}
              error={error}
              onChange={this.onChangeHandler}
              rows={windowWidth < 600 ? "6" : "4"}
              loading={false}
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
    const { step, fileName, pw, verify_seed } = this.state;

    const createIsValid = fileName.length > 0 && pw.length > 0;
    const seedIsValid =
      this.props.walletCreation.mnemonicKey === this.state.verify_seed;

    return (
      <>
        <Body>{this.handleSwitch()}</Body>
        <Buttons>
          <Back onClick={() => this.prevStep()}>Back</Back>
          <Submit
            disabled={
              step == 0
                ? false
                : step === 1 && createIsValid
                ? false
                : step === 2
                ? false
                : step === 3 && seedIsValid === true
                ? false
                : true
            }
            onClick={() => this.nextStep()}
          >
            {this.props.walletCreation.isFetching ? (
              <Spinner />
            ) : step === 0 ? (
              "Continue"
            ) : step === 1 ? (
              "Save"
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
  walletCreation: state.walletCreation
});

export const CreateDesktop = connect(
  mapStateToProps,
  { createWallet, openWallet, mnenomicVerificationSucceed }
)(CreateDesktopContainer);
