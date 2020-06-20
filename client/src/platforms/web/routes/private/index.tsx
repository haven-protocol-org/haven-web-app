// Library Imports
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

// Relative Imports

import { AssetsWeb } from "../../pages/_wallet/assets";
import { DetailsWeb } from "../../pages/_wallet/details";
import { TransferWeb } from "../../pages/_wallet/transfer";
import { connect } from "react-redux";
import { selectIsLoggedIn } from "../../reducers/account";
import Idle from "../../../../shared/components/idle";
import { SettingsWeb } from "../../pages/_wallet/settings";
import { keepAlive, getTransfers, getExchangeRates } from "../../actions";
import Menu from "../../../../shared/components/_layout/menu";
import Page from "../../../../shared/components/_layout/page";
import {DesktopAppState} from "platforms/desktop/reducers";
/**
 *root component for private web wallet
 * by updating blockheight in given interval
 * it is responsible for updating blockheight related data ( balances, transfers )
 * which is done in the action getHeight which might not be the best place -> c'est la vie
 */
class PrivateRoutes extends Component<any, any> {


  private txTimerId: number;
  private keepAliveTimerId: number;
  private exchangeRatesTimerId:number;



  componentDidMount() {
    this.props.getTransfers();
    this.props.keepAlive();
    this.props.getExchangeRates();
    this.addTimer();
  }

  addTimer() {
    this.txTimerId = window.setInterval(this.props.getTransfers, 30000);
    this.keepAliveTimerId = window.setInterval(this.props.keepAlive, 15000);
    this.exchangeRatesTimerId = window.setInterval(this.props.getExchangeRates, 60000);
  }

  removeTimer() {
    clearInterval(this.txTimerId);
    clearInterval(this.keepAliveTimerId);
    clearInterval(this.exchangeRatesTimerId);

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
        <Idle />
        <Page>
          <Menu />
          <Route path={`${match.url}/assets`} exact component={AssetsWeb} />
          <Route
            path={`${match.url}/assets/:id`}
            exact
            component={DetailsWeb}
          />
          <Route path={`${match.url}/transfer`} exact component={TransferWeb} />
          <Route path={`${match.url}/settings`} exact component={SettingsWeb} />
        </Page>
      </div>
    );
  }
}

export const mapStateToProps = (state: DesktopAppState) => ({
  isLoggedIn: selectIsLoggedIn(state)
});

export default connect(
  mapStateToProps,
  { keepAlive, getTransfers, getExchangeRates }
)(PrivateRoutes);
