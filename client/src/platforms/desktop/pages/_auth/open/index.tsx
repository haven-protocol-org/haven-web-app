import { connect } from "react-redux";
import { restoreWallet } from "../../../actions";
import React, { Component } from "react";
import {
  Buttons,
  Cancel,
  Submit
} from "platforms/desktop/components/_auth/multi_login/styles";
import { Spinner } from "universal/components/spinner";
import { Body } from "./styles";
import { Information } from "assets/styles/type";
import Input from "universal/components/_inputs/input";
import { SavedWallet } from "../../../reducers/walletSession";
import { WalletSelection } from "../../../../../universal/components/_inputs/wallet-selection";
import { openWallet } from "../../../actions/walletSession";

interface OpenWalletState {
  selectedWallet: SavedWallet | null;
  pw: string;
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
    pw: ""
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

  render() {
    return (
      <>
        <Body>
          <WalletSelection
            onClick={wallet => this.onSelectWallet(wallet)}
            options={this.props.wallets}
            placeholder={"Select your Wallet"}
            label={"Saved Wallets"}
            error={""}
            value={this.state.selectedWallet}
          />

          <Input
            label="Wallet Password"
            placeholder="Enter the password for your wallet"
            name="pw"
            type={"text"}
            value={this.state.pw}
            onChange={this.onChangeHandler}
          />
          <Information>
            Upload your encrypted Keystore File and enter the password
            associated with it to unlock and access your funds.
          </Information>
        </Body>
        <Buttons>
          <Cancel to="/">Cancel</Cancel>
          <Submit onClick={() => this.onOpenWallet()}>Continue</Submit>
        </Buttons>
      </>
    );
  }
}

export const OpenWalletDesktop = connect(
  null,
  { openWallet }
)(OpenWalletDesktopContainer);
