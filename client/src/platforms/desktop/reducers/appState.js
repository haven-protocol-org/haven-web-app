import {
  CLOSE_WALLET, RESTORE_WALLET_BY_SEED_FAILED,
  RESTORE_WALLET_BY_SEED_FETCHING,
  RESTORE_WALLET_BY_SEED_SUCCEED, VALIDATE_MNEMONIC_SUCCEED
} from "../actions/types";
import {getMessageOfError} from "../../../utility/utility";

export const NO_SESSION = "no_session";
export const REQUESTING_SESSION = "requesting_session";
export const IN_SESSION = "in_session";

const INITIAL_STATE = { session: NO_SESSION, error: null };

export function appState (state = INITIAL_STATE, action) {

  switch (action.type) {
    case VALIDATE_MNEMONIC_SUCCEED:
    case RESTORE_WALLET_BY_SEED_SUCCEED:
      return {...state, session: IN_SESSION};
    case RESTORE_WALLET_BY_SEED_FETCHING:
      return {...state, session: REQUESTING_SESSION };
    case RESTORE_WALLET_BY_SEED_FAILED:
      return { session: NO_SESSION, error:action.payload };
    case CLOSE_WALLET:
      return INITIAL_STATE;
    default:
      return state;
  }
}


export const selectErrorMessage = (state) => {

  if (state.appState.error !== null)
  {
    return getMessageOfError(state.appState.error);
  }

  return "";

};
