import {
  GET_BLOCK_HEIGHT_FAILED,
  GET_BLOCK_HEIGHT_FETCHING,
  GET_BLOCK_HEIGHT_SUCCEED,
  GET_BLOCK_INFO_FAILED,
  GET_BLOCK_INFO_SUCEED
} from "./types";
import {getInfoRPC, getWalletHeightRPC} from "../ipc/rpc/rpc";
import {DesktopAppState} from "platforms/desktop/reducers";
import {getLastBlockHeader} from "platforms/desktop/actions/blockHeaderExchangeRate";
import {OFFSHORE_ENABLED} from "constants/env";

interface NodeInfoHeights {
  nodeHeight: number;
  chainHeight: number;
}

export const getNodeInfo = () => {

  return (dispatch: any, getState:() => DesktopAppState) => {
    getInfoRPC()
      .then((res: any) => parseHeight(res))
      .then((nodeInfoHeights: NodeInfoHeights) => {

        if (getState().chain.nodeHeight !== nodeInfoHeights.nodeHeight && OFFSHORE_ENABLED){
          dispatch(getLastBlockHeader())
        }
        dispatch(getNodeInfoSucceed(nodeInfoHeights))
          })
      .catch((err: any) => dispatch(getNodeInfoFailed(err)));
  };
};


export const getWalletHeight = () => {

  return (dispatch: any) => {


    dispatch({type:GET_BLOCK_HEIGHT_FETCHING});

    getWalletHeightRPC()
        .then(res => dispatch(getWalletHeightSucceed(res.height)))
        .catch(err => dispatch(getWalletHeightFailed(err)))

  }
};

export const getWalletHeightSucceed = (walletHeight: number) => {

  return {type: GET_BLOCK_HEIGHT_SUCCEED, payload:{walletHeight}};

};

export const getWalletHeightFailed = (err:any) => {

  return {type: GET_BLOCK_HEIGHT_FAILED, payload:err};

};

const getNodeInfoSucceed = (nodeInfo: NodeInfoHeights) => ({
  type: GET_BLOCK_INFO_SUCEED,
  payload: nodeInfo
});
const getNodeInfoFailed = (error: any) => ({
  type: GET_BLOCK_INFO_FAILED,
  payload: error
});

const parseHeight = (rawNodeInfo: any): NodeInfoHeights => {
  return {
    chainHeight: Math.max(rawNodeInfo.height, rawNodeInfo.target_height),
    nodeHeight: rawNodeInfo.height
  };
};
