import MoneroWalletListener from "haven-wallet-core/src/main/js/wallet/model/MoneroWalletListener";



export class HavenWalletListener extends MoneroWalletListener  {


    /**
     * Invoked as the wallet is synchronized.
     *
     * @param {number} height - height of the synced block
     * @param {number} startHeight - starting height of the sync request
     * @param {number} endHeight - ending height of the sync request
     * @param {number} percentDone - sync progress as a percentage
     * @param {string} message - human-readable description of the current progress
     */
    onSyncProgress(height: number, startHeight: number, endHeight: number, percentDone: number, message: string): void {

        console.log(arguments);

    }
    /**
     * Invoked when a new block is added to the chain.
     *
     * @param {int} height - the height of the block added to the chain
     */
    onNewBlock(height: any): void {

        console.log(arguments);
    }
    /**
     * Invoked when the wallet's balances change.
     *
     * @param {BigInteger} newBalance - new wallet balance
     * @param {BigInteger} newUnlockedBalance - new unlocked wallet balance
     */
    onBalancesChanged(newBalance: BigInteger, newUnlockedBalance: BigInteger): void {

        console.log(arguments);

    }
       /**
     * Invoked when the wallet's offshore balances change.
     *
     * @param {BigInteger} newBalance - new wallet balance
     * @param {BigInteger} newUnlockedBalance - new unlocked wallet balance
     */
    onOffshoreBalancesChanged(newBalance: BigInteger, newUnlockedBalance: BigInteger): void {

        console.log(arguments);

    }
    /**
     * Invoked when the wallet receives an output.
     *
     * @param {MoneroOutputWallet} output - the received output
     */
    onOutputReceived(output: any): void {

        console.log(arguments);

    }
    /**
     * Invoked when the wallet spends an output.
     *
     * @param {MoneroOutputWallet} output - the spent output
     */
    onOutputSpent(output: any): void {

        console.log(arguments);

    }
}