// Library Imports
import React, { Component } from "react";

// Relative Imports
import {
  Container,
  Main,
  Header,
  Footer,
  Route,
  Label,
  Title,
  Description,
} from "./styles";
import { DesktopAppState } from "../../../reducers";
import { connect } from "react-redux";
import { getSavedWallets } from "platforms/desktop/actions/storedWallets";
import { selectIsLoggedIn } from "shared/reducers/walletSession";
import { Navigate } from "react-router";
import { OpenWalletDesktop } from "../open";
import { setDesktopConfig } from "platforms/desktop/actions/config";

interface MultiloginState {
  loginType: LOGIN_TYPE;
}

interface MultiLoginProps {
  getSavedWallets: () => void;
  setDesktopConfig: () => void;
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
    this.props.setDesktopConfig();
  }

  render() {
    if (this.props.isLoggedIn) {
      return <Navigate to="/wallet/assets" />;
    }

    return (
      <Container>
        <Header>
          <Title>Vault Login</Title>
          <Description>
            Privately store, exchange and transfer assets
          </Description>
        </Header>
        <Main>
          <OpenWalletDesktop wallets={this.props.wallets} />
        </Main>
        <Footer>
          <Label>Need a Vault?</Label>
          <Route to="/create">Create or Restore</Route>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  wallets: state.storedWallets.wallets,
  isLoggedIn: selectIsLoggedIn(state),
});

export const MultiLoginDesktop = connect(mapStateToProps, {
  getSavedWallets,
  setDesktopConfig,
})(MultiLoginPage);
