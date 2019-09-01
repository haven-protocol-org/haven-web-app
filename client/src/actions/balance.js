import {GET_BALANCES_FAILED, GET_BALANCES_FETCHING, GET_BALANCES_SUCCEED} from "./types";
import {getAddressInfo} from "../api/api";
import {selectCredentials} from "../reducers/account";
import {core, lWallet} from "../declarations/open_monero.service";
import {keysToCamel, logM} from "../utility";

export const getBalances = () => {
    return (dispatch, getState) => {
        dispatch(getBalancesFetching());

        const credentials = selectCredentials(getState());

        console.log(core.api_response_parser_utils.Parsed_AddressInfo__keyImageManaged );
        getAddressInfo(credentials)
            .then(res => parseAddressInfo(res, getState()))
            .then(res => keysToCamel(res))
            .then(res => setBalance(res));


    };
};


const setBalance = (addressInfo) => {

    logM(addressInfo);
    const balance = core.JSBigInt (addressInfo.totalReceivedString).subtract(core.JSBigInt (addressInfo.totalSentString));

    console.log(balance.toString());

};


const parseAddressInfo = (rawAddressInfo, state) => {


    const address = state.address.main;
    const {secViewKeyString, pubSpendKeyString, secSpendKeyString } = state.keys;
    const parsedData = core.api_response_parser_utils.Parsed_AddressInfo__sync__keyImageManaged(rawAddressInfo, address , secViewKeyString, pubSpendKeyString, secSpendKeyString, lWallet);

    console.log(parsedData);
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
