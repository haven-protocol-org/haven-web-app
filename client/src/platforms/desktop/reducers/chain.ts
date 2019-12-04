import {GET_BLOCK_INFO_SUCEED} from "../actions/types";
import {AnyAction} from "redux";
import {DesktopAppState} from ".";
import {SyncState} from "../../../shared/types/types";



interface Chain {

    walletHeight:number;
    nodeHeight:number;
    chainHeight:number;
}



const INITIAL_STATE: Chain = { walletHeight: 0, chainHeight: 0, nodeHeight: 0 };

export const chain = (state = INITIAL_STATE, action: AnyAction): Chain =>  {
    switch (action.type) {
        case GET_BLOCK_INFO_SUCEED:
            return {...state, ...action.payload};
        default:
            return state;
    }
};



export const selectBlockHeight = (state: DesktopAppState) => {
    return state.chain.chainHeight;
};


export const selectNodeHeight = (state: DesktopAppState) => {
    return state.chain.nodeHeight;
};




export const selectDesktopSyncState = (state: DesktopAppState): SyncState => {

    const isSyncing =  state.chain.chainHeight > state.chain.nodeHeight;
    const blockHeight = state.chain.chainHeight;
    const scannedHeight = state.chain.nodeHeight;

    return {isSyncing, blockHeight, scannedHeight};

};
