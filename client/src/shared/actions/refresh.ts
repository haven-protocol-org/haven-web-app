import { isDesktop } from "constants/env";
import { getLocalNodeState } from "platforms/desktop/actions/localNode";
import { getAppConnectionState, getWalletConnectionState } from "./connection";


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