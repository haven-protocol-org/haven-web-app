import {isMainnet} from "constants/env";
import {HavenFeature} from "shared/reducers/havenFeature";
import {UPDATE_HAVEN_FEATURES} from "shared/actions/types";

export const PRICE_RECORDS_IN_HEADER_HEIGHT: number = 640640;
export const OFFSHORE_START_HEIGHT: number =  640650;



export const updateHavenFeatures = (height: number) => {

    return (dispatch: any) => {

        if (isMainnet()) {
            const update: HavenFeature = {
                pricesInHeader: height >= PRICE_RECORDS_IN_HEADER_HEIGHT,
                offshoreEnabled: height >= OFFSHORE_START_HEIGHT,
                xUSDEnabled: height >= OFFSHORE_START_HEIGHT
            };
            dispatch({type: UPDATE_HAVEN_FEATURES, payload: update});

    } else {
            const update: HavenFeature = {
                pricesInHeader: true,
                offshoreEnabled:true,
                xUSDEnabled: true
            };

            dispatch({type: UPDATE_HAVEN_FEATURES, payload: update});
        }
    }
}
