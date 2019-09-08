import {
  KEYS_GENERATED_FAILED, KEYS_GENERATED_SUCCEED,

} from "../actions/types";

export const NO_KEY = -1;

const INITIAL_STATE = {
  mnemonicString: '',
  mnemonicLanguage:'',
  pubSpendKeyString:'',
  pubViewKeyString: '',
  secSpendKeyString:'',
  secViewKeyString:''
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

