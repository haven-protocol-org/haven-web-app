import { AnyAction, combineReducers } from "redux";
// Reducers
import theme from "shared/reducers/currentTheme.js";
import address from "../../../shared/reducers/address";
import { transferProcess } from "../../../shared/reducers/transferProcess";
import { priceHistory } from "shared/reducers/priceHistory";
import notification from "shared/reducers/notification";
import { walletCreation } from "../../../shared/reducers/walletCreation";
import { CLOSE_WALLET } from "shared/actions/types";
import { chain } from "../../../shared/reducers/chain";
import { simplePrice } from "shared/reducers/simplePrice";
import { walletSession } from "../../../shared/reducers/walletSession";
import forex from "../../../shared/reducers/forex";
import { blockHeaderExchangeRate } from "shared/reducers/blockHeaderExchangeRates";
import { xBalance } from "shared/reducers/xBalance";
import { xTransferList } from "shared/reducers/xTransferList";
import { exchangeProcess } from "../../../shared/reducers/exchangeProcess";
import { havenNode } from "./havenNode";
import { walletRPC } from "./walletRPC";
import { mining } from "./mining";
import {havenFeature} from "shared/reducers/havenFeature";
import modal from "shared/reducers/modal";
import { WebAppState } from "platforms/web/reducers";

const appReducer = combineReducers({
  theme,
  address,
  xBalance,
  transferProcess,
  xTransferList,
  forex,
  havenFeature,
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

export type HavenAppState = DesktopAppState | WebAppState;