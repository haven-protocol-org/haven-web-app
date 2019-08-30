// Library Imports
import React, { Component } from "react";
import { Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import history from "./history.js";

// Relative Imports
import Navigation from "./components/_layout/navigation/index.js";
import PrivateRoutes from "./routes/private/index.js";
import PublicRoutes from "./routes/public/index.js";
import { Route } from "react-router";
import Status from "./components/_layout/status";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <Router history={history}>
          <Navigation />
          <Status />
          <PublicRoutes />
          <Route path="/wallet" component={PrivateRoutes} />
        </Router>
      </ThemeProvider>
    );
  }
}

export const mapStateToProps = state => ({
  theme: state.theme,
});

export default connect(mapStateToProps)(App);
