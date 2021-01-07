import { connect } from "react-redux";
import React, { Component } from "react";
import {
  Buttons,
  Submit,
} from "platforms/desktop/pages/_auth/multi_login/styles";
import { Spinner } from "../../../../../shared/components/spinner";
import { Body } from "./styles";
import { Information } from "assets/styles/type";
import {
  selectErrorMessageForLogin,
  selectIsRequestingLogin,
} from "../../../../../shared/reducers/walletSession";
import { WalletSelection } from "shared/components/_inputs/wallet-selection";
import Dropdown from "../../../../../shared/components/_inputs/dropdown";
import InputButton from "shared/components/_inputs/input_button";

import { openWalletByFile } from "shared/actions/walletCreation";
import { DesktopAppState } from "platforms/desktop/reducers";
interface OpenWalletState {
  selectedWallet: string | null;
  password: string;
  validated: boolean;
  showPassword: boolean;
  error: string;
  reveal: boolean;
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
    reveal: false,
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
    const { selectedWallet, password, error } = this.state;
    const disabled = selectedWallet !== null && password.length > 0;

    const { wallets } = this.props;

    const noWallets = [
      {
        name: "No vaults found",
      },
    ];

    return wallets === null || wallets.length === 0 ? (
      <Body>
        <Dropdown
          onClick={this.handleNoWallet}
          options={noWallets}
          placeholder="Select a vault"
          label={"Select Vault"}
          error={""}
          value={"Select a vault"}
        >
          {noWallets}
        </Dropdown>
        {/* @ts-ignore */}
        <InputButton
          label="Vault Password"
          placeholder="Enter vault password"
          name="password"
          value={password}
          onChange={this.onChangeHandler}
          onClick={this.togglePassword}
          error={error}
          type={this.state.showPassword === true ? "text" : "password"}
          button={this.state.showPassword === true ? "hide" : "show"}
          width={false}
        />
        <Information>
          Select your vault file and enter your password. If you are new to
          Haven and want to start storing, sending and converting assets in
          complete privacy, then click the "Create" button to get started.
        </Information>
        <Buttons buttons="single">
          {this.props.loading ? (
            <Submit>
              <Spinner />
            </Submit>
          ) : (
            <Submit disabled={!disabled} onClick={() => this.onOpenWallet()}>
              Login
            </Submit>
          )}
        </Buttons>
      </Body>
    ) : (
      <Body>
        <WalletSelection
          onClick={(wallet) => this.onSelectWallet(wallet)}
          options={this.props.wallets}
          placeholder={"Select vault"}
          label={"Select Vault"}
          error={error}
          value={selectedWallet}
        />
        <InputButton
          label="Vault Password"
          placeholder="Enter vault password"
          name="password"
          value={password}
          onChange={this.onChangeHandler}
          onClick={this.togglePassword}
          error={error}
          type={this.state.showPassword === true ? "text" : "password"}
          button={this.state.showPassword === true ? "hide" : "show"}
        />
        <Information>
          Select your vault file and enter your password. If you are new to
          Haven and want to start storing, sending and converting assets in
          complete privacy, then click the "Create" button to get started.
        </Information>
        <Buttons buttons="single">
          {this.props.loading ? (
            <Submit>
              <Spinner />
            </Submit>
          ) : (
            <Submit disabled={!disabled} onClick={() => this.onOpenWallet()}>
              Login
            </Submit>
          )}
        </Buttons>
      </Body>
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
