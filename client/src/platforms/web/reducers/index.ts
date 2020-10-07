import { AnyAction, combineReducers } from "redux";

// Reducers
import theme from "shared/reducers/currentTheme.js";
import address from "shared/reducers/address";
import { xTransferList } from "shared/reducers/xTransferList";
import { priceHistory } from "shared/reducers/priceHistory";
import notification from "shared/reducers/notification";
import { CLOSE_WALLET } from "shared/actions/types";
import { simplePrice } from "shared/reducers/simplePrice";
import { chain } from "shared/reducers/chain";
import {transferProcess} from "shared/reducers/transferProcess"
import {exchangeProcess} from "shared/reducers/exchangeProcess";
import forex from "shared/reducers/forex";
import { xBalance } from "shared/reducers/xBalance";
import { xhvVsCurrencies } from "platforms/web/reducers/xhvVsCurrencies";
import {blockHeaderExchangeRate} from "shared/reducers/blockHeaderExchangeRates";
import {havenFeature} from "shared/reducers/havenFeature";
import {walletSession} from "shared/reducers/walletSession"
import {walletCreation} from "shared/reducers/walletCreation"
import modal from "shared/reducers/modal";
import { STOP_WALLET_SESSION } from "platforms/desktop/actions/types";

const appReducer = combineReducers({
  theme,
  address,
  xBalance,
  havenFeature,
  chain,
  xTransferList,
  priceHistory,
  notification,
  simplePrice,
  transferProcess,
  exchangeProcess,
  forex,
  xhvVsCurrencies,
  blockHeaderExchangeRate,
  walletSession,
  walletCreation,modal
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === STOP_WALLET_SESSION) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

export type WebAppState = ReturnType<typeof rootReducer>;
