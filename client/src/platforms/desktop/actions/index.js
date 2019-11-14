import {ADD_PUB_ADDRESS} from "./types";

export * from "./balance";
export * from "./transfer";
export * from "./transferHistory";
export * from "./chain";
export * from "./walletSession";
export * from "./walletRestoring";
export * from "./walletCreation";



export const addPubAddress = (address) => ({type: ADD_PUB_ADDRESS, payload:address});

