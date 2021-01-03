import {
  OPEN_WALLET_FAILED,
  OPEN_WALLET_FETCHING,
  OPEN_WALLET_SUCCEED,
  START_WALLET_SESSION,
  CREATE_WALLET_FETCHING,
  SET_APP_TO_DAEMON_CONNECTION_STATE,
  CLOSE_WALLET_SESSION,
  SET_RESTORE_HEIGHT,
} from "shared/actions/types";
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
  isFetching: boolean;
  isSessionStarted: boolean;
  error: RPCError | null;
  isWalletConectedToDaemon: boolean;
  isAppConnectedToDaemon: boolean;
  restoreHeight: number;
  isClosingSession: boolean;
}

const INITIAL_STATE: WalletSession = {
  activeWallet: undefined,
  isFetching: false,
  isSessionStarted: false,
  error: null,
  isWalletConectedToDaemon: false,
  isAppConnectedToDaemon: false,
  restoreHeight: 0,
  isClosingSession: false,
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
    case SET_RESTORE_HEIGHT:
      return {...state, restoreHeight: action.payload};
    case SET_WALLET_CONNECTION_STATE:
      return { ...state, isWalletConectedToDaemon: action.payload };
    case SET_APP_TO_DAEMON_CONNECTION_STATE:
       return { ...state, isAppConnectedToDaemon: action.payload };
    case START_WALLET_SESSION:
      return {
        ...state,
        error: null,
        isFetching: false,
        isSessionStarted: true,
        activeWallet: action.payload,
        isClosingSession: false,
      };
    case CLOSE_WALLET_SESSION:
      return {
        ...state, isClosingSession:true
      }
    case CREATE_WALLET_FETCHING:
      return { ...state, activeWallet: action.payload, error: null };
    case OPEN_WALLET_FETCHING:
      return { ...state, error: null, isFetching: true };
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
    return message || error.message || error;
  }

  return "";
};

export const selectIsRequestingLogin = (state: HavenAppState) => {
  return state.walletSession.isFetching;
};

export const isTemporaryWallet = (state: HavenAppState) => {
  return state.walletSession.activeWallet === undefined;
};
