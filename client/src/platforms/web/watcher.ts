import { DispatchFunctionType } from "platforms/desktop";
import { Action, Store } from "redux";
import watch from "redux-watch";
import { getLastBlockHeader } from "shared/actions/blockHeaderExchangeRate";
import { initChainData } from "shared/actions/walletSession";
import { walletProxy } from "shared/core/proxy";
import { isWalletSynced } from "shared/reducers/chain";
import { storeWalletInDB } from "./actions/storage";
import { WebAppState } from "./reducers";

export const addStoreWatchers = (store: Store<WebAppState, Action<WebAppState>> & {dispatch: DispatchFunctionType}) => {
    
    // add watcher for sync state of wallet -> when synced store the wallet once
    let syncWatcher = watch(() => isWalletSynced(store.getState()))
    store.subscribe(syncWatcher((isSyncedNow: boolean, wasSyncedBefore: boolean) => {
    if (isSyncedNow && !wasSyncedBefore) {
      store.dispatch(storeWalletInDB());
      //@ts-ignore
     // store.dispatch(getLastBlockHeader())
    }


}))

}
