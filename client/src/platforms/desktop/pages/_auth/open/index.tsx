import { connect } from "react-redux";
import React, { Component } from "react";
import {
  Buttons,
  Cancel,
  Submit
} from "platforms/desktop/pages/_auth/multi_login/styles";
import { Spinner } from "../../../../../shared/components/spinner";
import { Body } from "./styles";
import { Information } from "assets/styles/type";
import Input from "shared/components/_inputs/input";
import { SavedWallet } from "../../../reducers/walletSession";
import { WalletSelection } from "../../../../../shared/components/_inputs/wallet-selection";
import Dropdown from "../../../../../shared/components/_inputs/dropdown";

import { openWallet } from "../../../actions/walletSession";

interface OpenWalletState {
  selectedWallet: SavedWallet | null;
  pw: string;
  validated: boolean;
  loading: boolean;
}

interface OpenWalletProps {
  wallets: SavedWallet[] | null;
  openWallet: (filename: string, pw: string) => void;
}

class OpenWalletDesktopContainer extends Component<
  OpenWalletProps,
  OpenWalletState
> {
  state: OpenWalletState = {
    selectedWallet: null,
    pw: "",
    validated: false,
    loading: false
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

  render() {
    const { selectedWallet, pw } = this.state;
    const disabled = selectedWallet !== null && pw.length > 0 ? true : false;

    const noWallets = [
      {
        name: "No Vault detected. Please Create a Vault"
      }
    ];

    return this.props.wallets === null || this.props.wallets.length === 0 ? (
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
          forgot your password, then please click{" "}
          <strong>Create a Vault</strong> link below.
        </Information>
      </Body>
    ) : (
      <>
        <Body>
          <WalletSelection
            onClick={wallet => this.onSelectWallet(wallet)}
            options={this.props.wallets}
            placeholder={"Choose a wallet"}
            label={"Select Wallet"}
            error={""}
            value={selectedWallet}
          />

          <Input
            label="Wallet Password"
            placeholder="Enter your wallet password"
            name="pw"
            type={"text"}
            value={this.state.pw}
            onChange={this.onChangeHandler}
          />
          <Information>
            Select a wallet and enter the password. If you don't see a wallet,
            or forgot your password, then please click{" "}
            <strong>Create a Vault</strong> link below.
          </Information>
        </Body>
        <Buttons>
          <Cancel to="/">Cancel</Cancel>
          {this.state.loading ? (
            <Submit>
              <Spinner />
            </Submit>
          ) : (
            <Submit disabled={!disabled} onClick={() => this.onOpenWallet()}>
              Log In
            </Submit>
          )}
        </Buttons>
      </>
    );
  }
}

export const OpenWalletDesktop = connect(
  null,
  { openWallet }
)(OpenWalletDesktopContainer);
