import {TRANSFER_SUCCEED} from "../actions/types";

const SUCCESS = "success";
const ERROR = "error";


const statusMap = new Map();


statusMap.add(TRANSFER_SUCCEED, {type:SUCCESS, msg:"your transfer was submitted"});



export default statusMap;
