import { AnyAction, combineReducers } from "redux";

// Reducers
import theme from "shared/reducers/currentTheme.js";
import address from "shared/reducers/address";
import { transferList } from "shared/reducers/transferList";
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

const appReducer = combineReducers({
  theme,
  address,
  xBalance,
  havenFeature,
  chain,
  transferList,
  priceHistory,
  notification,
  simplePrice,
  transferProcess,
  exchangeProcess,
  forex,
  xhvVsCurrencies,
  blockHeaderExchangeRate,
  walletSession
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === CLOSE_WALLET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

export type WebAppState = ReturnType<typeof rootReducer>;
