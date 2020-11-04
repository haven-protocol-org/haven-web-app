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
import { setWalletConnectionState } from "shared/actions/wallet";

export const setNodeForWallet = (
  selectedNodeOption: NodeOption,
  nodeAddress: string,
  nodePort: string
) => {
  return (dispatch: any, getState: () => DesktopAppState) => {
    dispatch(setNodeForWalletRequested());

    let address: string;
    address = nodeAddress + ":" + nodePort;
    const protocolPattern = /^((http|https):\/\/)/;
    if (!protocolPattern.test(address)) {
      address = "http://" + nodeAddress;
    }

    const connection: IMonerRPCConnection = {
      username: selectedNodeOption.username,
      password: selectedNodeOption.password,
      uri: address,
    };

    walletProxy
      .setDaemonConnection(connection)
      .then((res: any) => {
        console.log(res);
        dispatch(
          setNodeForWalletSucceed(
            nodeAddress,
            nodePort,
            selectedNodeOption.location
          )
        );
      })
      .catch((error: any) => {
        dispatch(setNodeForWalletFailed(error));
      });
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

export const updateConnectionState = () => {
  return async (dispatch: any) => {
    const isWalletConnected: boolean = await walletProxy.isWalletConnected();
    dispatch(setWalletConnectionState(isWalletConnected));
    const isAppConnected: boolean = await havendProxy.isConnected();
    
  };
};
