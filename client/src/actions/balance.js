import {GET_BALANCES_FAILED, GET_BALANCES_FETCHING, GET_BALANCES_SUCCEED} from "./types";
import {getAddressInfo} from "../api/api";
import {selectCredentials} from "../reducers/account";
import {core, lWallet} from "../declarations/open_monero.service";
import {updateChainData} from "./index";

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
                dispatch(getBalancesSucceed(res))
            });


    };
};


const setBalance = (addressInfo) => {

    const balance = core.JSBigInt (addressInfo.total_received_String).subtract(core.JSBigInt (addressInfo.total_sent_String));

    const lockedBalance = core.JSBigInt(addressInfo.locked_balance_String);
    const unlockedBalance = balance.subtract(lockedBalance);
    return {balance, lockedBalance, unlockedBalance};

};


const parseAddressInfo = (rawAddressInfo, state) => {


    const address = state.address.main;
    const {sec_viewKey_string, pub_spendKey_string, sec_spendKey_string } = state.keys;
    const parsedData = core.api_response_parser_utils.Parsed_AddressInfo__sync__keyImageManaged(rawAddressInfo, address , sec_viewKey_string, pub_spendKey_string, sec_spendKey_string, lWallet);
    return parsedData;
};

const getBalancesFetching = () => ({ type: GET_BALANCES_FETCHING });
const getBalancesSucceed = result => ({
    type: GET_BALANCES_SUCCEED,
    payload: result
});
const getBalancesFailed = error => ({
    type: GET_BALANCES_FAILED,
    payload: error
});
