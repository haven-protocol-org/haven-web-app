import {
  CREATE_PUB_KEYS_SUCCEED, KEYS_GENERATED_FAILED, KEYS_GENERATED_SUCCEED,
  QUERY_MNEMONIC_FETCHING,
  QUERY_MNEMONIC_SUCCEED,
  QUERY_PRIVATE_VIEW_KEY_FETCHING,
  QUERY_PRIVATE_VIEW_KEY_SUCCEED, QUERY_SPEND_KEY_SUCCEED
} from "../actions/types";

export const NO_KEY = -1;

const INITIAL_STATE = {
  mnemonic: '',
  view: {pub:'', sec:''},
  spend: {pub:'', sec:''},
  error:''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case KEYS_GENERATED_SUCCEED:
      return {...action.payload, error:''};
    case KEYS_GENERATED_FAILED:
      return {...state, error:action.payload};
    default:
      return state;
  }
}
