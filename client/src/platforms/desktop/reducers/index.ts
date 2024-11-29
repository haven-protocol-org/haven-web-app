import { AnyAction, combineReducers } from "redux";
// Reducers
import theme from "shared/reducers/currentTheme.js";
import { address } from "../../../shared/reducers/address";
import { transferProcess } from "../../../shared/reducers/transferProcess";
import { priceHistory } from "shared/reducers/priceHistory";
import notification from "shared/reducers/notification";
import { walletCreation } from "../../../shared/reducers/walletCreation";
import { STOP_WALLET_SESSION } from "shared/actions/types";
import { chain } from "../../../shared/reducers/chain";
import { walletSession } from "../../../shared/reducers/walletSession";
import { blockHeaderExchangeRate } from "shared/reducers/blockHeaderExchangeRates";
import { xBalance } from "shared/reducers/xBalance";
import { xTransferList } from "shared/reducers/xTransferList";
import { exchangeProcess } from "../../../shared/reducers/exchangeProcess";
import { nodeList, connectedNode } from "./selectedNode";
import { localNode } from "./localNode";
import { mining } from "./localMining";
import { havenFeature } from "shared/reducers/havenFeature";
import modal from "shared/reducers/modal";
import { WebAppState } from "platforms/web/reducers";
import { storedWallets } from "./storedWallets";
import { circulatingSupply } from "shared/reducers/circulatingSupply";
import auditStatus from "shared/reducers/auditStatus";
import { auditProcess } from "shared/reducers/auditProcess";

const appReducer = combineReducers({
  theme,
  address,
  xBalance,
  storedWallets,
  transferProcess,
  xTransferList,
  havenFeature,
  blockHeaderExchangeRate,
  walletCreation,
  exchangeProcess,
  notification,
  walletSession,
  localNode,
  priceHistory,
  chain,
  mining,
  modal,
  connectedNode,
  nodeList,
  circulatingSupply,
  auditStatus,
  auditProcess
});

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === STOP_WALLET_SESSION) {
    const { notification, havenNode, walletRPC } = state;
    state = { notification };
  }

  return appReducer(state, action);
};

export default rootReducer;

export type DesktopAppState = ReturnType<typeof rootReducer>;

export type HavenAppState = DesktopAppState | WebAppState;
