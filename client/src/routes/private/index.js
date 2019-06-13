// Library Imports
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Relative Imports

import Assets from "../../pages/_wallet/assets";
import Details from "../../pages/_wallet/details";
import Exchange from "../../pages/_wallet/exchange";
import Transfer from "../../pages/_wallet/transfer";
import Settings from "../../pages/_wallet/settings";

class PrivateRoutes extends Component {
  render() {
    return (
      <div>
        <Route path="/wallet/assets" exact component={Assets} />
        <Route path="/wallet/assets/:id" exact component={Details} />
        <Route path="/wallet/exchange" exact component={Exchange} />
        <Route path="/wallet/transfer" exact component={Transfer} />
        <Route path="/wallet/settings" exact component={Settings} />
      </div>
    );
  }
}

export default PrivateRoutes;
