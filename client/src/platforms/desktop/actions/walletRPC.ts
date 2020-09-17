import { getWalletStateIPC } from "platforms/desktop/ipc/misc";
import { WalletState } from "platforms/desktop/ipc/ipc-types";
import {
  GET_WALLET_RPC_STATE_SUCCEED,
  SET_NODE_FOR_WALLET_FAILED,
  SET_NODE_FOR_WALLET_REQUESTED,
  SET_NODE_FOR_WALLET_SUCCESS,
} from "platforms/desktop/actions/types";
import { DesktopAppState } from "platforms/desktop/reducers";
import { NodeOption } from "platforms/desktop/pages/_wallet/settings/node/nodeSetting";
import { NodeLocation } from "platforms/desktop/types";
import { setDaemonRPC } from "platforms/desktop/ipc/rpc/rpc";
import { addErrorNotification } from "shared/actions/notification";

export const getWalletRPCState = () => {
  return (dispatch: any, getState: () => DesktopAppState) => {
    getWalletStateIPC()
      .then((res: WalletState) => {
        dispatch(updateWalletRPCState(res));

        if (res.isSyncing) {
         // dispatch(getWalletHeightSucceed(res.syncHeight));
        }
      })
      .catch((err) => dispatch(updateWalletRPCStateFailed(err)));
  };
};

const updateWalletRPCState = (state: WalletState) => {
  return { type: GET_WALLET_RPC_STATE_SUCCEED, payload: state };
};

const updateWalletRPCStateFailed = (err: any) => {
  return { type: GET_WALLET_RPC_STATE_SUCCEED, payload: err };
};

export const setNodeForWallet = (
  selectedNodeOption: NodeOption,
  nodeAddress: string,
  nodePort: string
) => {
  return (dispatch: any, getState: () => DesktopAppState) => {
    dispatch(setNodeForWalletRequested());

    let trusted: boolean;
    let address: string;

    // if using local node, keep address empty
    if (selectedNodeOption.location === NodeLocation.Local) {
      trusted = true;
      address = "";
    } else {
      trusted = false;
      address = nodeAddress + ":" + nodePort;
      const protocolPattern = /^((http|https):\/\/)/;
      if (!protocolPattern.test(address)) {
        address = "http://" + nodeAddress;
      }
    }

    const params = { address: address, trusted };

    setDaemonRPC(params)
      .then((res) => {
        console.log(res);
        dispatch(
          setNodeForWalletSucceed(
            nodeAddress,
            nodePort,
            selectedNodeOption.location
          )
        );
      })
      .catch((error) => {
        dispatch(setNodeForWalletFailed(error));
      })
  };
};

const setNodeForWalletRequested = () => {
  return (dispatch: any) => {
    dispatch({
      type: SET_NODE_FOR_WALLET_REQUESTED,
    });
  };
};

const setNodeForWalletSucceed = (
  address: string,
  port: string,
  location: NodeLocation
) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_NODE_FOR_WALLET_SUCCESS,
      payload: { address, port, location },
    });
  };
};
const setNodeForWalletFailed = (error: any) => {
  return (dispatch: any) => {
    dispatch({ type: SET_NODE_FOR_WALLET_FAILED });
    dispatch(
      addErrorNotification("Changing node is not possible in the moment")
    );
  };
};
