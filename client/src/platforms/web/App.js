// Library Imports
import React, { Component, Suspense, lazy } from "react";
import { Router } from "react-router-dom";
import { ThemeProvider } from "shared/components/tx-history/component/node_modules/styled-components";
import { connect } from "react-redux";
import { history } from "../../utility/history.js";

// Relative Imports
import Navigation from "../../shared/components/_layout/navigation/index.js";
import { Route } from "react-router";
import {StatusComponent} from "../../shared/components/_layout/status";
import Loader from "../../shared/components/loader";
import PublicRoutesWeb from "./routes/public";
const PrivateRoutesWeb = lazy(() => import("./routes/private"));

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Router history={history}>
          <Navigation />
          <StatusComponent />
          <PublicRoutesWeb />
          <Suspense fallback={<Loader />}>
            <Route path="/wallet" component={PrivateRoutesWeb} />
          </Suspense>
        </Router>
      </ThemeProvider>
    );
  }
}

export const mapStateToProps = (state) => ({
  theme: state.theme,
});

export const AppWeb = connect(mapStateToProps)(App);
