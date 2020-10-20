import { ipcRenderer } from "electron";
import { CommunicationChannel } from "./ipc-types";

// @ts-ignore
const ipcRender: typeof ipcRenderer = window.havenProcess;

export const getHavendStateIPC = () => {
  return ipcRender.invoke(CommunicationChannel.HAVEND);
};

export const requestSavedWalletsIPC = () => {
  return ipcRender.invoke(CommunicationChannel.STORED_WALLETS);
};
