import { isDesktop } from "constants/env";
import { getLocalNodeState } from "platforms/desktop/actions/localNode";
import { HavenAppState } from "platforms/desktop/reducers";
import { getNodeForWallet } from "platforms/web/actions";
import { walletProxy } from "shared/core/proxy";
import { MODAL_TYPE } from "shared/reducers/modal";
import { getHeightOfFirstIncomingTx, hasNoTxsEntries } from "shared/reducers/xTransferList";
import { logM } from "utility/utility";
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


export const syncRollback = () => {

    return async(dispatch: any, getState:() =>  HavenAppState) => {
        
       
         //@ts-ignore
     //   await walletProxy.setDaemonConnection();
        await walletProxy.stopSyncing(); 
        let rollbackSyncHeight = 886570;
        logM("rollback");
        let currentSyncHeight = await walletProxy.getSyncHeight();
        logM("currentSyncHeight : "+ currentSyncHeight)
        // set temporary sync height to rollback height
        await walletProxy.setSyncHeight(rollbackSyncHeight);
        dispatch(showModal(MODAL_TYPE.RescanBC));
        //trigger rescan
        logM("start rescan");
       // walletProxy.setDaemonConnection(getNodeForWallet(getState)!);
        await walletProxy.rescanBlockchain();
        logM("rescan finished");
        // set back to correct refresh height
        await walletProxy.setSyncHeight(currentSyncHeight);
        dispatch(saveWallet());
        dispatch(hideModal());
        // start normal sync again
        walletProxy.syncWallet();
    }
}




export const syncFromFirstIncomingTx = () => {

    return async(dispatch: any, getState:() =>  HavenAppState) => {
        
        if (hasNoTxsEntries(getState()))
        {
            await dispatch(getAllTransfers());
        }

        let currentSyncHeight = await walletProxy.getSyncHeight();

        let newSyncHeight = getHeightOfFirstIncomingTx(getState());

        dispatch({type: SET_RESTORE_HEIGHT, payload: newSyncHeight});

       // await walletProxy.stopSyncing();
        if (newSyncHeight !== -1) {

            // give 5 blocks tolerance 
            newSyncHeight = Math.max(newSyncHeight -5, currentSyncHeight, 0);
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