import { NodeLocation } from "platforms/desktop/types";
import { ThreeState } from "shared/types/types";

export enum CommunicationChannel {
  LOCALNODE = "localNode",
  WALLET = "wallet",
  DAEMON = "daemon",
  STORED_WALLETS="stored_wallets",
  CONFIG = "config",
}

export interface DAEMON_STATUS {
  isRunning: boolean;
  code?: number;
  signal?: string;
}

export interface AVAILABLE_WALLETS {
  wallets: { name: string; address: string }[];
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

export interface WalletRequest {
  methodName: string;
  params: any[];
}

export type LocalNodeRequest = "state" | "start" | "stop";
