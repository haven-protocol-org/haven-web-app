// Library Imports
import React, { Component } from "react";

// Relative Imports
import {
  Title,
  Description as Subtitle,
} from "../../../../../assets/styles/type.js";
import {
  Container,
  Main,
  Header,
  Footer,
  Route,
  Label,
  Tabs,
  Tab,
} from "./styles";
import { RestoreDesktop } from "../restore";
import { DesktopAppState } from "../../../reducers";
import { connect } from "react-redux";
import { selectIsLoggedIn } from "../../../../../shared/reducers/walletSession";
import { Redirect } from "react-router";
import { CreateDesktop } from "platforms/desktop/pages/_auth/create";

interface MultiloginState {
  loginType: LOGIN_TYPE;
}

interface MultiLoginProps {
  isLoggedIn: boolean;
}

enum LOGIN_TYPE {
  Open,
  Create,
  Restore,
}

class MultiLoginPage extends Component<MultiLoginProps, MultiloginState> {
  state: MultiloginState = {
    loginType: LOGIN_TYPE.Create,
  };

  selectRestore = () => {
    this.setState({
      loginType: LOGIN_TYPE.Restore,
    });
  };

  selectCreate = () => {
    this.setState({
      loginType: LOGIN_TYPE.Create,
    });
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/wallet/assets" />;
    }
    const loginType = this.state.loginType;
    return (
      <Container>
        <Header>
          <Title>Create a Vault</Title>
          <Subtitle>
            To create a Vault please generate a new Vault or restore an existing
            one.
          </Subtitle>
        </Header>
        <Tabs>
          <Tab
            active={loginType === LOGIN_TYPE.Create}
            onClick={this.selectCreate}
          >
            Create
          </Tab>
          <Tab
            active={loginType === LOGIN_TYPE.Restore}
            onClick={this.selectRestore}
          >
            Restore
          </Tab>
        </Tabs>
        <Main>
          {loginType === LOGIN_TYPE.Restore && <RestoreDesktop />}
          {loginType === LOGIN_TYPE.Create && <CreateDesktop />}
        </Main>
        <Footer>
          <Label>Have a Vault?</Label>
          <Route to={"/"}>Login</Route>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  isLoggedIn: selectIsLoggedIn(state),
});

export const MultiCreateDesktop = connect(mapStateToProps)(MultiLoginPage);
