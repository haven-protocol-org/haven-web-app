import bigInt from "big-integer";
import { HavenAppState } from "platforms/desktop/reducers";
import { AnyAction } from "redux";
import { GET_AUDIT_STATUS } from "shared/actions/types";


const INITAL_STATE: boolean = false;

export default function (state = INITAL_STATE, action: AnyAction) {
  switch (action.type) {
    case GET_AUDIT_STATUS:
      return action.payload;
    default:
      return state;
  }
}
