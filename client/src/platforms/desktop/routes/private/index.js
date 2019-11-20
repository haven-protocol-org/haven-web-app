// Library Imports
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

// Relative Imports

import {AssetsDesktop} from "../../pages/_wallet/assets";
import {DetailsDesktop} from "../../pages/_wallet/details";
import {Exchange} from "../../../../universal/pages/_wallet/exchange";
import {TransferDesktop} from "../../pages/_wallet/transfer";
import {SettingsDesktop} from "../../pages/_wallet/settings";
import { connect } from "react-redux";
import {selectIsLoggedIn} from "../../reducers/walletSession";
import {getTransfers, getBalances} from "../../actions";

/**
 *root component for private wallet
 * by updating blockheight in given interval
 * it is responsible for updating blockheight related data ( balances, transfers )
 * which is done in the action getHeight which might not be the best place -> c'est la vie
 */
class PrivateRoutes extends Component {
  componentDidMount() {


      this.props.getBalances();
    this.props.getTransfers();
    this.addTimer();
  }


  addTimer() {

      this.getTxTimer = setInterval(this.props.getTransfers, 30000);
      this.getBalancesTimer = setInterval(this.props.getBalances, 30000);
  }

  removeTimer() {

      clearInterval(this.getTxTimer);
      clearInterval(this.getBalancesTimer);
      this.getTxTimer = null;
      this.getBalancesTimer = null;

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
        <Route path={`${match.url}/assets`} exact component={AssetsDesktop} />
        <Route path={`${match.url}/assets/:id`} exact component={DetailsDesktop} />
        <Route path={`${match.url}/exchange`} exact component={Exchange} />
        <Route path={`${match.url}/transfer`} exact component={TransferDesktop} />
        <Route path={`${match.url}/settings`} exact component={SettingsDesktop} />
        <Route path={`${match.url}/exchange`} exact component={Exchange} />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state)
});

export const PrivateRoutesDesktop =  connect(
  mapStateToProps,
  { getTransfers, getBalances }
)(PrivateRoutes);
