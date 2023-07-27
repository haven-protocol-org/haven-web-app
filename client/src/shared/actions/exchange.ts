import {
  addErrorNotification,
  addExchangeSucceedMessage,
} from "shared/actions/notification";
import {
  EXCHANGE_CREATION_FAILED,
  EXCHANGE_CREATION_FETCHING,
  EXCHANGE_CREATION_SUCCEED,
  EXCHANGE_FAILED,
  EXCHANGE_FETCHING,
  EXCHANGE_RESET,
  EXCHANGE_SUCCEED,
  SELECT_FROM_TICKER,
  SELECT_TO_TICKER,
  SET_COLLATERAL,
} from "./types";
import { walletProxy } from "shared/core/proxy";
import { DesktopAppState } from "../../platforms/desktop/reducers";
import { Ticker } from "shared/reducers/types";
import { showModal } from "shared/actions/modal";
import { MODAL_TYPE } from "shared/reducers/modal";
import { selectPrimaryAddress } from "shared/reducers/address";
import {
  ExchangeProcessInfo,
} from "shared/reducers/exchangeProcess";
import { ITxConfig } from "typings";
import MoneroDestination from "haven-wallet-core/src/main/js/wallet/model/MoneroDestination";
import MoneroTxWallet from "haven-wallet-core/src/main/js/wallet/model/MoneroTxWallet";
import bigInt from "big-integer";
import {convertMoneyToBalance } from "utility/utility";


export const setToTicker = (toTicker: Ticker | null) => {
  return { type: SELECT_TO_TICKER, payload: toTicker };
};

export const setFromTicker = (fromTicker: Ticker | null) => {
  return { type: SELECT_FROM_TICKER, payload: fromTicker };
};

export const setRequiredCollateral = (fromTicker: Ticker, toTicker:Ticker, fromAmount:number) => {
  return async (dispatch: any) => {
    const amount = convertMoneyToBalance(fromAmount);
    const response = await walletProxy.getCollateralRequirements(fromTicker, toTicker, amount.toString());
    let collateral: bigInt.BigInteger = bigInt(response.toString());
    dispatch({type: SET_COLLATERAL, payload: collateral});
  }

}

//TOKENOMICS below - priority needs updating
export function createExchange(
  fromTicker: Ticker,
  toTicker: Ticker,
  fromAmount: number,
  toAmount: number,
  priority: number,
  externAddress: string,
  subaddressIndex:number | undefined,
): any {
  return async (dispatch: any, getState: () => DesktopAppState) => {

    const address =
      externAddress.trim() !== ""
        ? externAddress
        : selectPrimaryAddress(getState().address.entrys);
    //only handle exchanges
    if(toTicker === fromTicker){
      dispatch(addErrorNotification({"error":"Conversions must be between different assets"}));
      return ;
    }

    //conversions should always be "proxied" via xUSD
    if(toTicker !== Ticker.xUSD && fromTicker !== Ticker.xUSD){
      dispatch(addErrorNotification({"error":"Conversions must be via xUSD"}));
      return ;
    }


    // we have a xassetConversion when XHV is not involved
    let xassetConversion: boolean = fromTicker !== Ticker.XHV && toTicker !== Ticker.XHV;

    let exchangeAmount: number = fromAmount;

    let amount = convertMoneyToBalance(exchangeAmount);
    // we need to round the value as just for digits are allowed for onshore/offshore
    const roundingValue = bigInt(100000000);
    amount = amount.divide(roundingValue).multiply(roundingValue);
    dispatch(
      onExchangeCreationFetch({ priority, address, xassetConversion } as Partial<
        ExchangeProcessInfo
      >)
    );
    const destinations = [
      new MoneroDestination(address, amount.toString()).toJson(),
    ];

//TOKENOMICS below - priority needs updating
    const txConfig: Partial<ITxConfig> = {
      canSplit: true,
      destinations,
      accountIndex: 0,
      relay: false,
      priority,
      subaddressIndex,
      sourceCurrency: fromTicker,
      destinationCurrency: toTicker
    } as Partial<ITxConfig>;

    try {
      const createdTx: MoneroTxWallet[] = await walletProxy.transfer(txConfig);

      const exchangeInfo = parseExchangeResonse(createdTx);
      dispatch(onExchangeCreationSucceed(exchangeInfo));
      dispatch(showModal(MODAL_TYPE.ConfirmExchange));
    } catch (e) {
      dispatch(addErrorNotification(e));
      dispatch(onExchangeCreationFailed(e));
    }
  };
}

const parseExchangeResonse = (
  txList: MoneroTxWallet[]): Partial<ExchangeProcessInfo> => {
  let fromAmount: bigInt.BigInteger;
  let toAmount: bigInt.BigInteger;
  let fee: bigInt.BigInteger;
  let change: bigInt.BigInteger = bigInt(0);
  let requiredCollateral:bigInt.BigInteger = bigInt(0);

  //@ts-ignore
  toAmount = txList.reduce(
    (acc: bigInt.BigInteger, tx: MoneroTxWallet) =>
      //@ts-ignore
      acc.add(bigInt(tx.getIncomingAmount().toString())),
    bigInt(0)
  );
  fromAmount = txList.reduce(
    (acc: bigInt.BigInteger, tx: MoneroTxWallet) =>
      acc.add(bigInt(tx.getOutgoingAmount().toString())),
    bigInt(0)
  );
  fee = txList.reduce(
    (acc: bigInt.BigInteger, tx: MoneroTxWallet) =>
      acc.add(bigInt(tx.getFee().toString())),
    bigInt(0)
  );
  change = txList.reduce(
    (acc: bigInt.BigInteger, tx: MoneroTxWallet) =>
      acc.add(bigInt(tx.getChangeAmount().toString())),
    bigInt(0)
  ); 
  requiredCollateral = txList.reduce(
    (acc: bigInt.BigInteger, tx: MoneroTxWallet) =>
     //@ts-ignore
      acc.add(bigInt(tx.getCollateralAmount().toString())),
    bigInt(0)
  ); 
  const metaList: Array<string> = txList.map((tx: MoneroTxWallet) =>
    tx.getMetadata()
  );
  return { fromAmount, toAmount, fee, metaList, change, requiredCollateral };
};

export const confirmExchange = (metaList: Array<string>) => {
  return async (dispatch: any, getState: () => DesktopAppState) => {
    dispatch(onExchangeFetch());

    try {
      const hashes = await walletProxy.relayTxs(metaList);
      dispatch(onExchangeSucceed());
      const {
        fromAmount,
        toAmount,
        fromTicker,
        toTicker,
      } = getState().exchangeProcess;
      dispatch(
        addExchangeSucceedMessage(
          fromTicker!,
          toTicker!,
          fromAmount!,
          toAmount!
        )
      );
    } catch (e) {
      dispatch(addErrorNotification(e));
      dispatch(onExchangeFailed(e));
    }
    dispatch(resetExchangeProcess());
  };
};

const onExchangeCreationSucceed = (payload: any) => {
  return { type: EXCHANGE_CREATION_SUCCEED, payload };
};

const onExchangeCreationFailed = (error: any) => {
  return { type: EXCHANGE_CREATION_FAILED, payload: error };
};

const onExchangeCreationFetch = (payload: Partial<ExchangeProcessInfo>) => {
  return { type: EXCHANGE_CREATION_FETCHING, payload };
};

const onExchangeSucceed = () => {
  return { type: EXCHANGE_SUCCEED };
};

const onExchangeFailed = (error: any) => {
  return { type: EXCHANGE_FAILED, payload: error };
};

const onExchangeFetch = () => {
  return { type: EXCHANGE_FETCHING };
};
export const resetExchangeProcess = () => {
  return { type: EXCHANGE_RESET };
};
