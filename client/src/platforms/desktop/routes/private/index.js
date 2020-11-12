// Library Imports
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

// Relative Imports

import { AssetsDesktop } from "../../pages/_wallet/assets";
import { HavenDetails } from "../../pages/_wallet/details";
import { ExchangePage } from "../../../../shared/pages/_wallet/exchange";
import { HavenTransfer } from "../../pages/_wallet/transfer";
import { SettingsDesktop } from "../../pages/_wallet/settings";
import { connect } from "react-redux";
import { selectIsLoggedIn } from "../../../../shared/reducers/walletSession";
import Page from "../../../../shared/components/_layout/page";
import Menu from "../../../../shared/components/_layout/menu";
import { isDesktop, isWeb } from "constants/env";
import { SettingsWeb } from "platforms/web/pages/_wallet/settings";
import { storeWalletInDB } from "platforms/web/actions/storage";

/**
 *root component for private wallet
 */
class PrivateRoutesContainer extends Component {


  componentDidMount() {

    if (isWeb()) {
      window.addEventListener('beforeunload', this.storeWalletBeforeUnload);
    }
  }


  async storeWalletBeforeUnload(e){
      await storeWalletInDB();
      delete e['returnValue'];
    }

  componentWillUnmount() {
    if (isWeb()) {
      window.removeEventListener("beforeunload", this.storeWalletBeforeUnload);
    }
  
  }

  render() {
    const { match } = this.props;

    if (!this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
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
});

export const PrivateRoutes = connect(
  mapStateToProps,
  {storeWalletInDB}
)(PrivateRoutesContainer);
