export enum CommunicationChannel {
  HAVEND = "havend",
  WALLET_RPC = "wallet-rpc",
  RPC = "rpc",
  STORED_WALLETS = "wallets",
  SWITCH_NET = "switch_net",
}

export interface WalletState extends ProcessState {
  isConnectedToDaemon: ThreeState;
  isSyncing: boolean;
  syncHeight: number;
  isReachable: boolean;
}

export interface HavendState extends ProcessState {
  isReachable: boolean;
  location: NodeLocation;
  address: string;
}

export interface ProcessState {
  isRunning: boolean;
  code?: number;
  signal?: string;
}

export interface IDaemonConfig {

  port: number;
  args: { [key: string]: string | number };
  daemonUrl: string;

}


export enum NodeLocation {
  Local = "Local",
  Remote = "Remote",
  None = "None",
}

export enum ThreeState {
  True,
  False,
  Unset,
}
export enum NET {
  Mainnet = 0,
  Testnet = 1,
  Stagenet = 2,
}

export type IDaemonNetConfig = { [key in  NET]: {[key in DaemonType]: IDaemonConfig} };

export type AppConfig = IDaemonNetConfig & {version: string};


export enum DaemonType  {
  havend= "havend",
 wallet= "wallet",
}




export enum NetTypeName {
  mainnet= "mainnet",
  testnet= "testnet",
  stagenet= "stagenet",
}
