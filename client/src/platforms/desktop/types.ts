
declare global {
  interface Window {
    ipcRenderer: any;
  }
}


export const LocalNodeAddress = "";


export enum NodeLocation {
  Local="Local",
  Remote="Remote",
  None="None"
}



export interface RunningState {
  isRunning: boolean;
  code?: number;
  signal?: string;
}

export interface NodeState extends RunningState {
  location: NodeLocation;
  address: string;
  port: string;
  isMining: boolean;
  connections: { in: number; out: number };
}

