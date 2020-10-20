import { logM } from "utility/utility";
import { ipcRenderer } from "electron";
import {
  CommunicationChannel,
  WalletRequest,
} from "platforms/desktop/ipc/ipc-types";

// @ts-ignore
const ipcRender: typeof ipcRenderer = window.havenProcess;

export const callWallet = (methodName: string, params: any[]) => {
  // const rpcUrl = process.env.REACT_APP_RPC_URL;

  const requestObject: WalletRequest = {
    methodName,
    params,
  };

  return ipcRender.invoke(CommunicationChannel.RPC, requestObject);
};
