import { combineReducers } from "redux";

// Reducers
import theme from "../../../reducers/currentTheme.js";
import address from "./address.js";
import {appState} from "./appState.js";
import { balance } from "./balance.js";
import transfer from "./transfer";
import { transferList } from "./transferList";
import { priceHistory } from "../../../reducers/priceHistory";
import notification from "../../../reducers/notification";
import walletCreation from "./walletCreation";
import { CLOSE_WALLET } from "../actions/types";
import chain from "./chain";
import {simplePrice} from "../../../reducers/simplePrice";

const appReducer = combineReducers({
  theme,
  address,
  appState,
  balance,
  transfer,
  transferList,
  walletCreation,
  walletSession,
  priceHistory,
  notification,
  chain,
  simplePrice
});

const rootReducer = (state, action) => {
  if (action.type === CLOSE_WALLET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
