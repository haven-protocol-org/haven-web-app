import {
  selectErrorMessageForLogin,
  selectIsLoggedIn,
  selectIsRequestingLogin
} from "../../../reducers/walletSession";
import { connect } from "react-redux";
import { restoreWallet } from "../../../actions";
import { Redirect } from "react-router";
import React, { Component } from "react";
import { Information } from "assets/styles/type";
import Description from "../../../../../shared/components/_inputs/description";
import { Buttons, Cancel, Submit } from "../multi_login/styles";
import { Spinner } from "../../../../../shared/components/spinner";
import { Body } from "./styles";
import Input from "../../../../../shared/components/_inputs/input";
import { DesktopAppState } from "../../../reducers";
import { Back } from "shared/components/_auth/create/styles";

interface RestoreProps {
  restoreWallet: (seed: string, name: string, pw: string) => void;
  isLoggedIn: boolean;
  isRequestingLogin: boolean;
  errorMessage: string;
}

enum RESTORE_STEP {
  SEED_STEP,
  NAME_STEP
}

interface RestoreState {
  step: RESTORE_STEP;
  error: string | undefined;
  seed: string;
  pw: string;
  name: string;
}

class RestoreDesktopContainer extends Component<RestoreProps, RestoreState> {
  constructor(props: RestoreProps) {
    super(props);
  }

  state: RestoreState = {
    step: RESTORE_STEP.SEED_STEP,
    error: undefined,
    seed: "",
    pw: "",
    name: ""
  };

  onRestoreWallet = () => {
    const { seed, pw, name } = this.state;

    if (!seed || !name || !pw) {
      return;
    }

    this.validateNameAndPW();

    this.props.restoreWallet(seed, name, pw);
  };

  onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value: string = e.currentTarget.value;

    this.setState<never>({ [name]: value });
  };

  onBack() {
    this.setState({ step: RESTORE_STEP.SEED_STEP });
  }

  onContinue() {
    this.validateSeed();
    this.setState({ step: RESTORE_STEP.NAME_STEP });
  }

  validateSeed() {}

  validateNameAndPW() {}

  render() {
    const windowWidth = window.innerWidth;
    const { error, step, seed, name, pw } = this.state;

    if (this.props.isLoggedIn) {
      return <Redirect to="/wallet/assets" />;
    }

    return (
      <>
        {step === RESTORE_STEP.SEED_STEP && (
          <>
            <Body>
              <Description
                label="Seed Phrase or Private Spend Key"
                placeholder="Enter your 25 word seed phrase or Private Spend Key..."
                name="seed"
                value={seed}
                error={error}
                rows={windowWidth < 600 ? "6" : "4"}
                onChange={this.onChangeHandler}
              />
              <Information>
                <strong>Disclaimer:</strong> Your seed is used to generate an
                encrypted signature on your device and unlock your account. This
                ensures the security of your seed or keys, as they're never
                submitted to a server or sent across the internet.
              </Information>
            </Body>
            <Buttons>
              <Cancel to="/">Cancel</Cancel>
              <Submit onClick={() => this.onContinue()}>Continue</Submit>
            </Buttons>
          </>
        )}

        {step === RESTORE_STEP.NAME_STEP && (
          <>
            <Body>
              <Input
                label="Wallet"
                placeholder="Give your Wallet a name"
                name="name"
                type={"text"}
                value={name}
                onChange={this.onChangeHandler}
              />
              <Input
                label="Wallet Password"
                placeholder="Give Your Wallet a password"
                name="pw"
                type={"text"}
                value={pw}
                onChange={this.onChangeHandler}
              />
            </Body>
            <Buttons>
              <Back onClick={() => this.onBack()}>Back</Back>
              <Submit disabled={false} onClick={() => this.onRestoreWallet()}>
                {this.props.isRequestingLogin ? (
                  <Spinner color={"white"} />
                ) : (
                  "Create Wallet"
                )}
              </Submit>
            </Buttons>
          </>
        )}
      </>
    );
  }
}

// @ts-ignore
const mapStateToProps = (state: DesktopAppState) => ({
  isRequestingLogin: selectIsRequestingLogin(state),
  isLoggedIn: selectIsLoggedIn(state),
  errorMessage: selectErrorMessageForLogin(state)
});

// @ts-ignore
export const RestoreDesktop = connect(
  mapStateToProps,
  { restoreWallet }
)(RestoreDesktopContainer);
