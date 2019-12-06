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
import InputButton from "../../../../../shared/components/_inputs/input_button/index.js";

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
  showPassword: boolean;
}

class RestoreDesktopContainer extends Component<RestoreProps, RestoreState> {
  state: RestoreState = {
    step: RESTORE_STEP.SEED_STEP,
    error: undefined,
    seed: "",
    pw: "",
    name: "",
    showPassword: false
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

  togglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

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
                label="Seed Phrase"
                placeholder="Enter your 25 word seed phrase..."
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
              <Submit
                onClick={() => this.onContinue()}
                disabled={seed.length > 0 ? false : true}
              >
                Restore
              </Submit>
            </Buttons>
          </>
        )}

        {step === RESTORE_STEP.NAME_STEP && (
          <>
            <Body>
              <Input
                label="Wallet Name"
                placeholder="Create a wallet name"
                name="name"
                type={"text"}
                value={name}
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
                Restoring a wallet with a name and password means you’ll be able
                to log in without entering your seed phrase. This makes your
                experience more secure, safe and efficient.
              </Information>
            </Body>
            <Buttons>
              <Back onClick={() => this.onBack()}>Back</Back>
              <Submit
                disabled={name.length > 0 && pw.length > 0 ? false : true}
                onClick={() => this.onRestoreWallet()}
              >
                {this.props.isRequestingLogin ? (
                  <Spinner color={"white"} />
                ) : (
                  "Finish"
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
