import {RESTORE_WALLET_BY_SEED_FETCHING, RESTORE_WALLET_BY_SEED_SUCCEED} from "../actions/types";

export const NO_SESSION = 'no_session';
export const REQUESTING_SESSION = 'requesting_session';
export const IN_SESSION = 'in_session';

const INITIAL_STATE = {session: NO_SESSION};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESTORE_WALLET_BY_SEED_SUCCEED:
            return {session: IN_SESSION};
        case RESTORE_WALLET_BY_SEED_FETCHING:
            return {session: REQUESTING_SESSION};
        default:
            return state;
    }
}
