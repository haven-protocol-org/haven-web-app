import * as core from "haven-wallet-core";
import MoneroWalletWasm = require("haven-wallet-core/src/main/js/wallet/MoneroWalletWasm");
import BigInteger = require("haven-wallet-core/src/main/js/common/biginteger");
import {
  ICreateWallet,
  IOpenWallet,
  ITxConfig,
  IKeys,
  IMonerRPCConnection,
} from "./";
import MoneroTxWallet = require("haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet");

let wallet: MoneroWalletWasm;

export const createWallet = async (walletData: ICreateWallet) => {
  try {
    wallet = await core.createWalletWasm(walletData);
    return true;
  } catch (e) {
    return e;
  }
};

export const openWallet = async (walletData: IOpenWallet) => {
  try {
    wallet = await core.openWalletWasm(walletData);
    return true;
  } catch (e) {
    return e;
  }
};

export const closeWallet = async (save: boolean) => {
  //@ts-ignore
  return wallet.close(save);
};

export const getBalance = async (
  accountIdx: number | undefined = undefined,
  subaddressIdx: number | undefined = undefined
) => {
  if (!wallet) {
    throw Error("no wallet exist");
  }
  //@ts-ignore
  const balance: BigInteger = await wallet.getBalance(
    accountIdx,
    subaddressIdx
  );
  return balance;
};

export const getOffshoreBalance = async (
  accountIdx: number | undefined = undefined,
  subaddressIdx: number | undefined = undefined
) => {
  if (!wallet) {
    throw Error("no wallet exist");
  }
  //@ts-ignore
  const balance: BigInteger = await wallet.getOffshoreBalance(
    accountIdx,
    subaddressIdx
  );
  return balance;
};

export const getUnlockedBalance = async (
  accountIdx: number | undefined = undefined,
  subaddressIdx: number | undefined = undefined
) => {
  if (!wallet) {
    throw Error("no wallet exist");
  }
  //@ts-ignore
  const balance: BigInteger = await wallet.getUnlockedBalance(
    accountIdx,
    subaddressIdx
  );
  return balance;
};

export const getUnlockedOffshoreBalance = async (
  accountIdx: number | undefined = undefined,
  subaddressIdx: number | undefined = undefined
) => {
  if (!wallet) {
    throw Error("no wallet exist");
  }
  //@ts-ignore
  const balance: BigInteger = await wallet.getUnlockedOffshoreBalance(
    accountIdx,
    subaddressIdx
  );
  return balance;
};

export const getWalletData = async (): Promise<DataView[]> => {
  return wallet.getData();
};

export const getMnemonic = async () => {
  return wallet.getMnemonic();
};

export const getPrimaryAddress = async (): Promise<string> => {
  return wallet.getPrimaryAddress();
};

export const getWalletHeight = async () => {
  return wallet.getHeight();
};

export const getNodeHeight = async () => {
  return wallet.getDaemonHeight();
};

export const getChainHeight = async () => {
  return wallet.getDaemonMaxPeerHeight();
};

export const syncWallet = (): Promise<void> => {
  //@ts-ignore
  return wallet.startSyncing();
};

export const stopSyncing = (): Promise<void> => {
  return wallet.stopSyncing();
};

export const syncAtOnce = (startHeight: number) => {
  //@ts-ignore
  return wallet.sync(startHeight);
};

export const transfer = async (
  txConfig: Partial<ITxConfig>
): Promise<MoneroTxWallet[]> => {
  //@ts-ignore
  return wallet.createTxs(txConfig);
};

export const getTransfers = async () => {
  //@ts-ignore
  return wallet.getTransfers();
};

export const getTxs = async () => {
  //@ts-ignore
  return wallet.getTxs();
};

export const isWalletSynced = async (): Promise<boolean> => {
  return wallet.isSynced();
};

export const isWalletConnected = async (): Promise<boolean> => {
  return wallet.isConnected();
};

export const relayTxs = async (metaDataList: string[]) => {
  return wallet.relayTxs(metaDataList);
};

export const setDaemonConnection = async (connection: IMonerRPCConnection) => {
  //@ts-ignore
  return wallet.setDaemonConnection(connection);
};

export const getKeys = async (): Promise<IKeys> => {
  const publicSpend = await wallet.getPublicSpendKey();
  const privateSpend = await wallet.getPrivateSpendKey();
  const publicView = await wallet.getPublicViewKey();
  const privateView = await wallet.getPrivateViewKey();
  const mnemonic = await wallet.getMnemonic();

  return {
    publicSpend,
    privateSpend,
    publicView,
    privateView,
    mnemonic,
  };
};

export const addWalletListener = (listener: any) => {
  // @ts-ignore
  wallet.addListener(listener);
};

export const getSubAddresses = async () => {
  //@ts-ignore
  return wallet.getSubaddresses(0);
};

export const createSubAddress = async (label: string) => {
  //@ts-ignore
  return wallet.createSubaddress(label);
};

export const labelAddress = async (label: string, addressIndex: number) => {
  throw "not implemented yet";
};

export const rescanBlockchain = async () => {
  return wallet.rescanBlockchain();
};
