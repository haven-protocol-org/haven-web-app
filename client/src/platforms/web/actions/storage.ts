import { getWalletData } from "shared/core/wallet";
import { addNotificationByMessage } from "shared/actions/notification";
import { NotificationType } from "constants/notificationList";
import { saveAs } from "file-saver";

const HAVEN_DB = "haven";
const WALLET_STORE = "wallet";

export const storeKeyFileToDisk = (name: string) => {
  return async (dispatch: any) => {
    const walletData = await getWalletData();
    const keysData = walletData[0];
    const blob = new Blob([keysData.buffer]);
    saveAs(blob, name + ".keys");

    dispatch(
      addNotificationByMessage(
        NotificationType.SUCCESS,
        "Keystore has been stored on hard disk"
      )
    );
  };
};

export const storeWalletInDB = async (name: string): Promise<any> => {
  return new Promise(async (resolutionFunc, rejectionFunc) => {
    const walletData = await getWalletData();
    const wallet = walletData[1];
    const openRequest: IDBOpenDBRequest = indexedDB.open(HAVEN_DB);

    openRequest.onupgradeneeded = function (this: IDBRequest<IDBDatabase>) {
      const db = this.result;
      db.createObjectStore(WALLET_STORE);
    };

    openRequest.onerror = function (error: any) {
      rejectionFunc();
    };

    openRequest.onsuccess = function (this: IDBRequest<IDBDatabase>) {
      const db = this.result;
      const transaction = db.transaction(WALLET_STORE, "readwrite");
      const putRequest: IDBRequest<IDBValidKey> = transaction
        .objectStore(WALLET_STORE)
        .put(wallet.buffer, name);

      putRequest.onsuccess = function (this: IDBRequest<IDBValidKey>) {
        resolutionFunc();
      };
      putRequest.onerror = function (this: IDBRequest<IDBValidKey>) {
        rejectionFunc();
      };
    };
  });
};

export const getWalletCacheByName = async (
  name: string
): Promise<ArrayBuffer> => {
  try {
    const walletCache: ArrayBuffer = await fetchValueByKey(name);
    return walletCache;
  } catch (e) {
    // if wallet not exist just return an empty one
    return new ArrayBuffer(0);
  }
};

const fetchValueByKey = (name: string): Promise<ArrayBuffer> => {
  return new Promise((resolutionFunc, rejectionFunc) => {
    const openRequest: IDBOpenDBRequest = indexedDB.open(HAVEN_DB);
    openRequest.onupgradeneeded = function (this: IDBRequest<IDBDatabase>) {
      const db = this.result;
      db.createObjectStore(WALLET_STORE);
    };
    openRequest.onsuccess = function (this: IDBRequest<IDBDatabase>) {
      const db = this.result;
      if (db.objectStoreNames.contains(WALLET_STORE)) {
        const transaction = db.transaction(WALLET_STORE, "readonly");
        const keyRequest = transaction.objectStore(WALLET_STORE).get(name);
        keyRequest.onsuccess = function (this: IDBRequest<any>) {
          if (this.result === undefined) {
            rejectionFunc("does not exist or is undefined");
          } else {
            const walletCache = this.result as ArrayBuffer;
            resolutionFunc(walletCache);
          }
        };
        keyRequest.onerror = function (error: any) {
          rejectionFunc(error);
        };
      } else {
        rejectionFunc(`${WALLET_STORE} does not exist as object store yet`);
      }
    };
  });
};

const fetchKeysFromDB = () => {
  let keys: string[] = [];
  const openRequest: IDBOpenDBRequest = indexedDB.open("haven");
  openRequest.onsuccess = function (this: IDBRequest<IDBDatabase>) {
    const db = this.result;
    const transaction = db.transaction("wallet", "readonly");
    const keyRequest = transaction.objectStore("wallet").getAllKeys();
    keyRequest.onsuccess = function (this: IDBRequest<IDBValidKey[]>) {
      keys = this.result as string[];
    };
  };
};
