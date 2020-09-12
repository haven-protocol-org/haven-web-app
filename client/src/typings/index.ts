
export enum NetworkType {
    mainnet,
    testnet,
    stagenet,
  }

export interface IMonerRPCConnection {
    uri: string;
    username?: string;
    password?: string;
    rejectUnauthorized?: boolean;
}


/** provides either path to stored wallet files or keys data **/
export interface IOpenWallet {
    path?: string;
    password: string;
    networkType: string;
    keysData?: Uint8Array;
    cacheData?: Uint8Array;
    server: IMonerRPCConnection;
}

/** meant for either restoring a wallet ( either with mnemomic or keys ) 
 * or creating a new random wallet. 
 * Create a view only wallet by only providing primary address and private view key **/
export interface ICreateWallet {

    /** path of the wallet to create (optional, in-memory wallet if not given) */
    path?: string;
    password: string;
    networkType: string;
    /** if not provided, create an offline wallet */
    server: IMonerRPCConnection;
    /** needed when restoring by mnemonic */
    mnemonic?: string;
    seedOffset?: string;
    /** only needed for view only wallet */
    primaryAddress?: string;
    /** only needed for view only wallet */
    privateViewKey?: string;
    /** if not provided - a view only wallet is created*/
    privateSpendKey?: string;
    restoreHeight?: number;

    proxyToWorker?: boolean;
}
