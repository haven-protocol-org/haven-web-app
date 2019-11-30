
import {APP_DATA_PATH} from "./env";
import * as path from "path";
import * as fs from "fs";
import {daemonConfig} from "./daemonConfig";

// stores and reads data for user speific data e.g. wallet names, path to wallet, path to node etc...

const filename = 'settings.json';

const filePath = path.join(APP_DATA_PATH, filename);

type SavedWallet = {address: string, name: string};



export const getAvailableWallets = ():SavedWallet [] => {


    const walletPath: string = daemonConfig.wallet.args['wallet-dir'] as string;
    let availableWallets: SavedWallet[];

    const files =  fs.readdirSync(walletPath);

    availableWallets = files.filter((file => file.endsWith('address.txt')))
            .map( name => {

                const address = fs.readFileSync(walletPath +'/' + name, 'utf-8');
                return {address, name};
            } )
            .map( wallet => {
                wallet.name = wallet.name.replace('.address.txt', '')
                return wallet;
            } );

    return availableWallets;

};





