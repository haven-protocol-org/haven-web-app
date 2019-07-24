import {getAddressRPC, getHeightRPC} from "../rpc/rpc";
import {GET_ADDRESS_FAILED, GET_ADDRESS_FETCHING, GET_ADDRESS_SUCCEED, GET_BLOCK_HEIGHT_SUCEED} from "./types";

export * from './prices';
export * from './wallet';
export * from './balance';
export * from './transfer';
export * from './key';
export * from './theme';



export const getAddress = () => {

    return(dispatch) => {

        dispatch(getAddressFetching());
        getAddressRPC()
            .then(result => dispatch(getAddressSucceed(result)))
            .catch(error => dispatch(getAddressFailed(error)));
    }
};

const getAddressFetching = () => ({type: GET_ADDRESS_FETCHING});
const getAddressSucceed = (result) => ({type: GET_ADDRESS_SUCCEED, payload:result});
const getAddressFailed = (error) => ({type: GET_ADDRESS_FAILED, payload: error});


export const getHeight = () => {

  return(dispatch, state) => {
    getHeightRPC()
        .then(result => getHeightSucceed(result.height))
        .catch(error => getHeightFailed(error));
  }
};

const getHeightSucceed = (height) => ({type: GET_BLOCK_HEIGHT_SUCEED, payload:height});
const getHeightFailed = (error) => ({type: GET_BLOCK_HEIGHT_SUCEED, payload: error});


//export const


