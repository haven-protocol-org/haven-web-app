import {
  CREATE_WALLET_FAILED,
  CREATE_WALLET_FETCHING,
  CREATE_WALLET_SUCCEED,
  QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED,
  RESTORE_WALLET_BY_SEED_SUCCEED,
  VALIDATE_MNEMONIC_FAILED,
  VALIDATE_MNEMONIC_SUCCEED
} from "../actions/types";
import { AnyAction } from "redux";
import {RPCError} from "platforms/desktop/reducers/walletSession";
import {DesktopAppState} from "platforms/desktop/reducers/index";

export interface WalletCreation {
  isCreated: boolean;
  mnemonicKey: string;
  isVerified: boolean;
  error: RPCError | null;
  isFetching: boolean;
}

const INITIAL_STATE: WalletCreation = {
  isCreated: false,
  mnemonicKey: "",
  isVerified: false,
  error: null,
  isFetching: false
};

export const walletCreation = (
  state = INITIAL_STATE,
  action: AnyAction
): WalletCreation => {
  switch (action.type) {
    case RESTORE_WALLET_BY_SEED_SUCCEED:
    case VALIDATE_MNEMONIC_SUCCEED:
    case VALIDATE_MNEMONIC_FAILED:
      return INITIAL_STATE;
    case QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED:
      return { ...state, mnemonicKey: action.payload };
    case CREATE_WALLET_FETCHING:
      return { ...state, isFetching: true };
    case CREATE_WALLET_SUCCEED:
      return { ...state, isFetching: false, isCreated: true };
    case CREATE_WALLET_FAILED:
      return { ...state, error: action.payload, isFetching: false };
    default:
      return state;
  }
};

export const selectErrorMessage = (state: DesktopAppState) => {


  const error = state.walletCreation.error;

  if (error) {
    return error.message;
  }
  return error;

};
