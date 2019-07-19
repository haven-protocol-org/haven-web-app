import {
  CLOSE_WALLET, RESTORE_WALLET_BY_SEED_FAILED,
  RESTORE_WALLET_BY_SEED_FETCHING,
  RESTORE_WALLET_BY_SEED_SUCCEED, VALIDATE_MNEMONIC_SUCCEED
} from "../actions/types";

export const NO_SESSION = "no_session";
export const REQUESTING_SESSION = "requesting_session";
export const IN_SESSION = "in_session";

const INITIAL_STATE = { session: NO_SESSION,  };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case VALIDATE_MNEMONIC_SUCCEED:
    case RESTORE_WALLET_BY_SEED_SUCCEED:
      return { session: IN_SESSION };
    case RESTORE_WALLET_BY_SEED_FETCHING:
      return { session: REQUESTING_SESSION };
    case RESTORE_WALLET_BY_SEED_FAILED:
      return { session: NO_SESSION };
    case CLOSE_WALLET:
      return {session: NO_SESSION};
    default:
      return state;
  }
}
