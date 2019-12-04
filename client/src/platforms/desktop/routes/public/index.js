// Library Imports
import React, { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";

// Relative Imports

import { RestoreDesktop } from "../../pages/_auth/restore";
import { LoginDesktop } from "../../pages/public/login";
import { CreateDesktop } from "../../pages/public/create";

const Faq = lazy(() => import("../../../../shared/pages/_public/faq"));
const Blog = lazy(() => import("../../../../shared/pages/_public/blog"));
const Team = lazy(() => import("../../../../shared/pages/_public/team"));
const Timeline = lazy(() =>
  import("../../../../shared/pages/_public/timeline")
);
const Whitepaper = lazy(() =>
  import("../../../../shared/pages/_public/whitepaper")
);

export class PublicRoutesDesktop extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={LoginDesktop} />
        <Route path="/create" exact component={CreateDesktop} />
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
