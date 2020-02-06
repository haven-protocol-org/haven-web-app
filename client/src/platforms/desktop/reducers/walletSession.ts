import {
  OPEN_WALLET_FAILED,
  OPEN_WALLET_FETCHING,
  OPEN_WALLET_SUCCEED,
  RESTORE_WALLET_BY_SEED_FAILED,
  RESTORE_WALLET_BY_SEED_FETCHING,
  RESTORE_WALLET_BY_SEED_SUCCEED,
  UPDATE_SAVED_WALLETS,
  VALIDATE_MNEMONIC_SUCCEED
} from "../actions/types";
import { AnyAction } from "redux";
import { DesktopAppState } from "./index";

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
}

const INITIAL_STATE: WalletSession = {
  activeWallet: null,
  savedWallets: null,
  isFetching: false,
  isWalletOpen: false,
  error: null
};

export const walletSession = function(
  state = INITIAL_STATE,
  action: AnyAction
): WalletSession {
  switch (action.type) {
    case OPEN_WALLET_FAILED:
    case RESTORE_WALLET_BY_SEED_FAILED:
      return {
        ...state,
        error: action.payload,
        activeWallet: null,
        isFetching: false,
        isWalletOpen: false
      };
    case OPEN_WALLET_SUCCEED:
      return {
        ...state,
        error: null,
        isFetching: false,
        activeWallet: action.payload,
        isWalletOpen: true
      };
    case RESTORE_WALLET_BY_SEED_SUCCEED:
    case VALIDATE_MNEMONIC_SUCCEED:
      return {
        error: null,
        isFetching: false,
        activeWallet: action.payload,
        isWalletOpen: true,
        savedWallets: state.savedWallets
          ? [...state.savedWallets, action.payload]
          : [action.payload]
      };
    case OPEN_WALLET_FETCHING:
    case RESTORE_WALLET_BY_SEED_FETCHING:
      return { ...state, error: null, isFetching: true };
    case UPDATE_SAVED_WALLETS:
      return { ...state, savedWallets: action.payload };
    default:
      return state;
  }
};

export const selectIsLoggedIn = (state: DesktopAppState) => {
  return state.walletSession.isWalletOpen;
};

export const selectErrorMessageForLogin = (state: DesktopAppState) => {
  const error = state.walletSession.error;

  if (error) {
    return error.message;
  }

  return "";
};

export const selectIsRequestingLogin = (state: DesktopAppState) => {
  return state.walletSession.isFetching;
};
