declare global {
  interface Window {
    ipcRenderer: any;
  }
}

export const LocalNodeAddress = "";

export enum NodeLocation {
  Local = "Local",
  Remote = "Remote",
  None = "None",
}

export interface NodeState {
  isRunning: boolean;
  location: NodeLocation;
  address: string;
  port: string;
  isMining: boolean;
  connections: { in: number; out: number };
}
