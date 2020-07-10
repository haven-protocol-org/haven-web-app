import {
  GET_BLOCK_HEIGHT_FAILED,
  GET_BLOCK_HEIGHT_FETCHING,
  GET_BLOCK_HEIGHT_SUCCEED,
  GET_BLOCK_INFO_FAILED,
  GET_BLOCK_INFO_SUCEED,
  RESCAN_FAILED,
  RESCAN_SUCCEED,
  START_RESCAN,
} from "./types";
import {
  getInfoRPC,
  getWalletHeightRPC,
  rescanBlockchainRPC,
} from "../ipc/rpc/rpc";
import { DesktopAppState } from "platforms/desktop/reducers";
import { getLastBlockHeader } from "platforms/desktop/actions/blockHeaderExchangeRate";
import { OFFSHORE_ENABLED } from "constants/env";
import { getExchangeRates } from "shared/actions/exchangeRates";

interface NodeInfoHeights {
  nodeHeight: number;
  chainHeight: number;
}

export const getNodeInfo = () => {
  return (dispatch: any, getState: () => DesktopAppState) => {
    getInfoRPC()
      .then((res: any) => parseHeight(res))
      .then((nodeInfoHeights: NodeInfoHeights) => {
        if (
          isNewBlockAdded(
            getState().chain.nodeHeight,
            nodeInfoHeights.nodeHeight
          )
        ) {
          if (OFFSHORE_ENABLED) {
            dispatch(getLastBlockHeader());
          } else {
            // get exhchange rates from api if offshore feature is not active yet
            dispatch(getExchangeRates());
          }
        }
        dispatch(getNodeInfoSucceed(nodeInfoHeights));
      })
      .catch((err: any) => dispatch(getNodeInfoFailed(err)));
  };
};

export const getWalletHeight = () => {
  return (dispatch: any) => {
    dispatch({ type: GET_BLOCK_HEIGHT_FETCHING });

    getWalletHeightRPC()
      .then((res) => dispatch(getWalletHeightSucceed(res.height)))
      .catch((err) => dispatch(getWalletHeightFailed(err)));
  };
};

export const getWalletHeightSucceed = (walletHeight: number) => {
  return { type: GET_BLOCK_HEIGHT_SUCCEED, payload: { walletHeight } };
};

export const getWalletHeightFailed = (err: any) => {
  return { type: GET_BLOCK_HEIGHT_FAILED, payload: err };
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
