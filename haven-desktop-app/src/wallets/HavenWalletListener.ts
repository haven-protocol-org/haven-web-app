import { WebContents } from "electron";
import { MoneroWalletListener } from "haven-wallet-core";
import { logInDevMode } from "../dev";
import { CommunicationChannel } from "../types";
import { WalletRequest } from "./WalletHandler";

export class HavenWalletListener extends MoneroWalletListener {
  private webContent: WebContents;
  private isSyncing: boolean = false;

  constructor(webContent: WebContents) {
    super();
    this.webContent = webContent;


  }
  onSyncProgress(
    height: number,
    startHeight: number,
    endHeight: number,
    percentDone: number,
    message: string
  ): void {
    
    if (percentDone === 1) {
      this.isSyncing = false;
    } else {
      this.isSyncing = true;
    }
    const syncDistance = endHeight - height;

    let updateInterval = Math.pow(10, Math.floor(Math.log10(syncDistance)));
    updateInterval = Math.min(5000, updateInterval);
    updateInterval = Math.max(updateInterval, 1);
  
    if (syncDistance % updateInterval === 0 || height === startHeight) {
    
      const walletupdate: WalletRequest = {
      methodName: "onSyncProgress",
      params: [...arguments],
    };

      this.webContent.send(CommunicationChannel.WALLET, walletupdate);
    }
  }

  onNewBlock(height: any): void {
    const walletupdate: WalletRequest = {
      methodName: "onNewBlock",
      params: [...arguments],
    };

    
    if (!this.isSyncing) {

      this.webContent.send(CommunicationChannel.WALLET, walletupdate);
    }
  }

  // @ts-ignore
  onBalancesChanged(
    newBalance: BigInteger,
    newUnlockedBalance: BigInteger
  ): void {
    const walletupdate: WalletRequest = {
      methodName: "onBalancesChanged",
      params: [...arguments],
    };
    this.webContent.send(CommunicationChannel.WALLET, walletupdate);
  }

  onOffshoreBalancesChanged(
    newBalance: BigInteger,
    newUnlockedBalance: BigInteger
  ): void {
    const walletupdate: WalletRequest = {
      methodName: "onOffshoreBalancesChanged",
      params: [...arguments],
    };

    this.webContent.send(CommunicationChannel.WALLET, walletupdate);
  }

  onOutputReceived(output: any): void {
    // console.log("Hey you received some money");
  }
  onOutputSpent(output: any): void {
    // console.log("Hey you sent some money");
  }
}
