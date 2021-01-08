import { Action, AnyAction, Store } from "redux";
import watch from "redux-watch";
import { getLastBlockHeader } from "shared/actions/blockHeaderExchangeRate";
import { initChainData, saveWallet } from "shared/actions/walletSession";
import { walletProxy } from "shared/core/proxy";
import { isWalletSynced } from "shared/reducers/chain";
import { DispatchFunctionType } from ".";
import { DesktopAppState } from "./reducers";

export const addDesktopStoreWatchers = (store: Store<DesktopAppState, Action<DesktopAppState>> & {dispatch: DispatchFunctionType}) => {
    
    // add watcher when we are connected to a daemon again
    let connectWatcher = watch(() => store.getState().connectedNode.isWalletConectedToDaemon)
    store.subscribe(connectWatcher((isConnected: boolean, wasConnected: boolean) => {
    if (isConnected && !wasConnected) {
        store.dispatch(initChainData() );
        store.dispatch(getLastBlockHeader());
        walletProxy.syncWallet();
    }
}))



        // add watcher for sync state of wallet -> when synced store the wallet once
        let syncWatcher = watch(() => isWalletSynced(store.getState()))
        store.subscribe(syncWatcher((isSyncedNow: boolean, wasSyncedBefore: boolean) => {
        if (isSyncedNow && !wasSyncedBefore) {
          store.dispatch(saveWallet());
        }
}))

}


