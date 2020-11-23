import { getNetworkByName, NET_TYPE_ID } from "constants/env";
import { ipcRenderer } from "electron";
import { NetworkType } from "typings";
import { CommunicationChannel, LocalNodeRequest } from "./ipc-types";

// @ts-ignore
const ipcRender: typeof ipcRenderer = window.havenProcess;

export const getLocalNodeStateIPC = () => {
   return sendToLocalNode('state');
};


export const startLocalNodeIPC = () => {
   return sendToLocalNode('start', NET_TYPE_ID)
}


export const stopLocalNodeIPC = () => {
   return sendToLocalNode('stop');
}

const sendToLocalNode = (requestType: LocalNodeRequest, netTypeId?: NetworkType) => {
 return ipcRender.invoke(CommunicationChannel.LOCALNODE, requestType, netTypeId);
}