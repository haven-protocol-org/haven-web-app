

import {TRANSFER_SUCCEED} from "../actions/types";


export const SUCCESS = "success";
export const ERROR = "error";

export const INCOMING_TRANSFER_MESSAGE = "incoming_transfer_message";

export const list =  [

    {
        "key": TRANSFER_SUCCEED,
        "code": 0,
        "msg": "your transfer was submitted",
        "type": SUCCESS
    },
    {
        "key": INCOMING_TRANSFER_MESSAGE,
        "code": 0,
        "msg": "a transfer to you is underway",
        "type": SUCCESS
    }


];
