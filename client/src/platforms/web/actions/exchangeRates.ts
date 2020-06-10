import {handleError} from "platforms/web/api/api";
import {GET_BITCOIN_SUCEED, GET_SIMPLE_PRICE_SUCCEED} from "shared/actions/types";
import {
    GET_BLOCK_HEADER_EXCHANGE_RATE_FETCH,
    GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED
} from "platforms/desktop/actions/types";
import {getLastBlockHeaderRPC} from "platforms/desktop/ipc/rpc/rpc";
import {BlockHeaderRate} from "shared/reducers/blockHeaderExchangeRates";
import {AnyAction} from "redux";
import bigInt from "big-integer";


const ORACLE_URL = 'http://oracle.havenprotocol.org:443/';


// fetch prices from oracle for web to be consistent with desktop app -> will be replaced later by 'real' blockheader entries
export const getExchangeRates = () => {
    return (dispatch: any) => {
        fetch(
            "ORACLE_URL"
        )
            .then(handleError)
            .then((oracleResponse: any) => createRecordEntry(oracleResponse))
            .then((priceEntry: BlockHeaderRate) =>
                dispatch(getLastBlockerHeaderSucceed(priceEntry))
            )
            .catch((err) => console.log(err));
    };
};

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


const createRecordEntry = (oracleResponse: any): BlockHeaderRate => {

    const priceRecord: Partial<BlockHeaderRate> = {};
    Object.entries(oracleResponse).forEach(([key, value]) => {
        if (key !== "signature") {
            priceRecord[key] = bigInt(value as number);
        }
    });
    // our oracle price data is not mapped to a height
    priceRecord.height = -1;
    priceRecord.timestamp = oracleResponse.timestamp;
    return priceRecord as BlockHeaderRate;
};

export const getLastBlockerHeaderSucceed = (
    priceRecord: BlockHeaderRate
): AnyAction => {
    return { type: GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED, payload: priceRecord };
};
