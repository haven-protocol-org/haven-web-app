import { WebContents } from "electron";
import { MoneroWalletListener } from "haven-wallet-core";
import { CommunicationChannel } from "../types";
import { WalletRequest } from "./WalletHandler";

export class HavenWalletListener extends MoneroWalletListener {
  private webContent: WebContents;
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
    const walletupdate: WalletRequest = {
      methodName: "onSyncProgress",
      params: [...arguments],
    };

    this.webContent.send(CommunicationChannel.WALLET, walletupdate);
  }

  onNewBlock(height: any): void {
    const walletupdate: WalletRequest = {
      methodName: "onNewBlock",
      params: [...arguments],
    };

    this.webContent.send(CommunicationChannel.WALLET, walletupdate);
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
