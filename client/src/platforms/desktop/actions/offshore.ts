import {
    offshoreRPC,
    onshoreRPC
} from "../rpc/rpc";
import {addOffShoreSucceedMessage, addOnShoreSucceedMessage} from "../../../universal/actions/notification";

import {
    OFFSHORE_FAILED,
    OFFSHORE_FETCHING,
    ONSHORE_FAILED,
    ONSHORE_FETCHING,
    ONSHORE_SUCCEED
} from "./types";
import {updateApp} from "./refresh";
import {Dispatch} from "redux";
import {AppState} from "../reducers";


export function onshore(amount: number) {

    amount = amount * 1e12;
    return (dispatch: any, getState:() => AppState ) => {

        dispatch(onshoreFetch());

        const address = getState().address.main;
        const params = { destinations: [{ address, amount }] };

        onshoreRPC(params)
            .then((result: any) => {
                dispatch(onshoreSucceed());
                dispatch(addOnShoreSucceedMessage(result.amount));
                dispatch(updateApp());
            })
            .catch( (error: any) => dispatch(onOnShoreFailed(error)));
    };
}


export function offshore(amount: number) {

    amount = amount * 1e12;
    return (dispatch: Dispatch, getState: () => AppState) => {

        const address = getState().address.main;
        dispatch(offshoreFetch());
        const params = { destinations: [{ address, amount }] };


        offshoreRPC(params)
            .then( (result: any) => {
                dispatch(offshoreSucceed());
                dispatch(addOffShoreSucceedMessage(result.amount));
                updateApp();
            })
            .catch( (error: any) => dispatch(onOffShoreFailed(error)));
    };
}

const onshoreFetch = () => {
  return {type: ONSHORE_FETCHING};
};

const onshoreSucceed = () => {
    return {type: ONSHORE_SUCCEED};
};

const onOnShoreFailed = (error: any) => {

    return {type: ONSHORE_FAILED};
};

const offshoreFetch = () => {
  return {type: OFFSHORE_FETCHING};
};

const offshoreSucceed = () => {
    return {type: ONSHORE_SUCCEED};
};

const onOffShoreFailed = (error: any) => {

    console.log(error);
    return {type: OFFSHORE_FAILED};
};



