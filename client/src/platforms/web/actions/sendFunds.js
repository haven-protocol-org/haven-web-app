import {
  SEND_FUNDS_FAILED,
  SEND_FUNDS_RESET,
  SEND_FUNDS_STARTED,
  SEND_FUNDS_STATUS_UPDATE,
  SEND_FUNDS_SUCCEED,
} from "./types";


import { getRandomOuts, getUnspentOuts, submitRawTx } from "../api/api";
// import {logM} from "../utility";
import { core } from "../../../declarations/open_monero.service";
import { NET_TYPE_ID } from "../../../env";
import {addErrorNotification, addNotificationByKey} from "../../../actions/notification";
import {decrypt} from "../../../utility";
import {getTransfers} from "./transferHistory";

export const sendFunds = (toAddress, amount, paymentId = "") => {
  const parsedAmount = core.monero_amount_format_utils.parseMoney(amount);

  return async (dispatch, getState) => {
    dispatch({ type: SEND_FUNDS_STARTED });

    // arguments for the send funds routine, including functions for backend requests
    const sendFundsArgs = {};

    const ownAddress = getState().address.main;
    sendFundsArgs.to_address_string = toAddress;
    sendFundsArgs.from_address_string = ownAddress;

    const keys = getState().keys;
    sendFundsArgs.sec_viewKey_string = keys.sec_viewKey_string;
    sendFundsArgs.sec_spendKey_string = await decrypt(keys.sec_spendKey_string);
    sendFundsArgs.pub_spendKey_string = keys.pub_spendKey_string;

    // default values
    sendFundsArgs.unlock_time = 0;
    sendFundsArgs.priority = "0";
    sendFundsArgs.is_sweeping = false;
    sendFundsArgs.nettype = NET_TYPE_ID;
    sendFundsArgs.payment_id_string = paymentId;

    sendFundsArgs.sending_amount = parsedAmount.toString();

    sendFundsArgs.status_update_fn = params => {
      dispatch(updateStatus(params));
    };
    sendFundsArgs.success_fn = params => {
      dispatch(addNotificationByKey("transfer_succeed"));
      dispatch(sendFundsSucceed(params));
      setTimeout((() => dispatch(getTransfers())), 1500);

    };
    sendFundsArgs.error_fn = err => {
      dispatch(addErrorNotification(err));
      dispatch(sendFundsFailed(err));
    };

    //backend requests for constructing tx
    sendFundsArgs.get_random_outs_fn = getRandomOutsReq;
    sendFundsArgs.get_unspent_outs_fn = getUnspentOutsReq;
    sendFundsArgs.submit_raw_tx_fn = submitRawTxReq;
    const lWallet = await core.monero_utils_promise;

    lWallet.async__send_funds(sendFundsArgs);
  };
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


export const resetTransferProcess = () => {
  return {type:SEND_FUNDS_RESET};
};
