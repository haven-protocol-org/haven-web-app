import { ipcRenderer } from "electron";
import { CommunicationChannel } from "./ipc-types";

// @ts-ignore
const ipcRender: typeof ipcRenderer = window.havenProcess;

export const requestSavedWalletsIPC = () => {
  return ipcRender.invoke(CommunicationChannel.STORED_WALLETS);
};

export const getConfigIPC = () => {
  return ipcRender.invoke(CommunicationChannel.CONFIG);
}


export const updateConfigIPC = (config: any) => {
  return ipcRender.invoke(CommunicationChannel.CONFIG, config);
}