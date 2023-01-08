import { walletProxy } from "shared/core/proxy";
import { addErrorNotification } from "./notification";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import { convertBalanceToMoney } from "utility/utility";
import {
  GET_TRANSFERS_SUCCEED,
  GET_TRANSFERS_FETCHING,
  GET_TRANSFERS_FAILED,
} from "./types";

export const getAllTransfers = () => {
  return async (dispatch: any) => {
    dispatch(getTransfersFetching());

    try {
      let transfers: MoneroTxWallet[] = await walletProxy.getTxs();
      dispatch(getTransfersSucceed(transfers));
    } catch (e) {
      dispatch(addErrorNotification(e));
      dispatch(getTransfersFailed(e));
    }
  };
};

//type can be csv or json
export const downloadTransfers = (type: string) => {

  return async (dispatch: any) => {
    dispatch(getTransfersFetching());

    try {
      let transfers: MoneroTxWallet[] = await walletProxy.getTxs();
      dispatch(getTransfersSucceed(transfers));

      if( transfers && transfers.length > 0){

        let dt = new Date();
        let datestr = dt.toISOString().split('T')[0] + "_" + dt.toISOString().split('T')[1].split('.')[0].replace(":","");
        let str_out = "";
        let filename = "haven_tx-"+ datestr;
        let mimetype = "text/csv;charset=utf-8;";

        if( type == "json"){

          let tx_json = transfers.map(tx => tx.toJson() );
          str_out = JSON.stringify( tx_json , null , "\t" );
          filename += ".json";
          mimetype = "application/json;charset=utf-8;";

        }else{
          //assume csv  
          let fields = ["Height","InOut","UnlockHeight","Timestamp","Hash","Amount","Currency","Fee","Confirmed","Locked","Version","Mined","PaymentID","Key","Confirmations","Address"];
          str_out += fields.join(",") + "\n";

          for (let i = 0; i < transfers.length; i++) {
            let tx_csv_obj = transfers[i].toCsvObj(fields); //NOTE: toCsvObj returns an array of objects with kv data 
            if( tx_csv_obj.length > 0){
              //make human readable amounts
              for (let r = 0; r < tx_csv_obj.length; r++) {
                let numDecimals = ( ["XAG","XAU","XBTC"].includes(tx_csv_obj[r]["Currency"]) ) ? 4 : 2;
                tx_csv_obj[r]["Fee"] = ( tx_csv_obj[r]["Fee"] > 0) ? convertBalanceToMoney( tx_csv_obj[r]["Fee"], numDecimals) : 0;
                tx_csv_obj[r]["Amount"] = ( tx_csv_obj[r]["Amount"] > 0) ? convertBalanceToMoney( tx_csv_obj[r]["Amount"], numDecimals) : 0;
                tx_csv_obj[r]["Timestamp"] = new Date(tx_csv_obj[r]["Timestamp"] * 1000).toUTCString();

                if( tx_csv_obj[r]["Timestamp"].indexOf(",") !== -1 ){
                  tx_csv_obj[r]["Timestamp"] = tx_csv_obj[r]["Timestamp"].split(",").slice(1).join("");
                }
                let orderedCsvData = []; //order the data into field ordering
                for (let f = 0; f < fields.length; f++) {
                  orderedCsvData.push( tx_csv_obj[r][ fields[f] ] );
                }
                str_out += orderedCsvData.join(',') + "\n";
              }
            }
          }
          filename += ".csv";
        }

        var blob = new Blob([str_out], { type: mimetype });

        //@ts-ignore
        if (navigator.msSaveBlob) { // IE 10+
                  //@ts-ignore
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }

      }

    } catch (e) {
      dispatch(addErrorNotification(e));
      dispatch(getTransfersFailed(e));
    }
  };
};

const getTransfersSucceed = (walletTxs: MoneroTxWallet[]) => ({
  type: GET_TRANSFERS_SUCCEED,
  payload: walletTxs,
});

const getTransfersFetching = () => ({
  type: GET_TRANSFERS_FETCHING,
  payload: { isFetching: true },
});

const getTransfersFailed = (error: any) => ({
  type: GET_TRANSFERS_FAILED,
  payload: error,
});
