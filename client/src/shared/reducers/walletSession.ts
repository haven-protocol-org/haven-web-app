import {
  OPEN_WALLET_FAILED,
  OPEN_WALLET_FETCHING,
  OPEN_WALLET_SUCCEED,
  UPDATE_SAVED_WALLETS,
  START_WALLET_SESSION,
  CREATE_WALLET_FAILED,
  CREATE_WALLET_FETCHING,
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
  activeWallet: string | undefined;
  savedWallets: string[] | null;
  isFetching: boolean;
  isSessionStarted: boolean;
  error: RPCError | null;
  isConnectedToDaemon: boolean;
}

const INITIAL_STATE: WalletSession = {
  activeWallet: undefined,
  savedWallets: [],
  isFetching: false,
  isSessionStarted: false,
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
        activeWallet: undefined,
        isFetching: false,
        isSessionStarted: false,
      };
    case OPEN_WALLET_SUCCEED:
      return {
        ...state,
        error: null,
        isFetching: false,
        activeWallet: action.payload,
        isSessionStarted: true,
      };
    case SET_WALLET_CONNECTION_STATE:
      return { ...state, isConnectedToDaemon: action.payload };
    case START_WALLET_SESSION:
      return {
        ...state,
        error: null,
        isFetching: false,
        isSessionStarted: true,
        activeWallet: action.payload,
        savedWallets: state.savedWallets
          ? [...state.savedWallets, action.payload]
          : [action.payload],
      };
    case CREATE_WALLET_FETCHING:
      return { ...state, activeWallet: action.payload, error: null };
    case OPEN_WALLET_FETCHING:
      return { ...state, error: null, isFetching: true };
    case UPDATE_SAVED_WALLETS:
      return { ...state, savedWallets: action.payload };
    default:
      return state;
  }
};

export const selectIsLoggedIn = (state: HavenAppState) => {
  return state.walletSession.isSessionStarted;
};

export const selectErrorMessageForLogin = (state: HavenAppState) => {
  const error = state.walletSession.error;

  if (error) {
    const message = getMessageOfError(error);
    return message || error.message;
  }

  return "";
};

export const selectIsRequestingLogin = (state: HavenAppState) => {
  return state.walletSession.isFetching;
};
