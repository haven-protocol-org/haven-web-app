import { Store } from "redux";
import watch from "redux-watch";
import { isWalletSynced } from "shared/reducers/chain";
import { storeWalletInDB } from "./actions/storage";

export const addStoreWatchers = (store: Store) => {
    
    // add watcher for sync state of wallet -> when synced store the wallet once
    let syncWatcher = watch(() => isWalletSynced(store.getState()))
    store.subscribe(syncWatcher((isSyncedNow: boolean, wasSyncedBefore: boolean) => {
    if (isSyncedNow && !wasSyncedBefore) {
      store.dispatch(storeWalletInDB());
    }


}))}