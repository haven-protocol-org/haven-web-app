import {ipcRenderer} from 'electron';
import {CommunicationChannels} from "./ipc-types";



// @ts-ignore
const ipcRender:typeof ipcRenderer= window.ipcRenderer;


export const getDaemonStatesIPC = () => {

    return ipcRender.invoke(CommunicationChannels.DAEMON)
};

export const requestSavedWalletsIPC = () => {

    return ipcRender.invoke(CommunicationChannels.WALLETS)

};







