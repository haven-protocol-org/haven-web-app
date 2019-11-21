import {AnyAction, Dispatch} from "redux";
import {GET_BLOCK_HEADER_EXCHANGE_RATE_FETCH, GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED} from "./types";
import {getLastBlockHeaderRPC} from "../rpc/rpc";
import {IBlockHeaderRate} from "../reducers/blockHeaderExchangeRates";






export const getLastBlockHeader = () => {

    return (dispatch:Dispatch) => {

        dispatch({type: GET_BLOCK_HEADER_EXCHANGE_RATE_FETCH});

        getLastBlockHeaderRPC()
            .then( (res: any) => createRecordEntry(res))
            .then( (priceEntry: Record<number, IBlockHeaderRate>) => dispatch(getLastBlockerHeaderSucceed(priceEntry)))
            .catch()

    }

};



const createRecordEntry = (rawBlockHeaderData: any): Record<number, IBlockHeaderRate> => {

    const blockHeight:number = rawBlockHeaderData.height;
    const record: Record<number, IBlockHeaderRate> = { blockHeight : rawBlockHeaderData.pricing_record } as Record<number, IBlockHeaderRate>;
    return record;
};





export const getLastBlockerHeaderSucceed = (priceRecord: Record<number, IBlockHeaderRate>): AnyAction  => {

    return {type: GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED, payload: priceRecord};

};
