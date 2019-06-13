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

class App extends Component {
  state = {
    theme: {}
  };

  render() {
    const { auth } = this.props.user;

    return (
      <ThemeProvider theme={this.props.theme}>
        <Router history={history}>
          <Navigation />
          <PublicRoutes />
          {!auth && history.push("/")}
          <PrivateRoutes />
        </Router>
      </ThemeProvider>
    );
  }
}

export const mapStateToProps = state => ({
  theme: state.theme,
  user: state.user
});

export default connect(mapStateToProps)(App);
