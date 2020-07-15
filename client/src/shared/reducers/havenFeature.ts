import { AnyAction } from "redux";
import { UPDATE_HAVEN_FEATURES } from "shared/actions/types";
import { DesktopAppState } from "platforms/desktop/reducers";
import { WebAppState } from "platforms/web/reducers";
import {createRemainingTimeString} from "utility/utility";

export interface HavenFeature {
  pricesInHeader: boolean;
  offshoreEnabled: boolean;
  xUSDEnabled: boolean;
  blocksTillOffshore: number;
}

const INITIAL_STATE: HavenFeature = {
  pricesInHeader: false,
  offshoreEnabled: false,
  xUSDEnabled: false,
  blocksTillOffshore:-1,
};

export function havenFeature(
  state = INITIAL_STATE,
  action: AnyAction
): HavenFeature {
  switch (action.type) {
    case UPDATE_HAVEN_FEATURES:
      return action.payload;
    default:
      return state;
  }
}
export const selectIsOffshoreEnabled = (
  state: DesktopAppState | WebAppState
): boolean => {
  return state.havenFeature.offshoreEnabled;
};

export const selectBlocksTillOffshore = (
    state: DesktopAppState | WebAppState
): number => {
  return state.havenFeature.blocksTillOffshore;
};

export const selectRemainingTimeStringTillUnlocked = (
    state: DesktopAppState | WebAppState
): string => {
  if (state.havenFeature.blocksTillOffshore <= 0) {
    return "";
  }
  return createRemainingTimeString(state.havenFeature.blocksTillOffshore * 2);
};


export const selectIsPriceInHeader = (
    state: DesktopAppState | WebAppState
): boolean => {
  return state.havenFeature.pricesInHeader;
};
