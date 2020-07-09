import {
    GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED
} from "platforms/desktop/actions/types";
import {BlockHeaderRate} from "shared/reducers/blockHeaderExchangeRates";
import {AnyAction} from "redux";
import bigInt from "big-integer";


const HAVEN_STATS_URL = 'https://network-api.havenprotocol.org/api-stagenet/info';

// fetch prices from stats api for web/desktop mainnet to be consistent with desktop app -> will be replaced later by 'real' blockheader entries
export const getExchangeRates = () => {
    return (dispatch: any) => {
        fetch(HAVEN_STATS_URL)
            .then((res: any) => createRecordEntry(res))
            .then((priceEntry: BlockHeaderRate) =>
                dispatch(getLastBlockerHeaderSucceed(priceEntry))
            )
            .catch((err: any) => console.log(err));
    };
};

const createRecordEntry = async (apiResponse: Response): Promise<BlockHeaderRate> => {

    const data: any = await apiResponse.json();
    const pricingRecord = data.db_lastblock.pricing_record;
    Object.entries(pricingRecord).forEach(([key, value]) => {
        try {
            pricingRecord[key] = bigInt(value as number);
        }
        catch {
            pricingRecord[key] = bigInt(Number(value) * Math.pow(10,12));
        }

    });
    pricingRecord.height = -1;
    pricingRecord.timestamp = Date.now();
    return pricingRecord;
};

export const getLastBlockerHeaderSucceed = (
    priceRecord: BlockHeaderRate
): AnyAction => {
    return { type: GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED, payload: priceRecord };
};
