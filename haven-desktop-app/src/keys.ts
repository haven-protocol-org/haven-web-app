// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
// Public domain.
//
// Implementation derived from TweetNaCl version 20140427.
// See for details: http://tweetnacl.cr.yp.to/

// modified 2017 for some CN functions by luigi1111

import { dialog } from "electron";
import * as core from "./shared/wallet";

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

export const showKey = async (key: KeyType) => {
  switch (key) {
    case KeyType.MNEMONIC:
       showDialog("Seed", await core.getMnemonic())
      return;
    case KeyType.PRIVATE_VIEW:
      showDialog("Private View Key", await core.getPrivateView())
      return;
    case KeyType.PRIVATE_SPEND:
      showDialog("Private Spend Key", await core.getPrivateSpend())
      return;
    case KeyType.PUBLIC_VIEW:
      showDialog("Public View Key", await core.getPublicView())
      return;
    case KeyType.PUBLIC_SPEND:
      showDialog("Public Spend Key", await core.getPublicSpend())
      return;
  }
};

const showDialog = (title: string, message: string) => {
  dialog.showMessageBox(null, { title, message });
};