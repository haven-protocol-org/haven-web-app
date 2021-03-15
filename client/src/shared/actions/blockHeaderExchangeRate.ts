import { AnyAction } from "redux";
import {
  GET_BLOCK_HEADER_EXCHANGE_RATE_FETCH,
  GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED,
} from "./types";
import { BlockHeaderRate } from "shared/reducers/blockHeaderExchangeRates";
import bigInt from "big-integer";
import { havendProxy } from "shared/core/proxy";
import MoneroBlockHeader from "haven-wallet-core/src/main/js/daemon/model/MoneroBlockHeader";
import { addErrorNotification } from "./notification";

export const getLastBlockHeader = () => {
  return async (dispatch: any) => {
    dispatch({ type: GET_BLOCK_HEADER_EXCHANGE_RATE_FETCH });

    try {
    const rawHeader: MoneroBlockHeader = await havendProxy.getLastBlockHeader();

    const recordEntry = createRecordEntry(rawHeader);
    dispatch(getLastBlockerHeaderSucceed(recordEntry));
    }
    catch(e) {
      //  dispatch(addErrorNotification('Failed to fetch price rates'));
    }

    //TODO add some error handling
  };
};

const createRecordEntry = (blockHeader: MoneroBlockHeader): BlockHeaderRate => {
  const pricingRecord: any = {};

  Object.entries(blockHeader.getPricingRecord()).forEach(([key, value]) => {
    if (key !== "signature") {
      // upper case asset key to match Ticker keys
      pricingRecord[key.toUpperCase()] = bigInt(value as number);
    }
  });
  pricingRecord.height = blockHeader.getHeight();
  pricingRecord.timestamp = blockHeader.getTimestamp();
  return pricingRecord;
};

export const getLastBlockerHeaderSucceed = (
  priceRecord: BlockHeaderRate
): AnyAction => {
  return { type: GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED, payload: priceRecord };
};
