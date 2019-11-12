import { combineReducers } from "redux";

// Reducers
import theme from "../../../reducers/currentTheme.js";
import address from "../../../reducers/address.js";
import { balance } from "../../../reducers/balance.js";
import keys from "./keys";
import { transferList } from "../../../reducers/transferList";
import { priceHistory } from "../../../reducers/priceHistory";
import notification from "../../../reducers/notification";
import { CLOSE_WALLET } from "../../../actions/types";
import { account } from "./account";
import { simplePrice } from "../../../reducers/simplePrice";
import { chain } from "./chain";
import {transferProcess} from "./transferProcess";
import forex from "../../../reducers/forex";

const appReducer = combineReducers({
  theme,
  address,
  balance,
  chain,
  keys,
  transferList,
  priceHistory,
  notification,
  account,
  simplePrice,
  transferProcess,
  forex
});

const rootReducer = (state, action) => {
  if (action.type === CLOSE_WALLET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
