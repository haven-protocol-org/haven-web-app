// Library Imports
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

// Relative Imports

import {AssetsWeb} from "../../pages/_wallet/assets";
import {DetailsWeb} from "../../pages/_wallet/details";
import {Exchange} from "../../../../universal/pages/_wallet/exchange";
import {TransferWeb} from "../../pages/_wallet/transfer";
import { connect } from "react-redux";
import {selectIsLoggedIn} from "../../reducers/account";
import Idle from "../../../../universal/components/idle";
import {SettingsWeb} from "../../pages/_wallet/settings";
import {keepAlive, getTransfers} from "../../actions";

/**
 *root component for private web wallet
 * by updating blockheight in given interval
 * it is responsible for updating blockheight related data ( balances, transfers )
 * which is done in the action getHeight which might not be the best place -> c'est la vie
 */
class PrivateRoutes extends Component {
  componentDidMount() {

    this.props.getTransfers();
    this.props.keepAlive();
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
        <Route path={`${match.url}/assets`} exact component={AssetsWeb} />
        <Route path={`${match.url}/assets/:id`} exact component={DetailsWeb} />
        <Route path={`${match.url}/exchange`} exact component={Exchange} />
        <Route path={`${match.url}/transfer`} exact component={TransferWeb} />
        <Route path={`${match.url}/settings`} exact component={SettingsWeb} />
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
