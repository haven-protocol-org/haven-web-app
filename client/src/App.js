// Library Imports
import React, { Component, Suspense, lazy } from "react";
import { Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import history from "./history.js";

// Relative Imports
import Navigation from "./components/_layout/navigation/index.js";
import { Route } from "react-router";
import Status from "./components/_layout/status";
import Loader from "./components/loader";
import PublicRoutesWeb from "./platforms/web/routes/public";
const PrivateRoutesWeb = lazy(() => import("./platforms/web/routes/private"));


class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Router history={history}>
          <Navigation />
          <Status />
          <PublicRoutesWeb />
          <Suspense fallback={<Loader/>}>
          <Route path="/wallet" component={PrivateRoutesWeb} />
          </Suspense>
        </Router>
      </ThemeProvider>
    );
  }
}

export const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(mapStateToProps)(App);
