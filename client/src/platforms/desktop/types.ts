declare global {
  interface Window {
    havenProcess: any;
  }
}

export enum NodeLocation {
  Local = "Local",
  Remote = "Remote",
  None = "None",
}

export interface LocalNode {
  isRunning: boolean;
  isMining: boolean;
  connections: { in: number; out: number };
}

export interface SelectedNode {
  address: string;
  port: string;
  location: NodeLocation;
  appIsConnected: boolean;
}
