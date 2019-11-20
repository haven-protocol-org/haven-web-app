import {Dispatch} from "redux";
import {GET_BLOCK_HEADER_EXCHANGE_RATE_FETCH} from "./types";



interface GetBlockHeaderExchangeRateFetchAction  {

};






export const getLastBlockHeader = () => {

    return (dispatch:Dispatch) => {

        dispatch({type: GET_BLOCK_HEADER_EXCHANGE_RATE_FETCH});



    }

};
