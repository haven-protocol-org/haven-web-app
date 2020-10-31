// Library Imports
import React, { Component } from "react";

// Relative Imports
import {
  Title,
  Description as Subtitle,
} from "../../../../../assets/styles/type.js";
import { Container, Main, Header, Footer, Route, Label } from "./styles";
import { DesktopAppState } from "../../../reducers";
import { connect } from "react-redux";
import { getSavedWallets } from "../../../actions/storedWallets";
import { selectIsLoggedIn } from "../../../../../shared/reducers/walletSession";
import { Redirect } from "react-router";
import { OpenWalletDesktop } from "../open";

interface MultiloginState {
  loginType: LOGIN_TYPE;
}

interface MultiLoginProps {
  getSavedWallets: () => void;
  wallets: string[] | null;
  isLoggedIn: boolean;
}

enum LOGIN_TYPE {
  Open,
  Create,
  Restore,
}

class MultiLoginPage extends Component<MultiLoginProps, MultiloginState> {
  state: MultiloginState = {
    loginType: LOGIN_TYPE.Open,
  };

  componentDidMount(): void {
    this.props.getSavedWallets();
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/wallet/assets" />;
    }

    return (
      <Container>
        <Header>
          <Title>Vault Login</Title>
          <Subtitle>
            To access your Vault please select it and enter your password
          </Subtitle>
        </Header>
        <Main>
          <OpenWalletDesktop wallets={this.props.wallets} />
        </Main>
        <Footer>
          <Label>Need a Vault?</Label>
          <Route to={"/create"}>Create or Restore a Vault</Route>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  wallets: state.storedWallets.wallets,
  isLoggedIn: selectIsLoggedIn(state),
});

export const MultiLoginDesktop = connect(mapStateToProps, { getSavedWallets })(
  MultiLoginPage
);
