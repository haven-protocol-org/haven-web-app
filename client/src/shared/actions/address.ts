import {getPrimaryAddress as getPrimaryAddressCore} from "../wallet-core/wallet-core";
import { GET_ADDRESS_SUCCEED } from "./types";

export const getPrimaryAddress = () => {

    return async (dispatch: any) => {


        const address = await getPrimaryAddressCore();
        console.log(address);

        dispatch(addAddress(address));


    }



}


const addAddress = (payload: any) => {
    return {type: GET_ADDRESS_SUCCEED, payload};
}