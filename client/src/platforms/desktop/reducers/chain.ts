import {GET_BLOCK_INFO_SUCEED} from "../actions/types";
import {AnyAction} from "redux";
import {AppState} from "./index";
import {SyncState} from "../../../universal/types/types";



interface Chain {

    walletHeight:0;
    nodeHeight:0;
    chainHeight:0;
}



const INITIAL_STATE: Chain = { walletHeight: 0, chainHeight: 0, nodeHeight: 0 };

const chain = (state = INITIAL_STATE, action: AnyAction): Chain =>  {
    switch (action.type) {
        case GET_BLOCK_INFO_SUCEED:
            return {...state, ...action.payload};
        default:
            return state;
    }
};






export const selectBlockHeight = (state: AppState) => {
    return state.chain.blockHeight;
};



export const selectSyncState = (state: AppState): SyncState => {

    const isSyncing =  state.chain.chainHeight > state.chain.nodeHeight;
    const blockHeight = state.chain.chainHeight;
    const scannedHeight = state.chain.nodeHeight;

    return {isSyncing, blockHeight, scannedHeight};

};
