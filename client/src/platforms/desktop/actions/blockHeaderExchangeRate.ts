import {AnyAction, Dispatch} from "redux";
import {GET_BLOCK_HEADER_EXCHANGE_RATE_FETCH, GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED} from "./types";
import {getLastBlockHeaderRPC} from "../rpc/rpc";
import {BlockHeaderRate} from "../reducers/blockHeaderExchangeRates";






export const getLastBlockHeader = () => {

    return (dispatch:Dispatch) => {

        dispatch({type: GET_BLOCK_HEADER_EXCHANGE_RATE_FETCH});

        getLastBlockHeaderRPC()
            .then( (res: any) => createRecordEntry(res))
            .then( (priceEntry: BlockHeaderRate) => dispatch(getLastBlockerHeaderSucceed(priceEntry)))
            .catch()

    }

};



const createRecordEntry = (rawBlockHeaderData: any): BlockHeaderRate => {

    const blockHeader = rawBlockHeaderData.block_header;
    const blockHeight:number = blockHeader.height;
    const priceRecord: BlockHeaderRate = blockHeader.pricing_record;
    priceRecord.height = blockHeight;
    return priceRecord;
};





export const getLastBlockerHeaderSucceed = (priceRecord: BlockHeaderRate): AnyAction  => {

    return {type: GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED, payload: priceRecord};

};
