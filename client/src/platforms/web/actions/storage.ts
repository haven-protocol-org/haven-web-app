import { getWalletData } from "shared/core/wallet";
import {
  addErrorNotification,
  addNotificationByMessage,
} from "shared/actions/notification";
import { NotificationType } from "constants/notificationList";
import { saveAs } from "file-saver";

export const storeKeyFileToDisk = () => {
  return async (dispatch: any) => {
    const walletData = await getWalletData();
    const keysData = walletData[0];
    const blob = new Blob([keysData.buffer]);
    saveAs(blob, "Haven-Vault.keys");

    dispatch(
      addNotificationByMessage(
        NotificationType.SUCCESS,
        "Keystore has been stored on hard disk"
      )
    );
  };
};

export const storeWalletInDB = () => {
  return async (dispatch: any) => {
    const walletData = await getWalletData();
    const wallet = walletData[1];

    const openRequest: IDBOpenDBRequest = indexedDB.open("haven");
    openRequest.onsuccess = function (this: IDBRequest<IDBDatabase>) {
      const db = this.result;

      db.createObjectStore("wallet");
      const transaction = db.transaction("wallet", "readwrite");
      transaction.objectStore("wallet").put(wallet, "vault");

      dispatch(
        addNotificationByMessage(
          NotificationType.SUCCESS,
          "Keystore has been stored on hard disk"
        )
      );
    };
  };
};

export const getStoredWallets = () => {
  return async (dispatch: any) => {
    const walletNames: string[] = await fetchKeysFromDB();
    console.log(walletNames);
  };
};

export const getWalletCacheByName = (name: string) => {
  return async (dispatch: any) => {
    const walletCache: ArrayBuffer = await fetchValueByKey(name);
    console.log(walletCache);
  };
};

const fetchValueByKey = (name: string): Promise<ArrayBuffer> => {
  return new Promise((resolutionFunc, rejectionFunc) => {
    const openRequest: IDBOpenDBRequest = indexedDB.open("haven");
    openRequest.onsuccess = function (this: IDBRequest<IDBDatabase>) {
      const db = this.result;
      const transaction = db.transaction("wallet", "readonly");
      const keyRequest = transaction.objectStore("wallet").get(name);
      keyRequest.onsuccess = function (this: IDBRequest<any>) {
        const walletCache = this.result as ArrayBuffer;
        resolutionFunc(walletCache);
      };
    };
  });
};

const fetchKeysFromDB = (): Promise<string[]> => {
  return new Promise((resolutionFunc, rejectionFunc) => {
    let keys: string[] = [];
    const openRequest: IDBOpenDBRequest = indexedDB.open("haven");
    openRequest.onsuccess = function (this: IDBRequest<IDBDatabase>) {
      const db = this.result;
      const transaction = db.transaction("wallet", "readonly");
      const keyRequest = transaction.objectStore("wallet").getAllKeys();
      keyRequest.onsuccess = function (this: IDBRequest<IDBValidKey[]>) {
        keys = this.result as string[];
        resolutionFunc(keys);
      };
    };
  });
};
