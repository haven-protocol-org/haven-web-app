
import * as fs from "fs";
import {daemonConfig} from "./daemonConfig";

// stores and reads data for user speific data e.g. wallet names, path to wallet, path to node etc...





export const getAvailableWallets = ():string [] => {


    const walletPath: string = daemonConfig.wallet.args['wallet-dir'] as string;
    let availableWallets: string[];

    const files =  fs.readdirSync(walletPath);

    availableWallets = files.filter((file => file.endsWith('.keys')))

            .map( walletName => {
                walletName = walletName.replace('.keys', '')
                return walletName;
            } );


    return availableWallets;

};





