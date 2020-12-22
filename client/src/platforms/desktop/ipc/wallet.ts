import { ipcRenderer, IpcRendererEvent } from "electron";
import {
  CommunicationChannel,
  WalletRequest,
} from "platforms/desktop/ipc/ipc-types";
import { HavenWalletListener } from "shared/actions/walletListener";

// @ts-ignore
const ipcRender: typeof ipcRenderer = window.havenProcess;

export const callWalletBackend = async (
  methodName: string,
  params: any[],
  channel: CommunicationChannel
) => {
  // const rpcUrl = process.env.REACT_APP_RPC_URL;

  const requestObject: WalletRequest = {
    methodName,
    params,
  };

  const response = await ipcRender.invoke(channel, requestObject);
  return response;
};

export const initDesktopWalletListener = (listener: HavenWalletListener) => {
  ipcRender.on(
    CommunicationChannel.WALLET,
    (event: IpcRendererEvent, walletUpdate: WalletRequest) => {
      const methodName = walletUpdate.methodName;
      const params: any[] = walletUpdate.params;

      listener[methodName](...params);
    }
  );
};

export const removeDesktopListener = () => {
  ipcRender.removeAllListeners(CommunicationChannel.WALLET);
};
