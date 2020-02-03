/* global BigInt */

import { notificationList } from "constants/notificationList";
import { NO_PRICE } from "shared/reducers/priceHistory";
import { NO_BALANCE } from "shared/reducers/xBalance";
import {Ticker} from "shared/reducers/types";

export const convertTimestampToDateString = (timestamp: any) =>
  new Date(timestamp).toLocaleDateString();

//coingeckeo delivers to many prices, so we decrease them
export const decreasePricePoints = (priceData: any) => {
  const prices = priceData.prices;
  const decreasedPrices = [];
  const maxVal = 30;
  const delta = Math.round(prices.length / maxVal);
  let i;
  for (i = 0; i < prices.length; i += delta) {
    decreasedPrices.push(prices[i]);
  }

  return { prices: decreasedPrices };
};

export const getCurrentValueInUSD = (amount: number, ticker: Ticker, priceInUSD: number) => {
  const humanAmount: number = convertBalanceForReading(Math.abs(amount));

  switch (ticker) {
    case Ticker.xUSD:
      return humanAmount;
    case Ticker.XHV:
      return humanAmount * priceInUSD;
  }
};

export const convertBalanceForReading = (balance: any) => {
  if (balance === NO_BALANCE) return balance;

  let readableBalance: any;
  if (typeof balance === "bigint") {
    readableBalance = Number(balance / BigInt(Math.pow(10, 8)));

    return readableBalance / 10000;
  }

  readableBalance = (balance / Math.pow(10, 12)).toFixed(4);

  if (readableBalance % 1 === 0) return parseInt(readableBalance);
  return readableBalance;
};


export const convertToMoney = (atomicMoney: any) => {

  if (atomicMoney === NO_BALANCE) return -1;

  let readableBalance;
  if (typeof atomicMoney === "bigint") {
    readableBalance = Number(atomicMoney / BigInt(Math.pow(10, 8)));

    return readableBalance / 10000;
  }

  readableBalance = atomicMoney / Math.pow(10, 12);

  if (readableBalance % 1 === 0) return Math.round(readableBalance);
  return readableBalance;
};

export const uuidv4 = () => {
  var uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-"
    }
    uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
};

export const getMessageOfError = (error: any) => {
  const errorNotification = notificationList.find(
    notification => notification.code === error.code
  );
  return errorNotification ? errorNotification.message : error.message;
};

export const estimateFee = () => {
  // const fee = lWallet.estimated_tx_network_fee(null, 1, "24658");
  return null;
};

export const calcValue = (amount: any, price: any) => {
  if (amount === NO_BALANCE || price === NO_PRICE) {
    return "--";
  } else {
    return (amount * price).toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }
};

export const getPriceDates = (prices: any) => {
  return prices.map( (priceItem: any) => convertTimestampToDateString(priceItem[0]));
};

export const getPriceValues = (prices:any) => {
  return prices.map((priceItem: any) => priceItem[1]);
};

export const logM = (message:any) => {
  console.log(message);
};


export const createRemainingTimeString = (remainingTimeInMinutes: number) => {

  const days = Math.floor(remainingTimeInMinutes / (60 * 24));
  const hours = Math.floor(((remainingTimeInMinutes % (60 * 24))/60 ));
  const minutes = Math.floor((remainingTimeInMinutes % 60));

  const timeString =  (days > 0 ? days + 'd ' : '') + (hours > 0 ? hours + 'h ': '') + (minutes > 0 ? minutes + 'm' : '');
  return timeString;


};
