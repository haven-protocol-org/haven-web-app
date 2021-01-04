// Library Imports
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

// Relative Imports

import { AssetsDesktop } from "../../../platforms/desktop/pages/_wallet/assets";
import { HavenDetails } from "../../../platforms/desktop/pages/_wallet/details";
import { ExchangePage } from "../../pages/_wallet/exchange";
import { HavenTransfer } from "../../../platforms/desktop/pages/_wallet/transfer";
import { SettingsDesktop } from "../../../platforms/desktop/pages/_wallet/settings";
import { connect } from "react-redux";
import { selectIsLoggedIn } from "../../reducers/walletSession";
import Page from "../../components/_layout/page";
import Menu from "../../components/_layout/menu/thick";

import { isDesktop, isWeb } from "constants/env";
import { SettingsWeb } from "platforms/web/pages/_wallet/settings";
import { storeWalletInDB } from "platforms/web/actions/storage";
import { refresh } from "shared/actions/refresh";
import { isWalletSynced } from "shared/reducers/chain";

/**
 *root component for private wallet
 */
class PrivateRoutesContainer extends Component {
  componentDidMount() {
    if (isWeb()) {
      window.addEventListener("beforeunload", this.storeWalletBeforeUnload);
    }
    this.refreshInterval = setInterval(this.props.refresh, 10000);
  }

  storeWalletBeforeUnload = (event) => {
    if (this.props.isSyncing) {
      event.preventDefault();
      event.returnValue = "Use Logout Button";
    }
  };

  componentWillUnmount() {
    if (isWeb()) {
      window.removeEventListener("beforeunload", this.storeWalletBeforeUnload);
    }
    clearInterval(this.refreshInterval);
  }

  render() {
    const { match } = this.props;

    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        {/* <Idle /> */}
        <Page>
          <Menu />
          <Route path={`${match.url}/assets`} exact component={AssetsDesktop} />
          <Route
            path={`${match.url}/assets/:id`}
            exact
            component={HavenDetails}
          />
          <Route
            path={`${match.url}/transfer`}
            exact
            component={HavenTransfer}
          />
          <Route
            path={`${match.url}/settings`}
            exact
            component={isDesktop() ? SettingsDesktop : SettingsWeb}
          />
          <Route path={`${match.url}/convert`} exact component={ExchangePage} />
        </Page>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: selectIsLoggedIn(state),
  isSyncing: !isWalletSynced(state),
});

export const PrivateRoutes = connect(mapStateToProps, {
  storeWalletInDB,
  refresh,
})(PrivateRoutesContainer);
