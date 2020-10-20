import {
  MINING_STATUS_RESPONSE,
  MINING_STATUS_RESPONSE_FAILED,
  REQUEST_MINING_START,
  REQUEST_MINING_STATUS,
  REQUEST_MINING_STOP,
} from "./types";

import * as daemon from "shared/core/havend";

export const startMining = () => {
  const threads_count = 1;
  const do_background_mining = true;
  const ignore_battery = false;
  const params = { threads_count, do_background_mining, ignore_battery };

  return (dispatch: any) => {
    dispatch({ type: REQUEST_MINING_START });

    daemon
      .startMining(params)
      .then((res: any) => setTimeout(() => dispatch(miningStatus()), 2000))
      .catch((err: any) => setTimeout(() => dispatch(miningStatus()), 2000));
  };
};

export const stopMining = () => {
  return (dispatch: any) => {
    dispatch({ type: REQUEST_MINING_STOP });

    daemon
      .stopMining()
      .then((res: any) => setTimeout(() => dispatch(miningStatus()), 2000))
      .catch((err: any) => setTimeout(() => dispatch(miningStatus()), 2000));
  };
};

export const miningStatus = () => {
  return (dispatch: any) => {
    dispatch({ type: REQUEST_MINING_STATUS });

    daemon
      .getMiningStatus()
      .then((res: any) => dispatch(getMiningStatusSucceed(res)))
      .catch((err: any) => dispatch(getMiningStatusFailed(err)));
  };
};

const getMiningStatusSucceed = (res: any) => {
  return { type: MINING_STATUS_RESPONSE, payload: res };
};

const getMiningStatusFailed = (err: any) => {
  return { type: MINING_STATUS_RESPONSE_FAILED, payload: err };
};
