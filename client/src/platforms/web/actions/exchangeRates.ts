import {handleError} from "platforms/web/api/api";
import {
    GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED
} from "platforms/desktop/actions/types";
import {BlockHeaderRate} from "shared/reducers/blockHeaderExchangeRates";
import {AnyAction} from "redux";
import bigInt from "big-integer";


const ORACLE_URL = 'https://oracle.havenprotocol.org/';


// fetch prices from oracle for web to be consistent with desktop app -> will be replaced later by 'real' blockheader entries
export const getExchangeRates = () => {
    return (dispatch: any) => {
        fetch(ORACLE_URL)
            .then(handleError)
            .then((oracleResponse: any) => createRecordEntry(oracleResponse))
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
