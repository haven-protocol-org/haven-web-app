import {
  GET_TRANSFERS_FAILED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED
} from "./types";
import {getAddressTxs} from "../api/api";
import {selectCredentials} from "../reducers/account";
import {core, lWallet} from "../declarations/open_monero.service";


export const getTransfers = () => {
  return (dispatch, getState) => {
    dispatch(getTransfersFetching());
    getAddressTxs(selectCredentials(getState()))
      .then(result => parseTx(result, getState()))
        .then(txs => dispatch(getTransfersSucceed(txs)))
      .catch(error => {
        dispatch(getTransfersFailed(error));
      });
  };
};

const parseTx = (rawTXs, state) => {

  const address = state.address.main;
  const {secViewKeyString, pubSpendKeyString, secSpendKeyString } = state.keys;

  let parsedData = core.api_response_parser_utils.Parsed_AddressTransactions__sync__keyImageManaged(rawTXs,
      address, secViewKeyString, pubSpendKeyString, secSpendKeyString, lWallet);

  return parsedData.serialized_transactions;
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
