import React, { Component } from "react";
import { Settings } from "../../../../../shared/pages/_wallet/settings";
import { IKeys } from "typings";
import { getKeys } from "shared/core/wallet";

export class SettingsWeb extends Component<{}, IKeys> {
  state: IKeys = {
    privateSpend: "*****",
    publicSpend: "*****",
    privateView: "*****",
    publicView: "*****",
    mnemonic: "*****",
  };

  componentDidMount() {
    getKeys().then((keys: IKeys) => {
      this.setState({ ...keys });
    });
  }

  render() {
    return <Settings {...this.state} />;
  }
}
