import { AnyAction} from "redux";
import {GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED} from "../actions/types";
import {AppState} from ".";


export type Ticker = 'xUSD' | 'XHV';

export interface ConversionRate {

    fromTicker: Ticker;
    toTicker: Ticker;
    xRate: number;
    xRateRevert: number;
}



export const ATOMIC_UNITS = 1000000000000;


export interface IBlockHeaderRate  {

    signature: string,
    unused1: number,
    unused2: number,
    unused3: number,
    xAG: number,
    xAU: number,
    xAUD: number,
    xBTC: number,
    xCAD: number,
    xCHF: number,
    xCNY: number,
    xEUR: number,
    xGBP: number,
    xJPY: number,
    xNOK: number,
    xNZD: number,
    xUSD: number
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


export const selectConversionRates = (state:AppState) => {


};
