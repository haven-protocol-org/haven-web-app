import { selectIsLoggedIn } from "shared/reducers/walletSession";
import { connect } from "react-redux";
import { createNewWallet, startWalletSession } from "shared/actions/wallet";

import { Component } from "react";
import React from "react";
import { WebAppState } from "platforms/web/reducers";
import { selectisRequestingWalletCreation } from "shared/reducers/walletCreation";
import { storeKeyFileToDisk } from "platforms/web/actions/storage";
import { CreateWebComponent } from "platforms/web/pages/_auth/create/multi-create";

export class CreateWeb extends Component<{}, {}> {
  render() {
    return <CreateWebComponent />;
  }
}
