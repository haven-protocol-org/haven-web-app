import {

    KEYS_GENERATED_FAILED, KEYS_GENERATED_SUCCEED,

} from "./types";


import {cnUtil, mnemonic} from "../declarations/open_monero.service";
import {addPubAddress} from "./index";


export const derivatePrivKeysBySeed = (seed) => {


    return (dispatch) => {

        try {

            const privkey = mnemonic.mn_decode(seed);
            const keys = cnUtil.create_address(privkey);

            const pubAddress = keys.public_addr;
            delete keys.public_addr;
            keys.mnemonic = seed;
            dispatch(addPubAddress(pubAddress));
            dispatch(keysGeneratedSucceed(keys));
        }
        catch(e){
            dispatch(keysGeneratedFailed(e));
        }
    };
};

const keysGeneratedSucceed = (keys) => ({type: KEYS_GENERATED_SUCCEED, payload: keys});
const keysGeneratedFailed = (error) => ({type: KEYS_GENERATED_FAILED, payload: error});

