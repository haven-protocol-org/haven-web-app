// Library Imports
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Relative Imports

import Welcome from "../../pages/_public/welcome";
import Faq from "../../pages/_public/faq";
import Create from "../../pages/_auth/create";
import Login from "../../pages/_auth/login";
import Blog from "../../pages/_public/blog";
import Team from "../../pages/_public/team";
import Timeline from "../../pages/_public/timeline";
import Whitepaper from "../../pages/_public/whitepaper";

class PublicRoutes extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Welcome} />
        <Route path="/faq" exact component={Faq} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/timeline" exact component={Timeline} />
        <Route path="/team" exact component={Team} />
        <Route path="/create" exact component={Create} />
        <Route path="/login" exact component={Login} />
        <Route path="/whitepaper" exact component={Whitepaper} />
      </div>
    );
  }
}

export default PublicRoutes;
