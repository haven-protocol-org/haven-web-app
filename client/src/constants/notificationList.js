

import {TRANSFER_SUCCEED} from "../actions/types";


export const SUCCESS = "success";
export const ERROR = "error";

export const INCOMING_TRANSFER_MESSAGE = "incoming_transfer_message";

export const notificationList =  [

    {
        "key": TRANSFER_SUCCEED,
        "code": 0,
        "message": "your transfer was submitted",
        "type": SUCCESS
    },
    {
        "key": INCOMING_TRANSFER_MESSAGE,
        "code": 0,
        "message": "a transfer to you is underway",
        "type": SUCCESS
    },

    {
        "key": "",
        "code": -1,
        "message": "wrong",
        "type": ERROR
    }


];
