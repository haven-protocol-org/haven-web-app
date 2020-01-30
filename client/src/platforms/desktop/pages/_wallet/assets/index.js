import React, { Component } from "react";
import { Assets } from "../../../../../shared/pages/_wallet/assets";
import { connect } from "react-redux";
import { selectReadableBalance } from "../../../../../shared/reducers/xBalance";

class AssetsDesktopContainer extends Component {
  render() {
    return <Assets {...this.props} />;
  }
}

export const mapStateToProps = state => ({
  readableBalance: Number(selectReadableBalance(state))
});

export const AssetsDesktop = connect(
  mapStateToProps,
  {}
)(AssetsDesktopContainer);
