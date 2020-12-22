import { UPDATE_SAVED_WALLETS } from "platforms/desktop/actions/types";
import { AnyAction } from "redux";
import {
  DesktopAppState,
  HavenAppState,
} from "platforms/desktop/reducers/index";

interface StoredWallets {
  wallets: string[] | null;
  storePath: string | null;
}

const INITIAL_STATE: StoredWallets = {
  wallets: [],
  storePath: null,
};

export const storedWallets = function (
  state = INITIAL_STATE,
  action: AnyAction
): StoredWallets {
  switch (action.type) {
    case UPDATE_SAVED_WALLETS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const selectStorePath = (state: DesktopAppState) => {
  return state.storedWallets.storePath;
};
