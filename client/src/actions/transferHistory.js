import {
  GET_TRANSFERS_FAILED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED
} from "./types";
import {getAddressTxs} from "../api/api";
import {selectCredentials} from "../reducers/account";
import {core, lWallet} from "../declarations/open_monero.service";
import {updateChainData} from "./index";


export const getTransfers = () => {
  return (dispatch, getState) => {
    dispatch(getTransfersFetching());
    getAddressTxs(selectCredentials(getState()))
        .then(result => {
          dispatch(updateChainData(result));
          return parseTx(result, getState());
        })
        .then(txs => dispatch(getTransfersSucceed(txs)))
        .catch(error => dispatch(getTransfersFailed(error)))



  };
};

const parseTx = (rawTXs, state) => {

  const address = state.address.main;
  const {sec_viewKey_string, pub_spendKey_string, sec_spendKey_string } = state.keys;

  let parsedData = core.api_response_parser_utils.Parsed_AddressTransactions__sync__keyImageManaged(rawTXs,
      address, sec_viewKey_string, pub_spendKey_string, sec_spendKey_string, lWallet);

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
