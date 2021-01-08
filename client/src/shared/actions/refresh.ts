import { isDesktop } from "constants/env";
import { getLocalNodeState } from "platforms/desktop/actions/localNode";
import { HavenAppState } from "platforms/desktop/reducers";
import { walletProxy } from "shared/core/proxy";
import { MODAL_TYPE } from "shared/reducers/modal";
import { getHeightOfFirstIncomingTx, hasNoTxsEntries } from "shared/reducers/xTransferList";
import { getAppConnectionState, getWalletConnectionState } from "./connection";
import { hideModal, showModal } from "./modal";
import { getAllTransfers } from "./transferHistory";
import { SET_RESTORE_HEIGHT } from "./types";
import { saveWallet } from "./walletSession";


// a few things we need to refresh
export const refresh = () => {

    return (dispatch: any) => {
        dispatch(getWalletConnectionState());
        dispatch(getAppConnectionState());
        if (isDesktop()) {
            dispatch(getLocalNodeState());
        }
    }
}



export const syncFromFirstIncomingTx = () => {

    return async(dispatch: any, getState:() =>  HavenAppState) => {
        
        if (hasNoTxsEntries(getState()))
        {
            await dispatch(getAllTransfers());
        }

        let newSyncHeight = getHeightOfFirstIncomingTx(getState());
        console.log(newSyncHeight);

        dispatch({type: SET_RESTORE_HEIGHT, payload: newSyncHeight});

       // await walletProxy.stopSyncing();
        if (newSyncHeight !== -1) {

            // give 5 blocks tolerance 
            newSyncHeight = Math.max(newSyncHeight -5, 0);
            await walletProxy.setSyncHeight(newSyncHeight);
        }
        dispatch(showModal(MODAL_TYPE.RescanBC));
        await walletProxy.rescanBlockchain();
        dispatch(saveWallet());
        dispatch(hideModal());
    }

}


export const rescanSpent = () => {

    return async(dispatch: any, getState:() =>  HavenAppState) => {
    
        dispatch({type:"RESCAN_SPENT"});
       walletProxy.rescanSpent();
    }

}