import {
  AUDIT_CREATION_FAILED,
  AUDIT_CREATION_FETCHING,
  AUDIT_CREATION_SUCCEED,
  AUDIT_FAILED,
  AUDIT_FETCHING,
  AUDIT_RESET,
  AUDIT_SUCCEED,
} from "shared/actions/types";
import { AnyAction } from "redux";
import { HavenAppState } from "../../platforms/desktop/reducers/index";
import { Ticker } from "shared/reducers/types";

//TOKENOMICS below - priority needs updating
export interface AuditProcessInfo {
  address: string;
  isFetching: boolean;
  info: string;
  error: string;
  succeed: boolean;
  created: boolean;
  metaList: Array<string>;
  priority?: number;
  fromTicker: Ticker | null;
}

const INITIAL_STATE: AuditProcessInfo = {
  address: "",
  isFetching: false,
  info: "",
  error: "",
  succeed: false,
  created: false,
  metaList: [],
  fromTicker: null,
};

export const auditProcess = (
  state = INITIAL_STATE,
  action: AnyAction
): AuditProcessInfo => {
  switch (action.type) {
    case AUDIT_CREATION_FETCHING:
      return { ...state, ...action.payload, isFetching: true };

    case AUDIT_CREATION_SUCCEED:
      return { ...state, ...action.payload, created: true, isFetching: false };

    case AUDIT_CREATION_FAILED:
      return { ...state, error: action.payload, isFetching: false };

    case AUDIT_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case AUDIT_SUCCEED:
      return { ...state, isFetching: false, succeed: true };
    case AUDIT_FAILED:
      return {
        ...state,
        error: action.payload.error,
        isFetching: false,
        succeed: false,
      };
    case AUDIT_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const auditSucceed = (state: HavenAppState) => {
  return state.auditProcess.succeed;
};
