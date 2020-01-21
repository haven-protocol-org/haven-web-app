// Library Imports
import React, { Component } from "react";

// Relative Imports
import { Pending, Value, Wrapper, Amount } from "./styles";
import { connect } from "react-redux";
import { convertBalanceForReading } from "utility/utility";
import { selectWebSyncState } from "platforms/web/reducers/chain";
import { Spinner } from "../../spinner";
import { ProgressBar } from "../../progress-bar";
import { DesktopAppState } from "platforms/desktop/reducers";
import { WebAppState } from "platforms/web/reducers";
import { SyncState } from "shared/types/types";
import { isDesktop, OFFSHORE_ENABLED } from "constants/env";
import { selectDesktopSyncState } from "platforms/desktop/reducers/chain";
import {NO_BALANCE, selectTotalBalances, XBalances, XViewBalances} from "shared/reducers/xBalance";
import { Ticker } from "shared/reducers/types";
import {fromAtomicUnit} from "platforms/desktop/utility";

interface BalanceProps {
  syncState: SyncState;
  balances: XViewBalances;
}



class Balances extends Component<BalanceProps, any> {

  render() {

    const xUsdAmount = '$' +  this.props.balances.xUSD.balance.toFixed(4);
    const xUsdAmountLocked = '$' +  this.props.balances.xUSD.lockedBalance;
    const btcAmount =  '₿' + this.props.balances.xBTC.balance.toFixed(4);
    const xhvAmount = this.props.balances.XHV.balance.toFixed(2) + ' XHV';
    const { isSyncing, blockHeight, scannedHeight } = this.props.syncState;

    const amount = (scannedHeight / blockHeight) * 100;
    const percentage = amount.toFixed(2);

    return (
      <Wrapper>
        <Amount isSyncing={isSyncing}>
          {this.props.balances.xUSD.balance === 0 ? (
            <Spinner />
          ) : (
            xUsdAmount
          )}
        </Amount>
        <Value>
          {isSyncing ? `Syncing Vault... ${percentage}%` : ` ${btcAmount}   |   ${xhvAmount}`}
        </Value>
        {isSyncing && <ProgressBar percentage={percentage} />}
        {this.props.balances.xUSD.lockedBalance > 0 ? (
          <Pending>
            You have {'$' + xUsdAmountLocked}
            pending.
            <br />
            Balances are updating.
          </Pending>
        ) : null}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: DesktopAppState ) => ({
  balances: selectTotalBalances(state),
  syncState: isDesktop()
    ? selectDesktopSyncState(state as DesktopAppState)
    : selectWebSyncState(state)
});
export const MultiBalance =  connect(mapStateToProps, null)(Balances);
