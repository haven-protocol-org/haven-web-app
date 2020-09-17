import {getPrimaryAddress as getPrimaryAddressCore} from "../core/wallet";
import { GET_ADDRESS_SUCCEED } from "./types";
import { AddressEntry } from "shared/reducers/address";

export const getPrimaryAddress = () => {

    return async (dispatch: any) => {



        const address = await getPrimaryAddressCore();

        console.log(address);

        const addressEntry: AddressEntry = {

            label:'Primary Address',
            address,address_index:0,used: true

        } as AddressEntry

        dispatch(addAddress(addressEntry));

        return;

    }



}


const addAddress = (payload: any) => {
    return {type: GET_ADDRESS_SUCCEED, payload};
}