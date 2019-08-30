import {

    KEYS_GENERATED_FAILED, KEYS_GENERATED_SUCCEED,

} from "./types";




export const keysGeneratedSucceed = (keys) => ({type: KEYS_GENERATED_SUCCEED, payload: keys});
export const keysGeneratedFailed = (error) => ({type: KEYS_GENERATED_FAILED, payload: error});

