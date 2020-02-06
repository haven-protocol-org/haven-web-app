
import * as fs from "fs";
import {daemonConfig} from "./daemonConfig";

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





