import { getTxs as getTxsCore} from "shared/core/wallet"
import { addErrorNotification } from "./notification";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import { GET_TRANSFERS_SUCCEED, GET_TRANSFERS_FETCHING, GET_TRANSFERS_FAILED } from "./types";


export const getAllTransfers = () => {


    return async(dispatch: any) => {
        dispatch(getTransfersFetching());

        try {
            const transfers:MoneroTxWallet[] = await getTxsCore();
            dispatch(getTransfersSucceed(transfers));
        }
        catch(e) {

            dispatch(addErrorNotification(e));
            dispatch(getTransfersFailed(e));
        }
    }

}

const getTransfersSucceed = (walletTxs: MoneroTxWallet[]) => ({
    type: GET_TRANSFERS_SUCCEED,
    payload: walletTxs,
  });


const getTransfersFetching = () => ({
    type: GET_TRANSFERS_FETCHING,
    payload: { isFetching: true },
  });
  
  
  
  const getTransfersFailed = (error: any) => ({
    type: GET_TRANSFERS_FAILED,
    payload: error,
  });
  