import {NET} from "./env";

export enum CommunicationChannel {
  HAVEND = "havend",
  WALLET_RPC = "wallet-rpc",
  RPC="rpc",
  STORED_WALLETS = "wallets",
  SWITCH_NET = "switch_net"
}

export interface WalletState extends ProcessState  {

  isConnectedToDaemon: boolean;
  isSyncing: boolean;
  syncHeight: number;

}

export interface HavendState extends ProcessState {

  isReachable: boolean;
  location: NodeLocation;
  address: string;

}


export interface ProcessState  {
  isRunning: boolean;
  code?: number;
  signal?: string;
};


export interface IDaemonConfig {
  path: string;
  port: number;
  args: { [key: string]: string | number };
  daemonUrl: string;
}

export enum NodeLocation {
  Local="Local",
  Remote="Remote",
  None="None"
}



export type DaemonType = 'havend' | 'wallet';

export type IConfig = {

  [NET.Mainnet] : {
    havend:IDaemonConfig;
    wallet: IDaemonConfig;
  }
  [NET.Testnet] : {
    havend:IDaemonConfig;
    wallet: IDaemonConfig;
  }
  [NET.Stagenet] : {
    havend:IDaemonConfig;
    wallet: IDaemonConfig;
  }
}
