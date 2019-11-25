import {getOffshoreTransfersRPC} from "../rpc/rpc";
import {GET_OFFSHORE_TRANSFERS_FAILED, GET_OFFSHORE_TRANSFERS_FETCHING, GET_OFFSHORE_TRANSFERS_SUCCEED} from "./types";


export function getOffshoreTransfers() {


  return   (dispatch: any) => {


      dispatch(getOffshoreTransfersFetching());

      const params = { in: true, out: true, pending: true };

      getOffshoreTransfersRPC(params)
          .then( (res: any) => dispatch(getOffshoreTransfersSucceed(res)) )
          .catch( (err: any) => dispatch(getOffshoreTransfersFailed(err)))

    }

}

const getOffshoreTransfersFetching = () => {
    return {type: GET_OFFSHORE_TRANSFERS_FETCHING};
};


const getOffshoreTransfersSucceed = (res: any) => {
  return {type: GET_OFFSHORE_TRANSFERS_SUCCEED, payload: res};
};

const getOffshoreTransfersFailed = (error: any) => {
    return {type: GET_OFFSHORE_TRANSFERS_FAILED, payload: error};
};
