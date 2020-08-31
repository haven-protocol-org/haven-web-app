import {
  GET_TRANSFERS_FAILED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_SUCCEED
} from "../../../shared/actions/types";
import { selectCredentials } from "../reducers/account";
import { core } from "../declarations/haven_core";
import { getBalancesSucceed } from ".";
import { updateChainData } from ".";
import { decrypt } from "../../../utility/utility-encrypt";
import { Ticker } from "../../../shared/reducers/types";
import bigInt from "big-integer";
import {selectPrimaryAddress} from "../../../shared/reducers/address";


export const getTransfers = () => {

};

const parseTx = async (rawTXs, state) => {
 
};

const calcBalanceByTxs = (txList, bHeight) => {
 
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
