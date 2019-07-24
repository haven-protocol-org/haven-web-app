// Library Imports
import React, { Component } from "react";
import {Redirect, Route} from "react-router-dom";

// Relative Imports

import Assets from "../../pages/_wallet/assets";
import Details from "../../pages/_wallet/details";
import Exchange from "../../pages/_wallet/exchange";
import Transfer from "../../pages/_wallet/transfer";
import Settings from "../../pages/_wallet/settings";
import {connect} from "react-redux";
import {IN_SESSION} from "../../reducers/appState";

class PrivateRoutes extends Component {
  render() {

      const {match} = this.props;

      if (this.props.sessionState !== IN_SESSION)
      {
         return (<Redirect to="/"/>)
      }


    return (
        <div>
        <Route path={`${match.url}/assets`} exact component={Assets} />
        <Route path={`${match.url}/assets/:id`} exact component={Details} />
        <Route path={`${match.url}/exchange`} exact component={Exchange} />
        <Route path={`${match.url}/transfer`} exact component={Transfer} />
        <Route path={`${match.url}/settings`} exact component={Settings} />
      </div>
    );
  }
}


export const mapStateToProps = state => ({
    sessionState: state.appState.session
});

export default connect(
    mapStateToProps,{})(PrivateRoutes);
