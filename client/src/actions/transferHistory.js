import {
  GET_TRANSFERS_FAILED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED
} from "./types";
import {getAddressTxs} from "../api/api";
import {selectCredentials} from "../reducers/account";
import {core, lWallet} from "../declarations/open_monero.service";
import {logM} from "../utility";

/**
 * just refresh tx from interest - latest pending tx
 */
export const updateLatestTransfers = () => {


};


export const getTransfers = () => {
  return (dispatch, getState) => {
    dispatch(getTransfersFetching());
    getAddressTxs(selectCredentials(getState()))
      .then(result => parseTx(result, getState()))
      .catch(error => {
        dispatch(getTransfersFailed(error));
      });
  };
};

const parseTx = (rawTXs, state) => {

  const address = state.address.main;
  const {secViewKeyString, pubSpendKeyString, secSpendKeyString } = state.keys;

  logM(rawTXs);
  const parsedData = core.api_response_parser_utils.Parsed_AddressTransactions__sync__keyImageManaged(rawTXs,
      address, secViewKeyString, pubSpendKeyString, secSpendKeyString, lWallet);
  logM(parsedData);
  logM(rawTXs);

};

const getTransfersFetching = () => ({
  type: GET_TRANSFERS_FETCHING,
  payload: { isFetching: true }
});

const getTransfersSucceed = result => ({
  type: GET_TRANSFERS_SUCCEED,
  payload: result
});

const getTransfersFailed = error => ({
  type: GET_TRANSFERS_FAILED,
  payload: error
});

const mergeAndSort = result => {
  const all = [
    ...result.in||[],
    ...result.out||[],
    ...result.pending||[]
  ];
  all.sort((a, b) => b.timestamp - a.timestamp);
  result.all = all;
  return result;
};
