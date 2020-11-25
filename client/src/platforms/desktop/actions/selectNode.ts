import {
  SET_NODE_FOR_WALLET_FAILED,
  SET_NODE_FOR_WALLET_REQUESTED,
  SET_NODE_FOR_WALLET_SUCCESS,
} from "./types";
import { NodeLocation } from "platforms/desktop/types";
import { DesktopAppState } from "platforms/desktop/reducers";
import { addErrorNotification } from "shared/actions/notification";
import { NodeOption } from "../pages/_wallet/settings/node/nodeSetting";
import { walletProxy, havendProxy } from "shared/core/proxy";
import { IMonerRPCConnection } from "typings";
import { startLocalNode, stopLocalNode } from "./localNode";

export const setNodeForWallet = (
  selectedNodeOption: NodeOption,
  nodeAddress: string,
  nodePort: string
) => {
  return async(dispatch: any, getState: () => DesktopAppState) => {
    dispatch(setNodeForWalletRequested());

    let address: string = createFullAddress(nodeAddress, nodePort);


    const connection: IMonerRPCConnection = {
      uri: address,
    };

    // start local node when we select it
    if (selectedNodeOption.location === NodeLocation.Local && !getState().localNode.isRunning) {
      dispatch(startLocalNode());
    }
    // stop local node when we deselect it
    if (getState().connectedNode.location === NodeLocation.Local && getState().localNode.isRunning) {
      dispatch(stopLocalNode());
    }

    try {
      
      await walletProxy.setDaemonConnection(connection)
      await havendProxy.createDaemonConnection(connection)

       dispatch(
          setNodeForWalletSucceed(
            nodeAddress,
            nodePort,
            selectedNodeOption.location
          ))

    }
    catch (error)
    {
        dispatch(setNodeForWalletFailed(error));
    };
    
  };
};



const createFullAddress = (nodeAddress: string, nodePort: string) => {

  let address = nodeAddress + ":" + nodePort;
  
    // if someone omits the protocol for custom nodes
    const protocolPattern = /^((http|https):\/\/)/;
    if (!protocolPattern.test(address)) {
      address = "http://" + address;
    }

  return address;
}

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



