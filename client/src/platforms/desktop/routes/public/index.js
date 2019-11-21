// Library Imports
import React, { Component, lazy } from "react";
import { Route } from "react-router-dom";

// Relative Imports

import Welcome from "../../../../universal/pages/_public/welcome";
//import Create from "../../pages/_auth/create";
import { RestoreDesktop } from "../../pages/_auth/restore";

const Faq = lazy(() => import("../../../../universal/pages/_public/faq"));
// const Create = lazy(() =>  import("../../pages/_auth/create"));
// const Login = lazy(() => import("../../pages/_auth/login"));
const Blog = lazy(() => import("../../../../universal/pages/_public/blog"));
const Team = lazy(() => import("../../../../universal/pages/_public/team"));
const Timeline = lazy(() =>
  import("../../../../universal/pages/_public/timeline")
);
const Whitepaper = lazy(() =>
  import("../../../../universal/pages/_public/whitepaper")
);

export class PublicRoutesDesktop extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Welcome} />
        <Route path="/faq" exact component={Faq} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/timeline" exact component={Timeline} />
        <Route path="/team" exact component={Team} />
        <Route path="/login" exact component={RestoreDesktop} />
        <Route path="/whitepaper" exact component={Whitepaper} />
      </div>
    );
  }
}
