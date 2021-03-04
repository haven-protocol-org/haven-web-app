import MoneroWalletListener from "haven-wallet-core/src/main/js/wallet/model/MoneroWalletListener";
import { bigIntegerToBigInt, logM } from "utility/utility";
import BigInteger from "haven-wallet-core/src/main/js/common/biginteger";
import { Balance } from "shared/reducers/xBalance";
import { getBalancesSucceed } from "./balance";
import { Chain, selectSyncState } from "shared/reducers/chain";
import { onWalletSyncUpdateSucceed } from "shared/actions/walletCreation";
import { getLastBlockHeader } from "./blockHeaderExchangeRate";
import { updateHavenFeatures } from "./havenFeature";
import { HavenAppState } from "platforms/desktop/reducers";
import { Ticker } from "shared/reducers/types";

export class HavenWalletListener extends MoneroWalletListener {
  // we keep a dispatch and getStore instance in the walletlistener
  // - not sure if its a good praxis

  [key: string]: any;

  private getStore: () => HavenAppState;
  private dispatch: any;
  constructor(dispatch: any, getStore: () => HavenAppState) {
    super();
    this.dispatch = dispatch;
    this.getStore = getStore;
  }

  /**
   * Invoked as the wallet is synchronized.
   *
   * @param {number} height - height of the synced block
   * @param {number} startHeight - starting height of the sync request
   * @param {number} endHeight - ending height of the sync request
   * @param {number} percentDone - sync progress as a percentage
   * @param {string} message - human-readable description of the current progress
   */
  onSyncProgress(
    height: number,
    startHeight: number,
    endHeight: number,
    percentDone: number,
    message: string
  ): void {

    const syncDistance = endHeight - height;

    let updateInterval = Math.pow(10, Math.floor(Math.log10(syncDistance)));
    updateInterval = Math.min(1000, updateInterval);
    updateInterval = Math.max(updateInterval, 1);
  
    if (syncDistance % updateInterval === 0 || height === startHeight)  {
      const chain: Partial<Chain> = {
        walletHeight: height,
        nodeHeight:endHeight
      };
      logM(height);

      this.dispatch(onWalletSyncUpdateSucceed(chain));
    }
  }
  /**
   * Invoked when a new block is added to the chain.
   *
   * @param {int} height - the height of the block added to the chain
   */
  onNewBlock(height: any): void {
    const store: HavenAppState = this.getStore();
    const syncState = selectSyncState(store);

    if (!syncState.isSyncing) {
      this.dispatch(getLastBlockHeader());
      this.dispatch(updateHavenFeatures(height));

      if (store.chain.chainHeight < height) {
        this.dispatch(
          onWalletSyncUpdateSucceed({ nodeHeight: height, chainHeight: height })
        );
      } else {
        this.dispatch(onWalletSyncUpdateSucceed({ nodeHeight: height }));
      }
    }
  }
  /**
   * Invoked when the wallet's balances change.
   *
   * @param {BigInteger} newBalance - new wallet balance
   * @param {BigInteger} newUnlockedBalance - new unlocked wallet balance
   */
  // @ts-ignore
  onBalancesChanged(
    newBalance: BigInteger,
    newUnlockedBalance: BigInteger, assetType: string 
  ): void {
    const balance = bigIntegerToBigInt(newBalance);
    const unlockedBalance = bigIntegerToBigInt(newUnlockedBalance);
    const xhvBalance: Balance = {
      unlockedBalance,
      balance,
      lockedBalance: balance.subtract(unlockedBalance),
    };

    logM(assetType);
    this.dispatch(getBalancesSucceed({ [assetType as Ticker] : xhvBalance }));
    // this.dispatch(getAllTransfers());
  }
  /**
   * Invoked when the wallet receives an output.
   *
   * @param {MoneroOutputWallet} output - the received output
   */
  onOutputReceived(output: any): void {
    // console.log("Hey you received some money");
  }
  /**
   * Invoked when the wallet spends an output.
   *
   * @param {MoneroOutputWallet} output - the spent output
   */
  onOutputSpent(output: any): void {
    //   console.log("Hey you sent some money");
  }
}
