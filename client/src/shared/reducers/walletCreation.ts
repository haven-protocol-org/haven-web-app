import {
  CREATE_WALLET_FAILED,
  CREATE_WALLET_FETCHING,
  CREATE_WALLET_SUCCEED,
  QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED,
  RESTORE_WALLET_BY_SEED_SUCCEED,
  RESTORE_WALLET_BY_SEED_FETCHING,
  START_WALLET_SESSION,
  RESTORE_WALLET_BY_SEED_FAILED,
} from "shared/actions/types";
import { AnyAction } from "redux";
import { RPCError } from "shared/reducers/walletSession";
import { HavenAppState } from "platforms/desktop/reducers/index";
import { getMessageOfError } from "utility/utility";

export interface WalletCreation {
  isCreated: boolean;
  mnemonicKey: string;
  isVerified: boolean;
  error: RPCError | null;
  isFetching: boolean;
  name: string;
}

const INITIAL_STATE: WalletCreation = {
  isCreated: false,
  mnemonicKey: "",
  isVerified: false,
  error: null,
  isFetching: false,
  name: "",
};

export const walletCreation = (
  state = INITIAL_STATE,
  action: AnyAction
): WalletCreation => {
  switch (action.type) {
    case START_WALLET_SESSION:
      return INITIAL_STATE;
    case QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED:
      return { ...state, mnemonicKey: action.payload };
    case RESTORE_WALLET_BY_SEED_FETCHING:
    case CREATE_WALLET_FETCHING:
      return { ...state, isFetching: true, name: action.payload, error: null };
    case RESTORE_WALLET_BY_SEED_SUCCEED:
    case CREATE_WALLET_SUCCEED:
      return {
        ...state,
        error: null,
        isFetching: false,
        isCreated: true,
      };
    case RESTORE_WALLET_BY_SEED_FAILED:
    case CREATE_WALLET_FAILED:
      return { ...state, error: action.payload, isFetching: false };
    default:
      return state;
  }
};

export const selectisRequestingWalletCreation = (state: HavenAppState) => {
  return state.walletCreation.isFetching;
};

export const selectIsWalletCreated = (state: HavenAppState) => {
  return state.walletCreation.isCreated;
};

export const selectErrorMessageForWalletCreation = (state: HavenAppState) => {
  const error = state.walletCreation.error;

  if (error) {
    const message = getMessageOfError(error);
    return message || error.message;
  }

  return "";
};
