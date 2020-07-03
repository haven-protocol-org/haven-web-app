import { AnyAction } from "redux";
import {GET_WALLET_RPC_STATE_SUCCEED} from "platforms/desktop/actions/types";
import {WalletState} from "platforms/desktop/ipc/ipc-types";




const INITAL_STATE: WalletState = {

    isConnectedToDaemon: true,
    isSyncing: false,
    syncHeight: 0,
    isRunning: true
};

export const walletRPC = (
    state = INITAL_STATE,
    action: AnyAction
): WalletState => {
    switch (action.type) {
        case GET_WALLET_RPC_STATE_SUCCEED:
            return { ...action.payload };
        default:
            return state;
    }
};
