import bigInt from "big-integer";
import { walletProxy } from "shared/core/proxy"
import { CirculatingSupply } from "shared/reducers/circulatingSupply";
import { Ticker } from "shared/reducers/types";
import { ADD_CIRCULATING_SUPPLY } from "./types";


export const getCirculatingSupply = () => {

    return async (dispatch: any) => {

    try {
        //@ts-ignore
        const circulatingSupply:any = await walletProxy.getCirculatingSupply();
        let parsedCirculatingSupply:CirculatingSupply = circulatingSupply.toDict();
        Object.entries(parsedCirculatingSupply).forEach(([key, value]) => {
            parsedCirculatingSupply[key as Ticker] = bigInt(value!.toString());
            });

        dispatch(addCirculatingSupply(parsedCirculatingSupply));
        }catch(e) {
            console.log(e);
        }

    }
}

const addCirculatingSupply = (supply: CirculatingSupply) => ({type:ADD_CIRCULATING_SUPPLY, payload:supply})