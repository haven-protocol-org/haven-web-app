// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
// Public domain.
//
// Implementation derived from TweetNaCl version 20140427.
// See for details: http://tweetnacl.cr.yp.to/

// modified 2017 for some CN functions by luigi1111

import { dialog } from "electron";

export enum KeyType {
  PRIVATE_VIEW,
  PUBLIC_VIEW,
  PRIVATE_SPEND,
  PUBLIC_SPEND,
  MNEMONIC,
}

const MNEMONIC = "mnemonic";
const PRIVATE_VIEW_KEY = "view_key";
const PRIVATE_SPEND_KEY = "spend_key";
const PUBLIC_VIEW_KEY = "public_view_key";
const PUBLIC_SPEND_KEY = "public_spend_key";

export const showKey = (key: KeyType) => {
  switch (key) {
    case KeyType.MNEMONIC:
      //  fetchKey("Seed", MNEMONIC);
      return;
    case KeyType.PRIVATE_VIEW:
      //  fetchKey("Private View Key", PRIVATE_VIEW_KEY);
      return;
    case KeyType.PRIVATE_SPEND:
      //  fetchKey("Private Spend Key", PRIVATE_SPEND_KEY);
      return;

    case KeyType.PUBLIC_VIEW:
      //  fetchAdress(PUBLIC_VIEW_KEY);
      return;
    case KeyType.PUBLIC_SPEND:
      //  fetchAdress(PUBLIC_SPEND_KEY);
      return;
  }
};

const showDialog = (title: string, message: string) => {
  dialog.showMessageBox(null, { title, message });
};
