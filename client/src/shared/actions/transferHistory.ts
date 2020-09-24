import { getTransfers as getTransfersCore, getTxs as getTxsCore } from "shared/core/wallet"
import { addErrorNotification } from "./notification";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";


export const getAllTransfers = () => {

    return async(dispatch: any) => {
        try {

            const transfers:MoneroTxWallet[] = await getTransfersCore();
        }
        catch(e) {

            dispatch(addErrorNotification(e));

        }
    }

}