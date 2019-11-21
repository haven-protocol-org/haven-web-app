import {Action, AnyAction} from "redux";
import {GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED} from "../actions/types";


export interface IBlockHeaderRate  {

    signature: string,
    unused1: bigint,
    unused2: bigint,
    unused3: bigint,
    xAG: bigint,
    xAU: bigint,
    xAUD: bigint,
    xBTC: bigint,
    xCAD: bigint,
    xCHF: bigint,
    xCNY: bigint,
    xEUR: bigint,
    xGBP: bigint,
    xJPY: bigint,
    xNOK: bigint,
    xNZD: bigint,
    xUSD: bigint
};


const INITIAL_STATE: Record<number, IBlockHeaderRate> = {};


export const blockHeaderExchangeRate = (state: Record<number,IBlockHeaderRate>, action: AnyAction): Record<number,IBlockHeaderRate> => {

    switch (action.type) {


        case GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED:
        return {...state, ...action.payload };


        default:
            return state;

    }


};
