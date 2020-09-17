// Library Imports
import React from "react";

import { Icon } from "./styles";
import { DesktopAppState } from "../../reducers";
import { selectIsLoggedIn } from "../../../../shared/reducers/walletSession";
import { connect } from "react-redux";
import { closeWallet, rescanBlockChain } from "../../actions";

const RefreshIconComponent = (props: any) => {
  return (
    <Icon
      onClick={(e: any) => props.isRefreshing || props.rescanBlockChain()}
    />
  );
};

const mapStateToProps = (state: DesktopAppState) => ({
  isRefreshing: false,
});

export const Refresh = connect(mapStateToProps, {
  rescanBlockChain,
})(RefreshIconComponent);
