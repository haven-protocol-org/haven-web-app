import { getNetworkByName } from "constants/env";
import { setTheme } from "shared/actions";
import { getConfigIPC, updateConfigIPC } from "../ipc/misc";
import { DesktopAppState } from "../reducers";
import { NodeLocation, RemoteNode, SelectedNode } from "../types";
import { setNodeForWalletSucceed } from "./selectNode";
import { SET_NODE_LIST_FOR_WALLET_SUCCESS } from "./types";

export const setDesktopConfig = () => {
  return async (dispatch: any, getState: () => DesktopAppState) => {
    const remoteNodes = await getAllAvailableNodes();

    const netSpecificNodes: RemoteNode[] = remoteNodes[getNetworkByName()];
    netSpecificNodes.forEach((node) => (node.location = NodeLocation.Remote));

    dispatch({
      type: SET_NODE_LIST_FOR_WALLET_SUCCESS,
      payload: netSpecificNodes,
    });

    const config: any = await getConfigIPC();
    //  dispatch(setNodeForWallet())

    if (config && config.selectedNode) {
      const selected = config.selectedNode as Partial<SelectedNode>;

      if (selected.location !== NodeLocation.None) {
        dispatch(
          setNodeForWalletSucceed(
            selected.address!,
            selected.port!,
            selected.location!
          )
        );
      }
      /*      // if there is no last selected node we set the defaulzt remote one
      else {
        const defaultNode = selectRemoteDefaultNode(getState());
        dispatch(
          setNodeForWalletSucceed(
            defaultNode.address!,
            defaultNode.port!,
            defaultNode.location
          )
        );
      } */
    }

    if (config && config.theme) {
      dispatch(setTheme(config.theme));
    }
  };
};

export const updateDesktopConfig = (config: any) => {
  updateConfigIPC(config);
};

export const getAllAvailableNodes = async () => {
  //import from public folder

  const nodes = await fetch("nodes.json");
  return nodes.json();
};
