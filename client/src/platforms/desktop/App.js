import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import React, { Component, Suspense } from "react";
import { Route, Router } from "react-router";
import { history } from "../../utility/history";
import { NavigationDesktop } from "./components/navigation";
import { PublicRoutesDesktop } from "./routes/public";
import { PrivateRoutesDesktop } from "./routes/private";
import Status from "../../universal/components/_layout/status";
import Loader from "../../universal/components/loader";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Router history={history}>
          <NavigationDesktop />
          <Status />
          <PublicRoutesDesktop />
          <Suspense fallback={<Loader />}>
            <Route path="/wallet" component={PrivateRoutesDesktop} />
          </Suspense>
        </Router>
      </ThemeProvider>
    );
  }
}

export const mapStateToProps = state => ({
  theme: state.theme
});

export const AppDesktop = connect(mapStateToProps)(App);
