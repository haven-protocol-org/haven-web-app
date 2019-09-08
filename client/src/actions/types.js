export const THEME = "theme";
export const AUTH = "auth";
export const USER = "user";

// WALLET RELATED

/*
 RESTORE WALLET
 */
export const RESTORE_WALLET_BY_SEED_FETCHING = "restore_wallet_by_seed_fetching";
export const RESTORE_WALLET_BY_SEED_SUCCEED = "restore_wallet_by_seed_succeed";
export const RESTORE_WALLET_BY_SEED_FAILED = "restore_wallet_by_seed_failed";

export const ADD_PUB_ADDRESS = "add_pub_address";


/*
GET BALANCES
 */
export const GET_BALANCES_FETCHING = "get_balances_fetching";
export const GET_BALANCES_SUCCEED = "get_balances_succeed";
export const GET_BALANCES_FAILED = "get_balances_failed";


export const VALIDATE_MNEMONIC_SUCCEED = "validate_mnemonic_succeed";
export const VALIDATE_MNEMONIC_FAILED = "validate_mnemonic_failed";

export const CLOSE_WALLET = "close_wallet";


// GENERATE KEYS
export const KEYS_GENERATED_SUCCEED = "keys_generated_succeed";
export const KEYS_GENERATED_FAILED = "keys_generated_failed";


/*
TRANSFER
 */

export const TRANSFER_FETCHING = "transfer_fetching";
export const TRANSFER_FAILED = "transfer_failed";
export const TRANSFER_SUCCEED = "transfer_succeed";


export const GET_TRANSFERS_FETCHING = "get_transfers_fetching";
export const GET_TRANSFERS_SUCCEED = "get_transfers_succeed";
export const GET_TRANSFERS_FAILED = "get_transfers_failed";

//PRICE DATA

export const GET_PRICE_HISTORY_FETCHING = "get_price_data_fetching";
export const GET_PRICE_HISTORY_SUCCEED = "get_price_data_succeed";
export const GET_PRICE_HISTORY_FAILED = "get_price_data_failed";

//SIMPLE PRICE
export const GET_SIMPLE_PRICE_FETCHING = "get_simple_price_fetching";
export const GET_SIMPLE_PRICE_SUCCEED = "get_simple_price_succeed";
export const GET_SIMPLE_PRICE_FAILED = "get_simple_price_failed";


export const GET_BLOCK_HEIGHT_FETCHING = "get_block_height_fetching";
export const GET_BLOCK_HEIGHT_SUCEED = "get_block_height_succeed";
export const GET_BLOCK_HEIGHT_FAILED = "get_block_height_failed";


export const ADD_NOTIFICATION = "add_notifications";
export const REMOVE_NOTIFICATION = "remove_notifications";


// FOREX DATA

export const GET_FOREX_FETCHING = "get_forex_fetching";
export const GET_FOREX_SUCCEED = "get_forex_succeed";
export const GET_FOREX_FAILED = "get_forex_failed";


// ACCOUNT

export const ACCOUNT_CREATION_REQUESTED = "account_creation_requested";
export const ACCOUNT_CREATED = "account_created";
export const ACCOUNT_CREATION_FAILED = "account_creation_failed";

// SEND FUNDS

export const SEND_FUNDS_STARTED = "send_funds_started";
export const SEND_FUNDS_SUCCEED = "send_funds_succeed";
export const SEND_FUNDS_FAILED = "send_funds_failed";
export const SEND_FUNDS_STATUS_UPDATE = "send_funds_status_update";