import { AnyAction } from "redux";
import {
  GET_BLOCK_HEADER_EXCHANGE_RATE_FETCH,
  GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED
} from "./types";
import { getLastBlockHeaderRPC } from "../ipc/rpc/rpc";
import { BlockHeaderRate } from "../reducers/blockHeaderExchangeRates";
import bigInt from "big-integer";

export const getLastBlockHeader = () => {

  return (dispatch: any) => {
    dispatch({ type: GET_BLOCK_HEADER_EXCHANGE_RATE_FETCH });

    getLastBlockHeaderRPC()
      .then((res: any) => createRecordEntry(res))
      .then((priceEntry: BlockHeaderRate) =>
        dispatch(getLastBlockerHeaderSucceed(priceEntry))
      )
      .catch((err) => console.log(err));
  };
};

const createRecordEntry = (rawBlockHeaderData: any): BlockHeaderRate => {
  const blockHeader = rawBlockHeaderData.block_header;
  const blockHeight: number = blockHeader.height +1;
  Object.entries(blockHeader.pricing_record)
      .forEach(([key, value]) => {
        if (key !== 'signature') {
          blockHeader.pricing_record[key] = bigInt(value as number)
        }
      });
  const priceRecord = blockHeader.pricing_record;
  priceRecord.height = blockHeight;
  priceRecord.timestamp = blockHeader.timestamp;
  return priceRecord;
};

export const getLastBlockerHeaderSucceed = (
  priceRecord: BlockHeaderRate
): AnyAction => {
  return { type: GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED, payload: priceRecord };
};
