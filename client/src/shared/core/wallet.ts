import * as core from "haven-wallet-core";
import MoneroWalletWasm from "haven-wallet-core/src/main/js/wallet/MoneroWalletWasm";
import BigInteger from "haven-wallet-core/src/main/js/common/biginteger";
import {
  ICreateWallet,
  IOpenWallet,
  ITxConfig,
  IKeys,
  IMonerRPCConnection,
} from "../../typings";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import HavenBalance from "haven-wallet-core/src/main/js/wallet/model/HavenBalance";
import MoneroAddressBookEntry from "haven-wallet-core/src/main/js/wallet/model/MoneroAddressBookEntry";

let wallet: MoneroWalletWasm;

export const createWallet = async (walletData: ICreateWallet) => {
 
    wallet = await core.createWalletWasm(walletData);
    return true;

};

export const openWallet = async (walletData: IOpenWallet) => {

    wallet = await core.openWalletWasm(walletData);
    return true;
 
};

export const closeWallet = async (save: boolean) => {
  //@ts-ignore
  return wallet.close(save);
};

export const getBalance = async (
  accountIdx: number | undefined = undefined,
  subaddressIdx: number | undefined = undefined,
  assetType: string | undefined = undefined
) => {
  if (!wallet) {
    throw Error("no wallet exist");
  }
  //@ts-ignore
  const balance: HavenBalance = await wallet.getBalance(
  );
  return balance;
};

export const getUnlockedBalance = async (
  accountIdx: number | undefined = undefined,
  subaddressIdx: number | undefined = undefined,
  assetType: string | undefined = undefined
) => {
  if (!wallet) {
    throw Error("no wallet exist");
  }

  const balance: HavenBalance = await wallet.getUnlockedBalance(
      //@ts-ignore
    accountIdx, subaddressIdx, assetType
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

export const sweep = async (
  txConfig: Partial<ITxConfig>
  ): Promise<MoneroTxWallet[]> => {

    return wallet.sweepUnlocked(txConfig);
}

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

export const getTxKey = async (txHash: string) => {
  return wallet.getTxKey(txHash);
}

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

export const addWalletListener = (listener?: any) => {
  // @ts-ignore
  wallet.addListener(listener);
};

export const getSubAddresses = async () => {
  //@ts-ignore
  return wallet.getSubaddresses(0);
};

export const createSubAddress = async (label: string) => {
  //@ts-ignore
  return wallet.createSubaddress(0, label);
};

export const labelAddress = async (label: string, addressIndex: number) => {
  throw "not implemented yet";
};

export const rescanBlockchain = async () => {
  return wallet.rescanBlockchain();
};

export const getIntegratedAddress = async(paymentId?: string) => {
  //@ts-ignore
  return wallet.getIntegratedAddress(paymentId)
}

export const setSyncHeight = (syncHeight: number) => {
  return wallet.setSyncHeight(syncHeight);
}

export const getSyncHeight = () => {
  return wallet.getSyncHeight();
}

export const rescanSpent = () => {
  return wallet.rescanSpent();
}

export const saveWallet = () => {
  return wallet.save();
}

export const getAddressBookEntries = async (entryIndices: any[] = []): Promise<MoneroAddressBookEntry[]> => {
  return wallet.getAddressBookEntries(entryIndices);
}

export const addAddressBookEntry = async (address: string, description: string): Promise<number> => {
  return wallet.addAddressBookEntry(address, description);
};

export const editAddressBookEntry = async(index: number, setAddress: boolean, address: string, setDescription: boolean, description: string): Promise<void> => {
  return wallet.editAddressBookEntry(index, setAddress, address, setDescription, description);
}

export const deleteAddressBookEntry = async (entryIdx: any): Promise<void> => {
  return wallet.deleteAddressBookEntry(entryIdx);
} 

