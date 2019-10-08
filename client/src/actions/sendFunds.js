import {
  SEND_FUNDS_FAILED,
  SEND_FUNDS_RESET,
  SEND_FUNDS_STARTED,
  SEND_FUNDS_STATUS_UPDATE,
  SEND_FUNDS_SUCCEED,
  TRANSFER_SUCCEED
} from "./types";
import { getRandomOuts, getUnspentOuts, submitRawTx } from "../api/api";
// import {logM} from "../utility";
import { core, lWallet } from "../declarations/open_monero.service";
import { NET_TYPE_ID } from "../constants/env";
import { addNotificationByKey } from "./notification";

export const sendFunds = (toAddress, amount) => {
  const parsedAmount = core.monero_amount_format_utils.parseMoney(amount);

  return (dispatch, getState) => {
    dispatch({ type: SEND_FUNDS_STARTED });

    // arguments for the send funds routine, including functions for backend requests
    const sendFundsArgs = {};

    const ownAddress = getState().address.main;
    sendFundsArgs.to_address_string = toAddress;
    sendFundsArgs.from_address_string = ownAddress;

    const keys = getState().keys;
    sendFundsArgs.sec_viewKey_string = keys.sec_viewKey_string;
    sendFundsArgs.sec_spendKey_string = keys.sec_spendKey_string;
    sendFundsArgs.pub_spendKey_string = keys.pub_spendKey_string;

    // default values
    sendFundsArgs.unlock_time = 0;
    sendFundsArgs.priority = 1;
    sendFundsArgs.is_sweeping = false;
    sendFundsArgs.nettype = NET_TYPE_ID;
    sendFundsArgs.payment_id_string = "";

    sendFundsArgs.sending_amount = parsedAmount.toString();

    sendFundsArgs.status_update_fn = params => {
      dispatch(updateStatus(params));
    };
    sendFundsArgs.success_fn = params => {
      dispatch(addNotificationByKey(TRANSFER_SUCCEED));
      dispatch(sendFundsSucceed(params));
    };
    sendFundsArgs.error_fn = err => {
      dispatch(sendFundsFailed(err));
    };

    //backend requests for constructing tx
    sendFundsArgs.get_random_outs_fn = getRandomOutsReq;
    sendFundsArgs.get_unspent_outs_fn = getUnspentOutsReq;
    sendFundsArgs.submit_raw_tx_fn = submitRawTxReq;

    lWallet.async__send_funds(sendFundsArgs);
  };
};

export const resetSendFunds = () => {
  return { type: SEND_FUNDS_RESET };
};

const updateStatus = status => {
  return { type: SEND_FUNDS_STATUS_UPDATE, payload: status };
};

const sendFundsSucceed = res => {
  return { type: SEND_FUNDS_SUCCEED, payload: res };
};

const sendFundsFailed = err => {
  return { type: SEND_FUNDS_FAILED, payload: err };
};

const getRandomOutsReq = (reqParams, cb) => {
  getRandomOuts(reqParams)
    .then(res => cb(null, res))
    .catch(err => cb(err, null));
};

const getUnspentOutsReq = (reqParams, cb) => {
  getUnspentOuts(reqParams)
    .then(res => cb(null, res))
    .catch(err => cb(err, null));
};

const submitRawTxReq = (reqParams, cb) => {
  submitRawTx(reqParams)
    .then(res => cb(null, res))
    .catch(err => cb(err, null));
};
