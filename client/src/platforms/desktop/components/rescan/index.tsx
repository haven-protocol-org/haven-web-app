// Library Imports
import React from "react";

import { Icon } from "./styles";
import { DesktopAppState } from "../../reducers";
import { connect } from "react-redux";
import { rescanBlockchain } from "shared/actions/wallet";

const RefreshIconComponent = (props: any) => {
  return (
    <Icon
      onClick={(e: any) => props.isRefreshing || props.rescanBlockchain()}
    />
  );
};

const mapStateToProps = (state: DesktopAppState) => ({
  isRefreshing: false,
});

export const Refresh = connect(mapStateToProps, {
  rescanBlockchain,
})(RefreshIconComponent);
