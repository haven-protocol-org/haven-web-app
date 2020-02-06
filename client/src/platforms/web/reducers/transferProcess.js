import {
  SEND_FUNDS_FAILED,
  SEND_FUNDS_RESET,
  SEND_FUNDS_STARTED,
  SEND_FUNDS_STATUS_UPDATE,
  SEND_FUNDS_SUCCEED
} from "../actions/types";

const INITIAL_STATE = {

  update:{
    code: 0,
    msg: "",
  },
  stats:{},
  succeed:false,
  submitted:false,
  error:'',
  isProcessing: false
};

export const transferProcess = (state = INITIAL_STATE, action)  => {
  switch (action.type) {
    case SEND_FUNDS_RESET:
      return INITIAL_STATE;
    case SEND_FUNDS_STARTED:
      return {...INITIAL_STATE, isProcessing:true};
    case SEND_FUNDS_STATUS_UPDATE:
      return { ...state, update: action.payload};
    case SEND_FUNDS_SUCCEED:
      return {...state, stats:action.payload, submitted:true, isProcessing: false};
    case SEND_FUNDS_FAILED:
      return {...state, error:action.payload, submitted:false, isProcessing: false};
    default:
      return state;
  }
};

export const transferSucceed = (state) => {

  return state.transferProcess.submitted;

};
