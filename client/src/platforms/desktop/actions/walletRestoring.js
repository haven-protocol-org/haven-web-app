import {
  RESTORE_WALLET_BY_SEED_FAILED,
  RESTORE_WALLET_BY_SEED_FETCHING,
  RESTORE_WALLET_BY_SEED_SUCCEED
} from "./types";
import { restoreWalletRPC } from "../ipc/rpc/rpc";
import { addPubAddress } from "../../../shared/actions";

export const restoreWallet = (seed, filename, password) => {
  return dispatch => {
    // check if user submitted privKey
    if (seed.length === 64) {
      //  seed = mnemonic.mn_encode(seed);
    }

    const params = { seed, filename, password };

    dispatch(restoreWalletFetching());
    restoreWalletRPC(params)
      .then(result => {
        dispatch(restoreWalletSucceed(filename));
        dispatch(addPubAddress(result.address));
      })
      .catch(error => {
        console.log(error);
        dispatch(restoreWalletFailed(error));
      });
  };
};

const restoreWalletFetching = () => ({ type: RESTORE_WALLET_BY_SEED_FETCHING });
const restoreWalletSucceed = result => ({
  type: RESTORE_WALLET_BY_SEED_SUCCEED,
  payload: result
});
const restoreWalletFailed = error => ({
  type: RESTORE_WALLET_BY_SEED_FAILED,
  payload: error
});
