import { TRANSFER_SUCCEED } from "../actions/types";

export const SUCCESS = "success";
export const ERROR = "error";

const statusMap = new Map();

statusMap.set(TRANSFER_SUCCEED, {
  type: SUCCESS,
  msg: "your transfer was submitted"
});

export default statusMap;
