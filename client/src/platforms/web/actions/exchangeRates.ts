import {handleError} from "platforms/web/api/api";
import {
    GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED
} from "platforms/desktop/actions/types";
import {BlockHeaderRate} from "shared/reducers/blockHeaderExchangeRates";
import {AnyAction} from "redux";
import bigInt from "big-integer";


const ORACLE_URL = 'https://oracle.havenprotocol.org/';

const mockOracleResponse = {"pr":{"PricingRecordPK":729236,"xAG":70801836094,"xAU":714623226,"xAUD":1821961447863,"xBTC":134343549,"xCAD":0,"xCHF":1185911470832,"xCNY":0,"xEUR":1114121352556,"xGBP":1008427853605,"xJPY":133109195525160,"xNOK":0,"xNZD":0,"xUSD":1245292430000,"unused1":1108400000000,"unused2":1091900000000,"unused3":1057900000000,"signature":"4877cc46617442a179e0e03722245f7619f8732d66cabf4baa2392c9fc7451bac4b0dd9605f2b73bc9d8912ae9a553ea6d17bfee121b0d5cde2d8b20addb0535","timestamp":1592680960}};


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


export const mockGetExchangeRates = () => {
    return (dispatch: any) => {

            const priceEntry: BlockHeaderRate = createRecordEntry(mockOracleResponse.pr);
            dispatch(getLastBlockerHeaderSucceed(priceEntry));

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
