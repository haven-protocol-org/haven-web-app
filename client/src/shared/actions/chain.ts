import {
  GET_WALLET_HEIGHT_FAILED,
  GET_WALLET_HEIGHT_FETCHING,
  GET_WALLET_HEIGHT_SUCCEED,
  GET_BLOCK_INFO_FAILED,
  GET_BLOCK_INFO_SUCEED,
  RESCAN_FAILED,
  RESCAN_SUCCEED,
  START_RESCAN,
} from "../../platforms/desktop/actions/types";
import {
  getInfoRPC,
  getWalletHeightRPC,
  rescanBlockchainRPC,
} from "../../platforms/desktop/ipc/rpc/rpc";
import { DesktopAppState } from "platforms/desktop/reducers";
import { getLastBlockHeader } from "shared/actions/blockHeaderExchangeRate";
import { updateHavenFeatures } from "shared/actions/havenFeature";
import { Chain } from "shared/reducers/chain";

interface NodeInfoHeights {
  nodeHeight: number;
  chainHeight: number;
}

export const getNodeInfo = () => {
  return (dispatch: any, getState: () => DesktopAppState) => {
    getInfoRPC()
      .then((res: any) => parseHeight(res))
      .then((nodeInfoHeights: NodeInfoHeights) => {
        dispatch(updateHavenFeatures(nodeInfoHeights.chainHeight));

        if (
          isNewBlockAdded(
            getState().chain.nodeHeight,
            nodeInfoHeights.nodeHeight
          )
        ) {
            dispatch(getLastBlockHeader());
        }
        dispatch(getNodeInfoSucceed(nodeInfoHeights));
      })
      .catch((err: any) => dispatch(getNodeInfoFailed(err)));
  };
};

export const getWalletHeight = () => {
  return (dispatch: any) => {
    dispatch({ type: GET_WALLET_HEIGHT_FETCHING });

    getWalletHeightRPC()
  //    .then((res) => dispatch(getWalletHeightSucceed(res.height)))
      .catch((err) => dispatch(getWalletHeightFailed(err)));
  };
};

export const onWalletSyncUpdateSucceed = (heights: Chain) => {
  return { type: GET_WALLET_HEIGHT_SUCCEED, payload: heights };
};

export const getWalletHeightFailed = (err: any) => {
  return { type: GET_WALLET_HEIGHT_FAILED, payload: err };
};

const getNodeInfoSucceed = (nodeInfo: NodeInfoHeights) => ({
  type: GET_BLOCK_INFO_SUCEED,
  payload: nodeInfo,
});
const getNodeInfoFailed = (error: any) => ({
  type: GET_BLOCK_INFO_FAILED,
  payload: error,
});

const parseHeight = (rawNodeInfo: any): NodeInfoHeights => {
  return {
    chainHeight: Math.max(rawNodeInfo.height, rawNodeInfo.target_height),
    nodeHeight: rawNodeInfo.height,
  };
};

export const rescanBlockChain = () => {
  return (dispatch: any) => {
    dispatch(startRescan());

    rescanBlockchainRPC()
      .then(() => dispatch(rescanSucceed()))
      .catch((err) => dispatch(rescanFailed()));
  };
};

const startRescan = () => {
  return { type: START_RESCAN };
};

const rescanSucceed = () => {
  return { type: RESCAN_SUCCEED };
};

const rescanFailed = () => {
  return { type: RESCAN_FAILED };
};

const isNewBlockAdded = (oldHeight: number, currentHeight: number) => {
  return oldHeight !== currentHeight;
};
