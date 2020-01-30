import { KEYS_GENERATED_FAILED, KEYS_GENERATED_SUCCEED } from "./types";
import { createKey, encrypt } from "../../../utility/utility-encrypt";

export const keysGeneratedSucceed = keys => {
  delete keys.sec_seed_string;
  return dispatch => {
    createKey()
      .then(_ =>
        Promise.all([
          encrypt(keys.sec_spendKey_string),
          encrypt(keys.mnemonic_string)
        ])
      )
      .then(data => {
        keys.sec_spendKey_string = data[0];
        keys.mnemonic_string = data[1];
        dispatch({ type: KEYS_GENERATED_SUCCEED, payload: keys });
      });
  };
};
export const keysGeneratedFailed = error => ({
  type: KEYS_GENERATED_FAILED,
  payload: error
});
