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

class PublicRoutes extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Welcome} />
        <Route path="/faq" exact component={Faq} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/team" exact component={Team} />
        <Route path="/create" exact component={Create} />
        <Route path="/login" exact component={Login} />
      </div>
    );
  }
}

export default PublicRoutes;
