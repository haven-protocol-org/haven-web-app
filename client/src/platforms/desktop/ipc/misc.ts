import { ipcRenderer } from "electron";
import { NetworkType } from "typings";
import { logM } from "utility/utility";
import { CommunicationChannel } from "./ipc-types";

// @ts-ignore
const ipcRender: typeof ipcRenderer = window.havenProcess;

export const requestSavedWalletsIPC = (netTypeId: NetworkType) => {
  return ipcRender.invoke(CommunicationChannel.STORED_WALLETS, netTypeId);
};

export const getConfigIPC = (netTypeId: number) => {
  
  return ipcRender.invoke(CommunicationChannel.CONFIG, netTypeId);
}


export const updateConfigIPC = (netTypeId: number, config: any) => {
  return ipcRender.invoke(CommunicationChannel.CONFIG, [netTypeId, config]);
}