import { getTransfers as getTransfersCore, getTxs as getTxsCore } from "shared/core/wallet"


export const getAllTransfers = () => {


    return async(dispatch: any) => {


       // const transfers = await getTransfersCore();

        // console.log(transfers);


        const txs = await getTxsCore();

        console.log(txs);

        dispatch({type:'TEST_TRANSFERS'});

    }

}