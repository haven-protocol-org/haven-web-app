import bigInt from "big-integer";
import { HavenAppState } from "platforms/desktop/reducers";
import { AnyAction } from "redux";
import { ADD_CIRCULATING_SUPPLY } from "shared/actions/types";
import { selectLastExchangeRates } from "./blockHeaderExchangeRates";
import { Ticker } from "./types";

export type CirculatingSupply = Record<Ticker, bigInt.BigInteger>

let tempObj: any = {};
Object.values(Ticker).forEach( ticker => tempObj[ticker] =  bigInt.zero )
const INITALSTATE: CirculatingSupply = tempObj


export const circulatingSupply = (state: CirculatingSupply = INITALSTATE, action: AnyAction) => {

    switch (action.type) {
        case ADD_CIRCULATING_SUPPLY:
            return {...action.payload};
        default:
                return state;
    }


};

// calculates the ratio of xassetsMC / xhvMC
export const selectMcRatio = (state: HavenAppState) => {

    const circulatingSupply = state.circulatingSupply;
    const lastExchangeRates = selectLastExchangeRates(state);
    if (!lastExchangeRates)
    return null;
    const {XHV : xhvSupply,...xassetsSupply} = circulatingSupply;
    const ATOMIC_UNITS:bigInt.BigInteger = bigInt(Math.pow(10, 12))
    // use  MA24 --> UNUSED1
    const xhvMarketCap = xhvSupply.multiply(lastExchangeRates.UNUSED1).divide(bigInt(Math.pow(10, 24)));

    const xassetMarketCap:bigInt.BigInteger = Object.keys(xassetsSupply).reduce((mCap, ticker) => {
      const rateInvertUSD = ticker === Ticker.xUSD? ATOMIC_UNITS : lastExchangeRates![ticker as Ticker]
      const supply = (xassetsSupply as CirculatingSupply)[ticker as Ticker];
      //rate is invert to we divide instead of multiply
      const assetMCap = supply.divide(rateInvertUSD);
      return mCap.add(assetMCap);

    },bigInt.zero )
  
    const mcRatio =  xassetMarketCap.toJSNumber() / xhvMarketCap.toJSNumber();
    return mcRatio;
}


export const selectOffshoreVBS = (state: HavenAppState): number | null => {

    const mcRatio = selectMcRatio(state);
    if(!mcRatio){
        return null;
    }

    let offshoreVBS: number;

    if (mcRatio < 0.9) {
        offshoreVBS = Math.exp(Math.pow(mcRatio + Math.sqrt(mcRatio), 2)) - 0.5;
    } else {
        offshoreVBS = Math.sqrt(mcRatio) * 40;
    }
    return offshoreVBS;
}

export const selectOnshoreVBS = (state: HavenAppState): number | null => {

    const mcRatio = selectMcRatio(state);
    if(!mcRatio){
        return null;
    }

    let spreadRatio: number;

    if (mcRatio < 1) {
        spreadRatio = 1 - mcRatio; 
    } else {
        spreadRatio = 0;
    }

    const offshoreVBS = selectOffshoreVBS(state);
    const spreadVBS = Math.exp(1+Math.sqrt(spreadRatio)) + 1.5
    const onshoreVBS = Math.max(spreadVBS, offshoreVBS!);

    return onshoreVBS;
}