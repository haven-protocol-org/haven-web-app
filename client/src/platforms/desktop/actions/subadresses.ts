import {getAddressRPC} from "platforms/desktop/ipc/rpc/rpc";
import {addPubAddress} from "shared/actions";


export const getAddress = () => {
    return (dispatch: any) => {
        getAddressRPC().then(res => dispatch(addPubAddress(res.address)));
    };
};




export const createAdress = (label: string) => {

    


};



export const labelAddress = (label: string, addresIndex: number) => {






};


