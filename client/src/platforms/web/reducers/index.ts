import {AnyAction, combineReducers} from "redux";

// Reducers
import theme from "shared/reducers/currentTheme.js";
import address from "shared/reducers/address.js";
import keys from "./keys";
import { transferList } from "shared/reducers/transferList";
import { priceHistory } from "shared/reducers/priceHistory";
import notification from "shared/reducers/notification";
import { CLOSE_WALLET } from "shared/actions/types";
import { account } from "./account";
import { simplePrice } from "shared/reducers/simplePrice";
import { chain } from "./chain";
import {transferProcess} from "./transferProcess";
import forex from "shared/reducers/forex";
import {xBalance} from "shared/reducers/xBalance";
import {xhvVsCurrencies} from "platforms/web/reducers/xhvVsCurrencies";

const appReducer = combineReducers({
  theme,
  address,
  xBalance,
  chain,
  keys,
  transferList,
  priceHistory,
  notification,
  account,
  simplePrice,
  transferProcess,
  forex,
  xhvVsCurrencies
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === CLOSE_WALLET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;


export type WebAppState = ReturnType<typeof rootReducer>
