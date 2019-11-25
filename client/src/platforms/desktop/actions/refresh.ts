import {Dispatch} from "redux";
import {getBalance} from "./balance";
import {getNodeInfo} from "./chain";
import {getTransfers} from "./transferHistory";
import {refreshRPC} from "../rpc/rpc";
import {getOffshoreBalance} from "./offshoreBalance";
import {getOffshoreTransfers} from "./offshoreTransferHistory";


export const refresh = () => {

    return (dispatch: any) => {

        refreshRPC()
            .then(() => dispatch(updateApp()));

    };


};



export const updateApp = () =>  {

    return (dispatch: any) => {

        dispatch(getNodeInfo());
        dispatch(getBalance());
        dispatch(getOffshoreBalance());
        dispatch(getTransfers());
        dispatch(getOffshoreTransfers());


    };


};
