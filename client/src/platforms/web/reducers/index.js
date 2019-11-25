import { combineReducers } from "redux";

// Reducers
import theme from "../../../universal/reducers/currentTheme.js";
import address from "../../../universal/reducers/address.js";
import keys from "./keys";
import { transferList } from "../../../universal/reducers/transferList";
import { priceHistory } from "../../../universal/reducers/priceHistory";
import notification from "../../../universal/reducers/notification";
import { CLOSE_WALLET } from "../../../universal/actions/types";
import { account } from "./account";
import { simplePrice } from "../../../universal/reducers/simplePrice";
import { chain } from "./chain";
import {transferProcess} from "./transferProcess";
import forex from "../../../universal/reducers/forex";
import {xBalance} from "../../../universal/reducers/xBalance";

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
  forex
});

const rootReducer = (state, action) => {
  if (action.type === CLOSE_WALLET) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
