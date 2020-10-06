import {
  OPEN_WALLET_FAILED,
  OPEN_WALLET_FETCHING,
  OPEN_WALLET_SUCCEED,
  RESTORE_WALLET_BY_SEED_FAILED,
  RESTORE_WALLET_BY_SEED_FETCHING,
  RESTORE_WALLET_BY_SEED_SUCCEED,
  UPDATE_SAVED_WALLETS,
  VALIDATE_MNEMONIC_SUCCEED,
} from "platforms/desktop/actions/types";
import { AnyAction } from "redux";
import { HavenAppState } from "platforms/desktop/reducers/index";
import { getMessageOfError } from "utility/utility";
import { SET_WALLET_CONNECTION_STATE } from "shared/actions/types";

export type RPCError = {
  code: number;
  message: string;
};

interface WalletSession {
  activeWallet: string | null;
  savedWallets: string[] | null;
  isFetching: boolean;
  isWalletOpen: boolean;
  error: RPCError | null;
  isConnectedToDaemon: boolean;
}

const INITIAL_STATE: WalletSession = {
  activeWallet: null,
  savedWallets: [],
  isFetching: false,
  isWalletOpen: false,
  error: null,
  isConnectedToDaemon: false,
};

export const walletSession = function (
  state = INITIAL_STATE,
  action: AnyAction
): WalletSession {
  switch (action.type) {
    case OPEN_WALLET_FAILED:
      return {
        ...state,
        error: action.payload,
        activeWallet: null,
        isFetching: false,
        isWalletOpen: false,
      };
    case OPEN_WALLET_SUCCEED:
      return {
        ...state,
        error: null,
        isFetching: false,
        activeWallet: action.payload,
        isWalletOpen: true,
      };
    case SET_WALLET_CONNECTION_STATE:
      return { ...state, isConnectedToDaemon: action.payload };
    case VALIDATE_MNEMONIC_SUCCEED:
      return {
        ...state,
        error: null,
        isFetching: false,
        activeWallet: action.payload,
        isWalletOpen: true,
        savedWallets: state.savedWallets
          ? [...state.savedWallets, action.payload]
          : [action.payload],
      };
    case OPEN_WALLET_FETCHING:
      return { ...state, error: null, isFetching: true };
    case UPDATE_SAVED_WALLETS:
      return { ...state, savedWallets: action.payload };
    default:
      return state;
  }
};

export const selectIsLoggedIn = (state: HavenAppState) => {
  return state.walletSession.isWalletOpen;
};

export const selectErrorMessageForLogin = (state: HavenAppState) => {
  const error = state.walletSession.error;

  if (error) {
    const message = getMessageOfError(state.walletSession.error);
    return message || error.message;
  }

  return "";
};

export const selectIsRequestingLogin = (state: HavenAppState) => {
  return state.walletSession.isFetching;
};
