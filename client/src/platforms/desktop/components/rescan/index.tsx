// Library Imports
import React from "react";

import { Icon } from "./styles";
import { DesktopAppState } from "../../reducers";
import { selectIsLoggedIn } from "../../reducers/walletSession";
import { connect } from "react-redux";
import { closeWallet, rescanBlockChain } from "../../actions";
import { selectRefreshing } from "platforms/desktop/reducers/chain";

const RefreshIconComponent = (props: any) => {
  return (
    <Icon
      onClick={(e: any) => props.isRefreshing || props.rescanBlockChain()}
    />
  );
};

const mapStateToProps = (state: DesktopAppState) => ({
  isRefreshing: selectRefreshing(state),
});

export const Refresh = connect(mapStateToProps, {
  rescanBlockChain,
})(RefreshIconComponent);
