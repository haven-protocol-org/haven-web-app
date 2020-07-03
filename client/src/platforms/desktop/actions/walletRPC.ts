import { getWalletStateIPC} from "platforms/desktop/ipc/misc";
import {HavendState} from "platforms/desktop/ipc/ipc-types";
import {GET_WALLET_RPC_STATE_SUCCEED} from "platforms/desktop/actions/types";

export const getWalletRPCState = () => {
    return (dispatch: any) => {
        getWalletStateIPC()
            .then((res: HavendState) => {
                dispatch(updateWalletRPCState(res));
            })
            .catch((err) => dispatch(updateWalletRPCStateFailed(err)));
    };
};

const updateWalletRPCState = (state: HavendState) => {
    return { type: GET_WALLET_RPC_STATE_SUCCEED, payload: state };
};

const updateWalletRPCStateFailed = (err: any) => {
    return { type: GET_WALLET_RPC_STATE_SUCCEED, payload: err };
};
