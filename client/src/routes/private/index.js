// Library Imports
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

// Relative Imports

import Assets from "../../pages/_wallet/assets";
import Details from "../../pages/_wallet/details";
import Exchange from "../../pages/_wallet/exchange";
import Transfer from "../../pages/_wallet/transfer";
import Settings from "../../pages/_wallet/settings";
import { connect } from "react-redux";
import {selectIsLoggedIn} from "../../reducers/account";
import {refresh} from "../../actions";

/**
 *root component for private wallet
 * by updating blockheight in given interval
 * it is responsible for updating blockheight related data ( balances, transfers )
 * which is done in the action getHeight which might not be the best place -> c'est la vie
 */
class PrivateRoutes extends Component {
  componentDidMount() {
    this.timer = setInterval(this.props.refresh, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { match } = this.props;

    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
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
  isLoggedIn: selectIsLoggedIn(state)
});

export default connect(
  mapStateToProps,
  { refresh }
)(PrivateRoutes);
