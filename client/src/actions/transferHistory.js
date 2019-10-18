import {
  GET_TRANSFERS_FAILED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED
} from "./types";
import {getAddressTxs} from "../api/api";
import {selectCredentials} from "../reducers/account";
import {core, lWallet} from "../declarations/open_monero.service";
import {getBalancesSucceed, updateChainData} from "./index";


export const getTransfers = () => {
  return (dispatch, getState) => {
    dispatch(getTransfersFetching());
    getAddressTxs(selectCredentials(getState()))
        .then(result => {
          const txList =  parseTx(result, getState());
          const balance = calcBalanceByTxs(txList, result.blockchain_height);
          dispatch(getBalancesSucceed(balance));
          dispatch(getTransfersSucceed(txList));
          dispatch(updateChainData(result));
        })
        .catch(error => dispatch(getTransfersFailed(error)));
  };
};

const parseTx = (rawTXs, state) => {

  const address = state.address.main;
  const {sec_viewKey_string, pub_spendKey_string, sec_spendKey_string } = state.keys;

  let parsedData = core.api_response_parser_utils.Parsed_AddressTransactions__sync__keyImageManaged(rawTXs,
      address, sec_viewKey_string, pub_spendKey_string, sec_spendKey_string, lWallet);

  return parsedData.serialized_transactions;
};

const calcBalanceByTxs = (txList, bHeight) => {



  let totalSend = new core.JSBigInt("0");
  let totalReceived = new core.JSBigInt("0");
  let totalReceivedLocked = new core.JSBigInt("0");


  txList.forEach( tx => {

    const received = new core.JSBigInt(tx.total_received);
    const sent = new core.JSBigInt(tx.total_sent);
    const isLocked = tx.mempool || (tx.height  + 10) > bHeight;

    totalSend = totalSend.add(sent);
    totalReceived = totalReceived.add(received);

    if (isLocked){
      totalReceivedLocked = totalReceivedLocked.add(received);
    }

  });



 const balance = totalReceived.subtract(totalSend);
 const lockedBalance = totalReceivedLocked;
 const unlockedBalance = balance.subtract(lockedBalance);


 return {balance, unlockedBalance, lockedBalance};


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
