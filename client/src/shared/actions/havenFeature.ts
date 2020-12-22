import { isMainnet } from "constants/env";
import { HavenFeature } from "shared/reducers/havenFeature";
import { UPDATE_HAVEN_FEATURES } from "shared/actions/types";

export const PRICE_RECORDS_IN_HEADER_HEIGHT: number = 640640;
export const OFFSHORE_START_HEIGHT: number = 640650;

export const PRICE_RECORDS_IN_HEADER_HEIGHT_STAGENET: number = 125;
export const OFFSHORE_START_HEIGHT_STAGENET: number = 135;

export const updateHavenFeatures = (height: number) => {
  return (dispatch: any) => {
    if (isMainnet()) {
      const update: HavenFeature = {
        blocksTillOffshore: Math.max(OFFSHORE_START_HEIGHT - height, 0),
        pricesInHeader: height >= PRICE_RECORDS_IN_HEADER_HEIGHT,
        offshoreEnabled: height >= OFFSHORE_START_HEIGHT,
        xUSDEnabled: height >= OFFSHORE_START_HEIGHT,
      };
      dispatch({ type: UPDATE_HAVEN_FEATURES, payload: update });
    } else {
      const update: HavenFeature = {
        blocksTillOffshore: Math.max(OFFSHORE_START_HEIGHT_STAGENET - height),
        pricesInHeader: height >= PRICE_RECORDS_IN_HEADER_HEIGHT_STAGENET,
        offshoreEnabled: height >= OFFSHORE_START_HEIGHT_STAGENET,
        xUSDEnabled: height >= OFFSHORE_START_HEIGHT_STAGENET,
      };

      dispatch({ type: UPDATE_HAVEN_FEATURES, payload: update });
    }
  };
};
