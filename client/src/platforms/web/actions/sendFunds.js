import {
  SEND_FUNDS_FAILED,
  SEND_FUNDS_RESET,
  SEND_FUNDS_STARTED,
  SEND_FUNDS_STATUS_UPDATE,
  SEND_FUNDS_SUCCEED
} from "./types";

// import {logM} from "../utility";
import { core } from "../declarations/haven_core";
import { NET_TYPE_ID } from "../../../constants/env";
import {
  addErrorNotification,
  addNotificationByKey
} from "../../../shared/actions/notification";
import { decrypt } from "../../../utility/utility-encrypt";
import { getTransfers } from "./transferHistory";
import { TRANSFER_SUCCEED_MESSAGE } from "../../../constants/notificationList";
import {selectPrimaryAddress} from "../../../shared/reducers/address";

export const sendFunds = (toAddress, amount, paymentId = "", ticker) => {
  
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

export const resetTransferProcess = () => {
  return { type: SEND_FUNDS_RESET };
};
