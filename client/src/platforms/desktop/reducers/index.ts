import { AnyAction, combineReducers } from "redux";
// Reducers
import theme from "shared/reducers/currentTheme.js";
import address from "../../../shared/reducers/address";
import { transferProcess } from "./transferProcess";
import { priceHistory } from "shared/reducers/priceHistory";
import notification from "shared/reducers/notification";
import { walletCreation } from "./walletCreation";
import { CLOSE_WALLET } from "shared/actions/types";
import { chain } from "./chain";
import { simplePrice } from "shared/reducers/simplePrice";
import { walletSession } from "./walletSession";
import forex from "../../../shared/reducers/forex";
import { blockHeaderExchangeRate } from "shared/reducers/blockHeaderExchangeRates";
import { xBalance } from "shared/reducers/xBalance";
import { xTransferList } from "shared/reducers/xTransferList";
import { exchangeProcess } from "./exchangeProcess";
import { havenNode } from "./havenNode";
import { walletRPC } from "./walletRPC";
import { mining } from "./mining";
import modal from "shared/reducers/modal";

const appReducer = combineReducers({
  theme,
  address,
  xBalance,
  transferProcess,
  xTransferList,
  forex,
  blockHeaderExchangeRate,
  walletCreation,
  exchangeProcess,
  notification,
  walletSession,
  havenNode,
  walletRPC,
  priceHistory,
  chain,
  simplePrice,
  mining,
  modal,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === CLOSE_WALLET) {

    const {notification, havenNode, walletRPC} = state;
    state = {notification, havenNode, walletRPC};
  }

  return appReducer(state, action);
};

export default rootReducer;

export type DesktopAppState = ReturnType<typeof rootReducer>;
