import MoneroTxPriority = require("haven-wallet-core/src/main/js/wallet/model/MoneroTxPriority");
import MoneroDestination = require("haven-wallet-core/src/main/js/wallet/model/MoneroDestination");

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

export interface ITxConfig {
  /** single destination address */
  address: string;
  /**single destination amount */
  amount: BigInt;
  /** source account index to transfer funds from */
  accountIndex: number;
  /** source subaddress index to transfer funds from */
  subaddressIndex: number;
  /** source subaddress indices to transfer funds from */
  subaddressIndices: number[];
  /** relay the transaction to peers to commit to the blockchain */
  relay: boolean;
  /** transaction priority (default MoneroTxPriority.NORMAL) */
  priority: MoneroTxPriority;
  /** addresses and amounts in a multi-destination tx */
  destinations: MoneroDestination[];
  /** transaction payment ID */
  paymentId: string;
  /** number of confirmations before the recipient can spend the funds */
  unlockTime: number;
  /** transaction note saved locally with the wallet */
  note: string;
  /** recipient name saved locally with the wallet */
  recipientName: string;
  /** allow funds to be transferred using multiple transactions */
  canSplit: boolean;
  /** for sweep requests, include outputs below this amount when sweeping wallet, account, subaddress, or all unlocked funds */
  belowAmount: BigInt;
  /** for sweep requests, sweep each subaddress individually instead of together if true */
  sweepEachSubaddress: boolean;
  /** key image to sweep (ignored except in sweepOutput() requests) */
  keyImage: string;
  /** tx type which differntiate between various tx/exchange types */
  txType: number;
}

export interface IKeys {
  publicSpend: string;
  privateSpend: string;
  publicView: string;
  privateView: string;
  mnemonic: string;
}
