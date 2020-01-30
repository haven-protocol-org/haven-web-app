// Library Imports
import React, { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";

// Relative Imports

import Welcome from "../../../../shared/pages/_public/welcome";
import Loader from "../../../../shared/components/loader";
import {CreateWeb} from "../../pages/_auth/create";
import {LoginWeb} from "../../pages/_auth/login";

const Faq = lazy(() => import("../../../../shared/pages/_public/faq"));
// const Create = lazy(() =>  import("../../pages/_auth/create"));
// const Login = lazy(() => import("../../pages/_auth/login"));
const Blog = lazy (() => import("../../../../shared/pages/_public/blog"));
const Team = lazy(() =>  import("../../../../shared/pages/_public/team"));
const Timeline = lazy(() => import("../../../../shared/pages/_public/timeline"));
const Whitepaper = lazy(() => import("../../../../shared/pages/_public/whitepaper"));

class PublicRoutesWeb extends Component {
  render() {
    return (
      <div>
          <Suspense fallback={<Loader/>}>
        <Route path="/" exact component={Welcome} />
        <Route path="/faq" exact component={Faq} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/timeline" exact component={Timeline} />
        <Route path="/team" exact component={Team} />
        <Route path="/create" exact component={CreateWeb} />
        <Route path="/login" exact component={LoginWeb} />
        <Route path="/whitepaper" exact component={Whitepaper} />
          </Suspense>
      </div>
    );
  }
}

export default PublicRoutesWeb;
