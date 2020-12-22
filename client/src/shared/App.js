import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Route } from "react-router";
import { history } from "../utility/history";
import { NavigationDesktop } from "../platforms/desktop/components/navigation";
import { PublicRoutesDesktop } from "../platforms/desktop/routes/public";
import { PrivateRoutes } from "./routes/private";
import { StatusComponent } from "./components/_layout/status";
import { HashRouter } from "react-router-dom";
import { ModalContainerDesktop } from "../platforms/desktop/components/modalContainer";
import { FixedStatus } from "../platforms/desktop/components/fixedStatusContainer";
import { isDesktop } from "constants/env";
import { NavigationWeb } from "platforms/web/components/navigation";
import PublicRoutesWeb from "platforms/web/routes/public";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <HashRouter history={history}>
          {isDesktop() ? <NavigationDesktop /> : <NavigationWeb />}
          <ModalContainerDesktop />
          {isDesktop() && <FixedStatus />}
          <StatusComponent />
          {isDesktop() ? <PublicRoutesDesktop /> : <PublicRoutesWeb />}
          <Route path="/wallet" component={PrivateRoutes} />
        </HashRouter>
      </ThemeProvider>
    );
  }
}

export const mapStateToProps = (state) => ({
  theme: state.theme,
});

export const HavenApp = connect(mapStateToProps)(App);
