export enum CommunicationChannel {
  LOCALNODE = "localNode",
  WALLET = "wallet",
  DAEMON = "daemon",
  STORED_WALLETS="stored_wallets",
  CONFIG = "config",
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

export enum NET {
  Mainnet = 0,
  Testnet = 1,
  Stagenet = 2,
}

export type IDaemonNetConfig = {
  [key in NET]: IDaemonConfig;
};

export type AppConfig = IDaemonNetConfig & { version: string };

export type LocalNodeRequest = "state" | "start" | "stop";

export enum NetTypeName {
  mainnet = "mainnet",
  testnet = "testnet",
  stagenet = "stagenet",
}

export interface DesktopConfig {
  theme: string;
  selectedNode: Partial<SelectedNode>;
}


export enum NodeLocation {
  Local = "Local",
  Remote = "Remote",
  None = "None",
}

export interface SelectedNode {
  address: string;
  port: string;
  location: NodeLocation;
  appIsConnected: boolean;
}