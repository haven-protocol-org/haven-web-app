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




export interface BasicNode {

  address?: string;
  port?: string;
  location: NodeLocation
  default?: boolean;
}

export interface RemoteNode extends BasicNode {
  provider:string;
} 

export interface SelectedNode extends BasicNode {


}


export interface NodeConnection {

  isWalletConectedToDaemon: boolean,
  isAppConnectedToDaemon: boolean,
  isConnecting: boolean

}

export interface LocalNode {
  isRunning: boolean;
  isMining: boolean;
  connections: { in: number; out: number };
}



export interface DesktopConfig {
  theme: string;
  selectedNode: Partial<BasicNode>;
}

