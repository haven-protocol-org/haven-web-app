import { AnyAction } from "redux";
import { UPDATE_HAVEN_FEATURES } from "shared/actions/types";
import { isDesktop, isMainnet } from "constants/env";
import { DesktopAppState } from "platforms/desktop/reducers";
import { WebAppState } from "platforms/web/reducers";

export interface HavenFeature {
  pricesInHeader: boolean;
  offshoreEnabled: boolean;
  xUSDEnabled: boolean;
}

const INITIAL_STATE: HavenFeature = {
  pricesInHeader: false,
  offshoreEnabled: false,
  xUSDEnabled: false,
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
