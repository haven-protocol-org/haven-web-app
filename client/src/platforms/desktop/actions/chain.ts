import { GET_BLOCK_INFO_FAILED, GET_BLOCK_INFO_SUCEED } from "./types";
import { getInfoRPC } from "../ipc/rpc/rpc";
import { Dispatch } from "redux";
import {DesktopAppState} from "platforms/desktop/reducers";
import {getLastBlockHeader} from "platforms/desktop/actions/blockHeaderExchangeRate";

interface NodeInfoHeights {
  nodeHeight: number;
  chainHeight: number;
}

export const getNodeInfo = () => {
  return (dispatch: any, getState:() => DesktopAppState) => {
    getInfoRPC()
      .then((res: any) => parseHeight(res))
      .then((nodeInfoHeights: NodeInfoHeights) => {

        if (getState().chain.nodeHeight !== nodeInfoHeights.nodeHeight){
          dispatch(getLastBlockHeader())
        }
        dispatch(getNodeInfoSucceed(nodeInfoHeights))
          })
      .catch((err: any) => dispatch(getNodeInfoFailed(err)));
  };
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
    chainHeight: rawNodeInfo.target_height,
    nodeHeight: rawNodeInfo.height
  };
};
