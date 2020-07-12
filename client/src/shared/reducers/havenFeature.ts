import {AnyAction} from "redux";
import {UPDATE_HAVEN_FEATURES} from "shared/actions/types";


export interface HavenFeature {
    pricesInHeader: boolean
    offshoreEnabled: boolean;
    xUSDEnabled: boolean;
};

const INITIAL_STATE: HavenFeature = {
    pricesInHeader: false,
    offshoreEnabled: false,
    xUSDEnabled: false,
};

export default function (state = INITIAL_STATE, action: AnyAction) {
    switch (action.type) {
        case UPDATE_HAVEN_FEATURES:
            return action.payload;
        default:
            return state;
    }
}
