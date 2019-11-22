import {AnyAction, combineReducers} from "redux";

// Reducers
import theme from "../../../universal/reducers/currentTheme.js";
import address from "./address.js";
import { balance } from "./balance";
import {transferProcess} from "./transferProcess";
import { transferList } from "./transferList";
import { priceHistory } from "../../../universal/reducers/priceHistory";
import notification from "../../../universal/reducers/notification";
import walletCreation from "./walletCreation";
import {CLOSE_WALLET} from "../../../universal/actions/types";
import {chain} from "./chain";
import {simplePrice} from "../../../universal/reducers/simplePrice";
import {walletSession} from "./walletSession";
import forex from "../../../universal/reducers/forex";

const appReducer = combineReducers({
  theme,
  address,
  balance,
  transferProcess,
  transferList,
  forex,
  walletCreation,
  notification,
  walletSession,
  priceHistory,
  chain,
  simplePrice
});



const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === CLOSE_WALLET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;


export type AppState = ReturnType<typeof rootReducer>
