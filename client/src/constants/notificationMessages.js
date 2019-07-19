import {TRANSFER_SUCCEED} from "../actions/types";
import {uuidv4} from "../utility";

const SUCCESS = "success";
const ERROR = "error";


const statusMap = new Map();


statusMap.set(TRANSFER_SUCCEED, {type:SUCCESS, msg:"your transfer was submitted"});



export default statusMap;
