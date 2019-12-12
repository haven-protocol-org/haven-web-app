import { connect } from "react-redux";
import React, { Component } from "react";
import {
  Buttons,
  Cancel,
  Submit
} from "platforms/desktop/pages/_auth/multi_login/styles";
import { Spinner } from "../../../../../shared/components/spinner";
import { Body, Wrapper } from "./styles";
import { Information } from "assets/styles/type";
import Input from "shared/components/_inputs/input";
import {
  SavedWallet,
  selectIsLoggedIn,
  selectIsRequestingLogin
} from "../../../reducers/walletSession";
import { WalletSelection } from "../../../../../shared/components/_inputs/wallet-selection";
import Dropdown from "../../../../../shared/components/_inputs/dropdown";
import InputButton from "../../../../../shared/components/_inputs/input_button/index.js";

import { openWallet } from "../../../actions/walletSession";
import { DesktopAppState } from "platforms/desktop/reducers";

interface OpenWalletState {
  selectedWallet: SavedWallet | null;
  pw: string;
  validated: boolean;
  showPassword: boolean;
}

interface OpenWalletProps {
  wallets: SavedWallet[] | null;
  openWallet: (filename: string, pw: string) => void;
  loading: boolean;
}

class OpenWalletDesktopContainer extends Component<
  OpenWalletProps,
  OpenWalletState
> {
  state: OpenWalletState = {
    selectedWallet: null,
    pw: "",
    validated: false,
    showPassword: false
  };

  onOpenWallet = () => {
    if (this.state.selectedWallet !== null) {
      this.props.openWallet(this.state.selectedWallet.name, this.state.pw);
    }
  };

  onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value: string = e.currentTarget.value;

    this.setState<never>({ [name]: value });
  };

  onSelectWallet(wallet: SavedWallet) {
    this.setState({ selectedWallet: wallet });
  }

  handleNoWallet = () => {
    // Empty function but needed to prevent an error
  };

  togglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  render() {
    const { selectedWallet, pw } = this.state;
    const disabled = selectedWallet !== null && pw.length > 0 ? true : false;

    const { wallets } = this.props;

    console.log(this.props.loading);

    const noWallets = [
      {
        name: "No Vault detected. Please Create a Vault"
      }
    ];

    return wallets === null || wallets.length === 0 ? (
      <Body>
        <Dropdown
          onClick={this.handleNoWallet}
          options={noWallets}
          placeholder="Choose a wallet"
          label={"Select Wallet"}
          error={""}
          value={"Choose a wallet"}
        >
          {noWallets}
        </Dropdown>
        <Input
          label="Wallet Password"
          placeholder="Enter your wallet password"
          name="pw"
          type={"text"}
          value={this.state.pw}
          onChange={this.onChangeHandler}
        />
        <Information>
          Select a wallet and enter the password. If you don't see a wallet, or
          forgot your password, then please click the{" "}
          <strong>Create a Vault</strong> link below.
        </Information>
      </Body>
    ) : (
      <Wrapper>
        <Body>
          <WalletSelection
            onClick={wallet => this.onSelectWallet(wallet)}
            options={this.props.wallets}
            placeholder={"Choose a wallet"}
            label={"Select Wallet"}
            error={""}
            value={selectedWallet}
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
            Select a wallet and enter the password. If you don't see a wallet,
            or forgot your password, then please click the{" "}
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
  loading: selectIsRequestingLogin(state)
});

export const OpenWalletDesktop = connect(
  mapStateToProps,
  { openWallet }
)(OpenWalletDesktopContainer);