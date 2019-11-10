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
import {selectIsLoggedIn} from "../../platforms/web/reducers/account";
import {keepAlive, getTransfers} from "../../actions";
import Idle from "../../components/idle";

/**
 *root component for private wallet
 * by updating blockheight in given interval
 * it is responsible for updating blockheight related data ( balances, transfers )
 * which is done in the action getHeight which might not be the best place -> c'est la vie
 */
class PrivateRoutes extends Component {
  componentDidMount() {

    this.props.getTransfers();
    this.props.keepAlive();
    this.timer = setInterval(this.props.refresh, 15000);
    this.addTimer();
  }


  addTimer() {

      this.getTxTimer = setInterval(this.props.getTransfers, 30000);
      this.keepAliveTimer = setInterval(this.props.keepAlive, 15000);
  }

  removeTimer() {

      clearInterval(this.getTxTimer);
      clearInterval(this.keepAliveTimer);
      this.getTxTimer = null;
      this.keepAliveTimer = null;

  }

  componentWillUnmount() {
   this.removeTimer();
  }

  render() {
    const { match } = this.props;

    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
          <Idle/>
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
  { keepAlive, getTransfers }
)(PrivateRoutes);
