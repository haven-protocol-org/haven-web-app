import {
  KEYS_GENERATED_FAILED,
  KEYS_GENERATED_SUCCEED
} from "../../../shared/actions/types";

export const NO_KEY = -1;

const INITIAL_STATE = {
  mnemonic_string: "",
  mnemonic_language: "",
  pub_spendKey_string: "",
  pub_viewKey_string: "",
  sec_spendKey_string: "",
  sec_viewKey_string: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case KEYS_GENERATED_SUCCEED:
      return { ...action.payload, error: "" };
    case KEYS_GENERATED_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
