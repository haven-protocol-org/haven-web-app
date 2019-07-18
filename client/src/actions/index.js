import {getHeightRPC} from "../rpc/rpc";
import {GET_BLOCK_HEIGHT_SUCEED} from "./types";

export * from './prices';
export * from './wallet';
export * from './balance';
export * from './transfer';
export * from './key';
export * from './theme';






export const  getHeight = () => {

  return(dispatch, state) => {

    getHeightRPC()
        .then(result => getHeightSucceed(result.height))
        .catch(error => getHeightFailed(error));
  }
};

const getHeightSucceed = (height) => ({type: GET_BLOCK_HEIGHT_SUCEED, payload:height});
const getHeightFailed = (error) => ({type: GET_BLOCK_HEIGHT_SUCEED, payload: error});


