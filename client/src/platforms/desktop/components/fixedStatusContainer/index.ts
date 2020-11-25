/** this class takes care about status messages which are sticky and appearance and disappearance is dependent on the state**/
import { connect } from "react-redux";
import { DesktopAppState } from "platforms/desktop/reducers";
import { selectSyncState } from "shared/reducers/chain";
import { Component } from "react";
import {
  addErrorNotification,
  addNotificationByKey,
  removeNotification,
} from "shared/actions/notification";
import { uuidv4 } from "utility/utility";
import {
  IS_SYNCING_MESSAGE,
  SYNCING_SUCCEED_MESSAGE,
  WALLET_CONNECT_SUCCEED,
  WALLET_IS_CONNECTING,
  WALLET_NEEDS_CONNECTION,
} from "constants/notificationList";
import { NotificationDuration } from "shared/reducers/notification";
import { selectIsLoggedIn } from "shared/reducers/walletSession";

interface FixedStatusProps {
  daemonUrl: string;
  isSyncing: boolean;
  isWalletConnected: boolean;
  isLoggedIn: boolean;
  addNotificationByKey: (
    key: any,
    duration?: NotificationDuration,
    id?: string,
    templateVars?: Array<string> | null
  ) => void;
  removeNotification: (id: string) => void;
  addErrorNotification: (msg: string) => void;
}

class FixedStatusContainer extends Component<FixedStatusProps, any> {
  private syncingMessageID: string | null = null;
  private tryingConnectMessageID: string | null = null;

  componentDidUpdate(
    prevProps: Readonly<FixedStatusProps>,
    prevState: Readonly<any>,
    snapshot?: any
  ): void {
    this.checkAndHandleSyncState(prevProps.isSyncing, this.props.isSyncing);
    this.checkAndHandleConnectionState(
      prevProps.isWalletConnected,
      this.props.isWalletConnected
    );
    this.checkAndHandleLoggedInState(
      prevProps.isLoggedIn,
      this.props.isLoggedIn,
      this.props.isWalletConnected
    );
  }

  checkAndHandleSyncState(didSyncBefore: boolean, isSyncingNow: boolean) {
    // show a sync message
    if (isSyncingNow && !this.syncingMessageID) {
      const id = uuidv4();
      this.props.addNotificationByKey(
        IS_SYNCING_MESSAGE,
        NotificationDuration.STICKY,
        id
      );
      this.syncingMessageID = id;
    }

    // if sync succeed, remove fixed message and show success message
    if (!isSyncingNow && this.syncingMessageID) {
      this.props.removeNotification(this.syncingMessageID);
      this.syncingMessageID = null;
      this.props.addNotificationByKey(SYNCING_SUCCEED_MESSAGE);
    }
  }

  checkAndHandleConnectionState(
    didWalletConnectBefore: boolean,
    isWalletConnectedNow: boolean
  ) {
    // show a trying to connect message
    if (
      isWalletConnectedNow === false &&
      didWalletConnectBefore !== isWalletConnectedNow &&
      !this.tryingConnectMessageID
    ) {
      const nodeName =
        this.props.daemonUrl === "" ? "local node" : this.props.daemonUrl;

      const id = uuidv4();
      this.props.addNotificationByKey(
        WALLET_IS_CONNECTING,
        NotificationDuration.STICKY,
        id,
        [nodeName]
      );
      this.tryingConnectMessageID = id;
    }

    // if connection succeed, remove fixed message and show success message
    if (
      isWalletConnectedNow === true &&
      didWalletConnectBefore === false &&
      this.tryingConnectMessageID
    ) {
      const nodeName =
        this.props.daemonUrl === "" ? "local node" : this.props.daemonUrl;
      this.props.removeNotification(this.tryingConnectMessageID);
      this.tryingConnectMessageID = null;
      this.props.addNotificationByKey(
        WALLET_CONNECT_SUCCEED,
        NotificationDuration.DEFAULT,
        uuidv4(),
        [nodeName]
      );
    }
  }

  checkAndHandleLoggedInState(
    loggedInBefore: boolean,
    loggedInNow: boolean,
    isConnected: boolean
  ) {
    if (!loggedInBefore && loggedInNow && isConnected !== true) {
      this.props.addNotificationByKey(WALLET_NEEDS_CONNECTION);
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: DesktopAppState) => ({
  isLoggedIn: selectIsLoggedIn(state),
  isSyncing: selectSyncState(state).isSyncing,
  isWalletConnected: state.walletSession.isWalletConectedToDaemon,
  daemonUrl: state.connectedNode.address,
});

export const FixedStatus = connect(mapStateToProps, {
  addNotificationByKey,
  removeNotification,
  addErrorNotification,
})(FixedStatusContainer);
