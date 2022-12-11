import bigInt from "big-integer";
import { walletProxy } from "shared/core/proxy"
import { convertBalanceToMoney } from "utility/utility";
import { ADD_BLOCK_CAP } from "./types";



export const getBlockCap = () => {

    return async (dispatch: any) => {

    try {
        
        const response = await walletProxy.getBlockCap();
        const blockCap = bigInt(response.toString())
        
        dispatch(addBlockCap(convertBalanceToMoney(blockCap)));
        }catch(e) {
            console.log(e);
        }

    }
}

const addBlockCap = (blockCap: number) => ({type:ADD_BLOCK_CAP, payload:{blockCap}})