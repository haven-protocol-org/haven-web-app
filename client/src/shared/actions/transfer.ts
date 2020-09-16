
import bigInt from "big-integer";
import { transfer as transferCore } from "shared/wallet-core/wallet-core"; 
import {
  addErrorNotification,
  addNotificationByKey,
} from "shared/actions/notification";
import { TRANSFER_SUCCEED_MESSAGE } from "constants/notificationList";
import { Ticker } from "shared/reducers/types";
import { hideModal, showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { getTransfers } from "platforms/desktop/actions/transferHistory";
import {TxProcessInfo} from "shared/reducers/transferProcess";
import { ITxConfig } from "typings";
import { MoneroDestination, HavenTxType, MoneroTxPriority } from "haven-wallet-core";
import { TRANSFER_FETCHING, TRANSFER_FAILED, TRANSFER_SUCCEED, TRANSFER_CREATION_FETCHING, TRANSFER_CREATION_SUCCEED, TRANSFER_CREATION_FAILED, TRANSFER_RESET } from "platforms/desktop/actions/types";
import { transfer_splitRPC, offshoreTransferRPC, relayTXRPC } from "platforms/desktop/ipc/rpc/rpc";

export const createTransfer = (
  address: string,
  amount: number,
  paymentId: string,
  fromTicker: Ticker
) => {

  const amountInt =  bigInt(amount).multiply(bigInt(1e12));
  return (dispatch: any) => {
    dispatch(transferFetch());

    const destinations = [new MoneroDestination(address, amountInt.toString())]

    const txType =  fromTicker === Ticker.XHV ? HavenTxType.CLASSIC : HavenTxType.OFFSHORE_TO_OFFSHORE;

    const txConfig:  Partial<ITxConfig> = {
      canSplit: true,
      paymentId, destinations,accountIndex:0,
      relay:false,txType,priority:MoneroTxPriority.NORMAL,
    } as Partial<ITxConfig> 
  

    transferCore(txConfig)
    .then((createdTx: any[]) => {
    //  const { fee_list, tx_metadata_list } = result;
      const amount_list = 1
      const reduxParams = {
        fee: null,
        fromAmount: null,
        metaList: undefined,
      } as Partial<TxProcessInfo>; 

      console.log(createdTx[0].toJson());



      dispatch(transferCreationSucceed(reduxParams));
//     dispatch(showModal(MODAL_TYPE.ConfirmTx));
    })
    .catch((error) => {
      dispatch(addErrorNotification(error));
      dispatch(transferCreationFailed(error));
    })
  };
};

export const createTransferOld = (
  address: string,
  fromAmount: number,
  paymentId: string,
  fromTicker: Ticker
) => {
  const amount = fromAmount * 1e12;
  return (dispatch: any) => {
    dispatch(
      transferCreationFetch({ address, fromAmount, paymentId, fromTicker })
    );
    const params: any = createTXInputs(address, amount, paymentId);

    const isOffshoreTX = fromTicker !== Ticker.XHV;
    const transferFN =
    isOffshoreTX ? offshoreTransferRPC:transfer_splitRPC;

    transferFN(params)
      .then((result) => {
        const { fee_list, tx_metadata_list } = result;
        const amount_list = isOffshoreTX ? result.amount_usd_list : result.amount_list;
        const reduxParams = {
          fee: fee_list.reduce( (acc: number, value: number) => acc + value,0 ),
          fromAmount: amount_list.reduce( (acc: number, value: number) => acc + value,0 ),
          metaList: tx_metadata_list,
        } as Partial<TxProcessInfo>;

        dispatch(transferCreationSucceed(reduxParams));
        dispatch(showModal(MODAL_TYPE.ConfirmTx));
      })
      .catch((error) => {
        dispatch(addErrorNotification(error));
        dispatch(transferCreationFailed(error));
      })
    }
}

export const confirmTransfer = (metaList: Array<string>) => {
  return (dispatch: any) => {
    dispatch(transferFetch());

    const promises = metaList.map( (hex) => relayTXRPC({hex}) );

    Promise.allSettled(promises)
      .then(() => {
        dispatch(transferSucceed());
        dispatch(addNotificationByKey(TRANSFER_SUCCEED_MESSAGE));
        dispatch(getTransfers());
      })
      .catch((error) => dispatch(manageTransferFailed(error)))
      .finally(() => dispatch(hideModal()));
  };
};

const createTXInputs = (address: string, amount: number, paymentId: string) => {
  const params: any = {
    destinations: [{ address, amount }],
    ring_size: 11,
    do_not_relay: true,
    get_tx_metadata: true,
  };

  if (paymentId !== "") {
    params["payment_id"] = paymentId;
  }

  return params;
};

const transferFetch = () => ({
  type: TRANSFER_FETCHING,
  payload: { isFetching: true },
});
const transferSucceed = () => ({
  type: TRANSFER_SUCCEED
});

const transferFailed = (error: any) => ({
  type: TRANSFER_FAILED,
  payload: { ...error, isFetching: false },
});

const transferCreationFetch = (params: object) => ({
  type: TRANSFER_CREATION_FETCHING,
  payload: { ...params, isFetching: true },
});
const transferCreationSucceed = (result: object) => ({
  type: TRANSFER_CREATION_SUCCEED,
  payload: { ...result },
});

const transferCreationFailed = (error: any) => ({
  type: TRANSFER_CREATION_FAILED,
  payload: { ...error, isFetching: false },
});

const manageTransferFailed = (error: any) => {
  return (dispatch: any) => {
    dispatch(transferFailed(error));
    dispatch(addErrorNotification(error));
  };
};

export const resetTransferProcess = () => {
  return { type: TRANSFER_RESET };
};
