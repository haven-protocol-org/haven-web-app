import { connect } from "react-redux";
import React, { Component } from "react";
import {
  Buttons,
  Submit,
} from "platforms/desktop/pages/_auth/multi_login/styles";
import { Spinner } from "../../../../../shared/components/spinner";
import { Body, Wrapper } from "./styles";
import { Information } from "assets/styles/type";
import Input from "shared/components/_inputs/input";
import {
  selectErrorMessageForLogin,
  selectIsRequestingLogin,
} from "../../../../../shared/reducers/walletSession";
import { WalletSelection } from "shared/components/_inputs/wallet-selection";
import Dropdown from "../../../../../shared/components/_inputs/dropdown";
import InputButton from "shared/components/_inputs/input_button";

import { openWalletByFile } from "shared/actions/wallet";
import { DesktopAppState } from "platforms/desktop/reducers";

interface OpenWalletState {
  selectedWallet: string | null;
  password: string;
  validated: boolean;
  showPassword: boolean;
  error: string;
}

interface OpenWalletProps {
  wallets: string[] | null;
  openWalletByFile: (filename: string, password: string) => void;
  loading: boolean;
  errorMessage: string;
}

class OpenWalletDesktopContainer extends Component<
  OpenWalletProps,
  OpenWalletState
> {
  state: OpenWalletState = {
    selectedWallet: null,
    password: "",
    validated: false,
    showPassword: false,
    error: "",
  };

  onOpenWallet = () => {
    if (this.state.selectedWallet !== null) {
      this.props.openWalletByFile(
        this.state.selectedWallet,
        this.state.password
      );
    }
  };

  componentWillReceiveProps(nextProps: OpenWalletProps, nextContext: any) {
    if (nextProps.errorMessage) {
      this.setState({ error: nextProps.errorMessage });
      setTimeout(() => this.setState({ error: "" }), 2000);
    }
  }

  onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value: string = e.currentTarget.value;

    this.setState<never>({ [name]: value });
  };

  onSelectWallet(wallet: string) {
    this.setState({ selectedWallet: wallet });
  }

  handleNoWallet = () => {
    // Empty function but needed to prevent an error
  };

  togglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  render() {
    const { selectedWallet, password, showPassword, error } = this.state;
    const disabled = selectedWallet !== null && password.length > 0;

    const { wallets } = this.props;

    const noWallets = [
      {
        name: "Please create a Haven Vault",
      },
    ];

    return wallets === null || wallets.length === 0 ? (
      <Body>
        <Dropdown
          onClick={this.handleNoWallet}
          options={noWallets}
          placeholder="Choose a Vault"
          label={"Select Vault"}
          error={""}
          value={"Choose a Vault"}
        >
          {noWallets}
        </Dropdown>
        <Input
          label="Vault Password"
          placeholder="Enter your Vault password"
          name="password"
          type={"text"}
          value={password}
          onChange={this.onChangeHandler}
        />
        <Information>
          Select a Vault and enter the password. If you don't see a Vault, or
          forgot your password, then please click the{" "}
          <strong>Create a Vault</strong> link below.
        </Information>
      </Body>
    ) : (
      <Wrapper>
        <Body>
          <WalletSelection
            onClick={(wallet) => this.onSelectWallet(wallet)}
            options={this.props.wallets}
            placeholder={"Choose a Vault"}
            label={"Select Vault"}
            error={error}
            value={selectedWallet}
          />
          <InputButton
            // @ts-ignore
            label="Vault Password"
            placeholder="Enter your Vault password"
            name="password"
            type={showPassword ? "text" : "password"}
            button={showPassword ? "hide" : "show"}
            value={password}
            onChange={this.onChangeHandler}
            onClick={this.togglePassword}
          />

          <Information>
            Select a Vault and enter the password. If you don't see a Vault, or
            forgot your password, then please click the{" "}
            <strong>Create a Vault</strong> link below.
          </Information>
        </Body>
        <Buttons buttons="single">
          {this.props.loading ? (
            <Submit>
              <Spinner />
            </Submit>
          ) : (
            <Submit disabled={!disabled} onClick={() => this.onOpenWallet()}>
              Log In
            </Submit>
          )}
        </Buttons>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  loading: selectIsRequestingLogin(state),
  errorMessage: selectErrorMessageForLogin(state),
});

export const OpenWalletDesktop = connect(mapStateToProps, { openWalletByFile })(
  OpenWalletDesktopContainer
);
