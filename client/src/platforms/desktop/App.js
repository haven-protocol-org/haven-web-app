import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import React, { Component } from "react";
import { Route } from "react-router";
import { history } from "../../utility/history";
import { NavigationDesktop } from "./components/navigation";
import { PublicRoutesDesktop } from "./routes/public";
import { PrivateRoutesDesktop } from "./routes/private";
import Status from "../../shared/components/_layout/status";
import { HashRouter } from "react-router-dom";
import {ModalContainerDesktop} from "./components/modalContainer";

// TOGGLE ON THIS MODAL

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <HashRouter history={history}>
          <NavigationDesktop />
          <ModalContainerDesktop/>
          <Status />
          <PublicRoutesDesktop />
          <Route path="/wallet" component={PrivateRoutesDesktop} />
        </HashRouter>
      </ThemeProvider>
    );
  }
}

export const mapStateToProps = state => ({
  theme: state.theme
});

export const AppDesktop = connect(mapStateToProps)(App);
