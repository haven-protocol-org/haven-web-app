import { HavendState } from "platforms/desktop/ipc/ipc-types";

declare global {
  interface Window {
    ipcRenderer: any;
  }
}

export const LocalNodeAddress = "";

export enum NodeLocation {
  Local = "Local Node",
  Remote = "Remote Node (Default)",
  Custom = "Remote Node (Custom)",
  None = "No Node",
}

export interface NodeState {
  isRunning: boolean;
  location: NodeLocation;
  address: string;
  port: string;
  isMining: boolean;
  connections: { in: number; out: number };
}
