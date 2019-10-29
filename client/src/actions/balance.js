import {
  // GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_SUCCEED
} from "./types";
import { getAddressInfo } from "../api/api";
import { selectCredentials } from "../reducers/account";
import { core } from "../declarations/open_monero.service";
import { updateChainData } from "./index";
import {decrypt} from "../utility";

export const getBalances = () => {
  return (dispatch, getState) => {
    dispatch(getBalancesFetching());

    const credentials = selectCredentials(getState());

    getAddressInfo(credentials)
      .then(res => {
        dispatch(updateChainData(res));
        return parseAddressInfo(res, getState());
      })
      .then(res => setBalance(res))
      .then(res => {
        dispatch(getBalancesSucceed(res));
      });
  };
};

const setBalance = addressInfo => {
  const balance = core
    .JSBigInt(addressInfo.total_received_String)
    .subtract(core.JSBigInt(addressInfo.total_sent_String));

  const lockedBalance = core.JSBigInt(addressInfo.locked_balance_String);
  const unlockedBalance = balance.subtract(lockedBalance);
  return { balance, lockedBalance, unlockedBalance };
};

const parseAddressInfo = async (rawAddressInfo, state) => {
  const address = state.address.main;
  let {
    sec_viewKey_string,
    pub_spendKey_string,
    sec_spendKey_string
  } = state.keys;

  const lWallet = await core.monero_utils_promise;
  sec_spendKey_string = await decrypt(sec_spendKey_string);
  const parsedData = core.api_response_parser_utils.Parsed_AddressInfo__sync__keyImageManaged(
    rawAddressInfo,
    address,
    sec_viewKey_string,
    pub_spendKey_string,
    sec_spendKey_string,
    lWallet
  );
  return parsedData;
};

const getBalancesFetching = () => ({ type: GET_BALANCES_FETCHING });

export const getBalancesSucceed = result => ({
  type: GET_BALANCES_SUCCEED,
  payload: result
});
