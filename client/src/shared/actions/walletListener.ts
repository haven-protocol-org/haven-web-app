import MoneroWalletListener from "haven-wallet-core/src/main/js/wallet/model/MoneroWalletListener";
import { bigIntegerToBigInt } from "utility/utility";
import BigInteger from "haven-wallet-core/src/main/js/common/biginteger";
import { Balance } from "shared/reducers/xBalance";
import { getBalancesSucceed } from "./balance";



export class HavenWalletListener extends MoneroWalletListener  {

    // we keep a dispatch instance in the walletlistener 
    // - not sure if its a good praxis
    private dispatch: any;
    constructor(dispatch: any) {
        super();
        this.dispatch = dispatch;
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
    // @ts-ignore
    onBalancesChanged(newBalance: BigInteger, newUnlockedBalance: BigInteger): void {

        const balance = bigIntegerToBigInt(newBalance);
        const unlockedBalance = bigIntegerToBigInt(newUnlockedBalance);
        const xhvBalance: Balance = {
            unlockedBalance,balance,lockedBalance:balance.subtract(unlockedBalance)
        }
        this.dispatch(getBalancesSucceed({XHV:xhvBalance}))

    }
       /**
     * Invoked when the wallet's offshore balances change.
     *
     * @param {BigInteger} newBalance - new wallet balance
     * @param {BigInteger} newUnlockedBalance - new unlocked wallet balance
     */
    onOffshoreBalancesChanged(newBalance: BigInteger, newUnlockedBalance: BigInteger): void {

        const balance = bigIntegerToBigInt(newBalance);
        const unlockedBalance = bigIntegerToBigInt(newUnlockedBalance);
        const xUSDBalance: Balance = {
            unlockedBalance,balance,lockedBalance:balance.subtract(unlockedBalance)
        }
        this.dispatch(getBalancesSucceed({xUSD:xUSDBalance}))

    }
    /**
     * Invoked when the wallet receives an output.
     *
     * @param {MoneroOutputWallet} output - the received output
     */
    onOutputReceived(output: any): void {

        console.log('hey you received some money');

    }
    /**
     * Invoked when the wallet spends an output.
     *
     * @param {MoneroOutputWallet} output - the spent output
     */
    onOutputSpent(output: any): void {

        console.log('hey you sent some money');

    }
}