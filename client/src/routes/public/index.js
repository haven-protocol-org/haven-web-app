// Library Imports
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Relative Imports

import Welcome from "../../pages/_public/welcome";
import Faq from "../../pages/_public/faq";
import Create from "../../pages/_auth/create";
import Login from "../../pages/_auth/login";

class PublicRoutes extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Welcome} />
        <Route path="/faq" exact component={Faq} />
        <Route path="/wallet/create" exact component={Create} />
        <Route path="/wallet/login" exact component={Login} />
      </div>
    );
  }
}

export default PublicRoutes;
