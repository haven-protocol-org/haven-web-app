// Library Imports
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Relative Imports

import { RestoreDesktop } from "../../pages/_auth/restore";
import { LoginDesktop } from "../../pages/public/login";
import { CreateDesktop } from "../../pages/public/create";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { getDaemonStates } from "../../actions/daemonState";

class PublicRoutes extends Component {
  componentDidMount() {
    this.props.getDaemonStates();
  }

  render() {
    return (
      <div>
        <Route path="/" exact component={LoginDesktop} />
        <Route path="/create" exact component={CreateDesktop} />
        <Route path="/login" exact component={RestoreDesktop} />
      </div>
    );
  }
}

export const PublicRoutesDesktop = withRouter(
  connect(
    null,
    { getDaemonStates }
  )(PublicRoutes)
);
