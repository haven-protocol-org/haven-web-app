import { ipcRenderer, IpcRendererEvent } from "electron";
import {
  CommunicationChannel,
  WalletRequest,
} from "platforms/desktop/ipc/ipc-types";
import { HavenWalletListener } from "shared/actions/walletListener";

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

export const initDesktopWalletListener = (listener: HavenWalletListener) => {
  ipcRender.on(
    CommunicationChannel.WALLET,
    (event: IpcRendererEvent, walletUpdate: WalletRequest) => {
      const methodName = walletUpdate.methodName;
      const params: any[] = walletUpdate.params;

      listener[methodName](params);
    }
  );
};
