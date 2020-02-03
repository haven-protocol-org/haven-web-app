import {
  // GET_BALANCES_FAILED,
  GET_BALANCES_FETCHING,
  GET_BALANCES_SUCCEED
} from "shared/actions/types";
import { getAddressInfo } from "../api/api";
import { selectCredentials } from "../reducers/account";
import { core } from "../declarations/open_monero.service";
import { updateChainData } from "../actions";
import { decrypt } from "utility/utility-encrypt";
import {WebAppState} from "platforms/web/reducers";
import {XBalance} from "shared/reducers/xBalance";
import {Ticker} from "shared/reducers/types";
import bigInt from "big-integer";

export const getBalances = () => {
  return (dispatch:any, getState: () => WebAppState) => {
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

const setBalance = (addressInfo: any) => {
  const balance = bigInt(addressInfo.total_received_String)
    .subtract(bigInt(addressInfo.total_sent_String));

  const lockedBalance = bigInt(addressInfo.locked_balance_String);
  const unlockedBalance = balance.subtract(lockedBalance);
  return { [Ticker.XHV] : { balance, lockedBalance, unlockedBalance }};
};

const parseAddressInfo = async (rawAddressInfo: any, state: WebAppState) => {
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

export const getBalancesSucceed = (result: XBalance) => ({
  type: GET_BALANCES_SUCCEED,
  payload: result
});
