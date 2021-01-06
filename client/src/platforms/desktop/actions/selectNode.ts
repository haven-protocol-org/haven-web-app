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
import { logM } from "utility/utility";
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from "constants";
import { SET_APP_TO_DAEMON_CONNECTION_STATE, SET_WALLET_CONNECTION_STATE } from "shared/actions/types";

export const changeNodeForWallet = (
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

    if (selectedNodeOption.username) {
      connection.username = selectedNodeOption.username;
    }

    if (selectedNodeOption.password) {
      connection.password = selectedNodeOption.password;
    }

/*     // start local node when we select it
    if (selectedNodeOption.location === NodeLocation.Local && !getState().localNode.isRunning) {
      dispatch(startLocalNode());
    }
    // stop local node when we deselect it
    if (getState().connectedNode.location === NodeLocation.Local && getState().localNode.isRunning) {
      dispatch(stopLocalNode());
    } */

    try {
      
      const res1 = await walletProxy.setDaemonConnection(connection)
      const res2 = await havendProxy.createDaemonConnection(connection)

      console.log("setDaemonConnection");
      console.log(res1);

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


export const disconnectNode = async() => {

  // we just create an empty connection
  const connection: IMonerRPCConnection = {
    uri: "",
  };


  return async(dispatch: any, getState: () => DesktopAppState) => {
  try {
      
    await walletProxy.setDaemonConnection(connection)
    await havendProxy.createDaemonConnection(connection)

    dispatch({type: SET_APP_TO_DAEMON_CONNECTION_STATE, payload: false});
    dispatch({type: SET_WALLET_CONNECTION_STATE, payload: false});


     dispatch(
        setNodeForWalletSucceed(
          "",
          "",
          NodeLocation.None
        ))

  }
  catch (error)
  {
      logM("set empty node failed");
  };

}
}



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

export const setNodeForWalletSucceed = (
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




