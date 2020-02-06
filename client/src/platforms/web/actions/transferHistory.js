import {
  GET_TRANSFERS_FAILED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED
} from "../../../shared/actions/types";
import { getAddressTxs } from "../api/api";
import { selectCredentials } from "../reducers/account";
import { core } from "../declarations/open_monero.service";
import { getBalancesSucceed } from "./index";
import { updateChainData } from "./index";
import { decrypt } from "../../../utility/utility-encrypt";
import {Ticker} from "../../../shared/reducers/types";
import bigInt from "big-integer";
export const getTransfers = () => {
  return (dispatch, getState) => {
    dispatch(getTransfersFetching());
    getAddressTxs(selectCredentials(getState()))
      .then(result => parseTx(result, getState()))
      .then(parsedTxData => {
        const balance = calcBalanceByTxs(
          parsedTxData.serialized_transactions,
          parsedTxData.blockchain_height
        );
        dispatch(getBalancesSucceed({[Ticker.XHV]:balance}));
        dispatch(getTransfersSucceed(parsedTxData.serialized_transactions));
        dispatch(updateChainData(parsedTxData));
      })
      .catch(error => dispatch(getTransfersFailed(error)));
  };
};

const parseTx = async (rawTXs, state) => {
  const address = state.address.main;
  let {
    sec_viewKey_string,
    pub_spendKey_string,
    sec_spendKey_string
  } = state.keys;
  sec_spendKey_string = await decrypt(sec_spendKey_string);
  let lWallet = await core.monero_utils_promise;
  let parsedData = core.api_response_parser_utils.Parsed_AddressTransactions__sync__keyImageManaged(
    rawTXs,
    address,
    sec_viewKey_string,
    pub_spendKey_string,
    sec_spendKey_string,
    lWallet
  );

  parsedData.scanned_block_height = rawTXs.scanned_block_height;
  parsedData.scanned_block_timestamp = rawTXs.scanned_block_timestamp;
  parsedData.start_height = rawTXs.start_height;

  return parsedData;
};

const calcBalanceByTxs = (txList, bHeight) => {
  let totalSend =  bigInt("0");
  let totalReceived = bigInt("0");
  let totalReceivedLocked = bigInt("0");

  txList.forEach(tx => {
    const received = bigInt(tx.total_received);
    const sent = bigInt(tx.total_sent);
    const isLocked = tx.mempool || tx.height + 10 > bHeight;

    totalSend = totalSend.add(sent);
    totalReceived = totalReceived.add(received);

    if (isLocked) {
      totalReceivedLocked = totalReceivedLocked.add(received);
    }
  });

  const balance = totalReceived.subtract(totalSend);
  const lockedBalance = totalReceivedLocked;
  const unlockedBalance = balance.subtract(lockedBalance);

  return { balance, unlockedBalance, lockedBalance };
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
