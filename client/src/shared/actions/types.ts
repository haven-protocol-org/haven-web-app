export const THEME = "theme";

/*
GET BALANCES
 */
export const GET_BALANCES_FETCHING = "get_balances_fetching";
export const GET_BALANCES_SUCCEED = "get_balances_succeed";
export const GET_BALANCES_FAILED = "get_balances_failed";

export const QUERY_MNEMONIC_FOR_WALLET_GENERATION_SUCCEED =
  "query_mnemonic_for_wallet_generation_succeed";
export const VALIDATE_MNEMONIC_SUCCEED = "validate_mnemonic_succeed";

export const VALIDATE_MNEMONIC_FAILED = "validate_mnemonic_failed";

export const CLOSE_WALLET = "close_wallet";

/*
TRANSFER
 */

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

export const ADD_NOTIFICATION = "add_notifications";
export const REMOVE_NOTIFICATION = "remove_notifications";


// Modal Service

export const SHOW_MODAL = "show_modal";
export const HIDE_MODAL = "hide_modal";

export const GET_ADDRESS_SUCCEED = "get_address_succeed";
export const SET_SELECTED_ADDRESS = "set_selected_address"

export const UPDATE_HAVEN_FEATURES = "update_haven_features";

// DAEMON CONNECTION
export const DAEMON_CONECTION_CREATED = "daemon_conection_created";

// WALLET CONNECTION TO DAEMON
export const SET_WALLET_CONNECTION_STATE = "set_wallet_connection_state";
export const SET_APP_TO_DAEMON_CONNECTION_STATE = "set_app_to_daemon_connection_state"

export const START_WALLET_STORAGE = "start_wallet_storage";
export const WALLET_STORAGE_SUCCEED = "wallet_storage_succeed";

export const RESTORE_WALLET_BY_SEED_FETCHING =
  "restore_wallet_by_seed_fetching";
export const RESTORE_WALLET_BY_SEED_SUCCEED = "restore_wallet_by_seed_succeed";
export const RESTORE_WALLET_BY_SEED_FAILED = "restore_wallet_by_seed_failed";

//
export const CREATE_WALLET_FETCHING = "create_wallet_fetching";
export const CREATE_WALLET_SUCCEED = "create_wallet_succeed";
export const CREATE_WALLET_FAILED = "create_wallet_failed";

//

export const OPEN_WALLET_FETCHING = "open_wallet_fetching";
export const OPEN_WALLET_SUCCEED = "open_wallet_succeed";
export const OPEN_WALLET_FAILED = "open_wallet_failed";

export const START_WALLET_SESSION = "start_wallet_session";
export const STOP_WALLET_SESSION = "stop_wallet_session";
export const CLOSE_WALLET_SESSION = "close_wallet_session";

/*
TRANSFER
 */

export const TRANSFER_FETCHING = "transfer_fetching";
export const TRANSFER_FAILED = "transfer_failed";
export const TRANSFER_SUCCEED = "transfer_succeed";
export const TRANSFER_RESET = "transfer_reset";

export const TRANSFER_CREATION_FETCHING = "transfer_creation_fetching";
export const TRANSFER_CREATION_FAILED = "transfer_creation_failed";
export const TRANSFER_CREATION_SUCCEED = "transfer_creation_succeed";

export const EXCHANGE_FETCHING = "exchange_fetching";
export const EXCHANGE_FAILED = "exchange_failed";
export const EXCHANGE_SUCCEED = "exchange_succeed";

export const EXCHANGE_CREATION_FETCHING = "exchange_creation_fetching";
export const EXCHANGE_CREATION_FAILED = "exchange_creation_failed";
export const EXCHANGE_CREATION_SUCCEED = "exchange_creation_succeed";

export const GET_BLOCK_INFO_FETCHING = "get_block_info_fetching";
export const GET_BLOCK_INFO_SUCEED = "get_block_info_suceed";
export const GET_BLOCK_INFO_FAILED = "get_block_info_failed";

export const GET_WALLET_HEIGHT_FETCHING = "get_wallet_height_fetching";
export const GET_WALLET_HEIGHT_SUCCEED = "get_wallet_height_succeed";
export const GET_WALLET_HEIGHT_FAILED = "get_wallet_height_failed";

export const START_RESCAN = "start_rescan";
export const RESCAN_SUCCEED = "rescan_succeed";
export const RESCAN_FAILED = "rescan_failed";

//Exchange process

export const SELECT_FROM_TICKER = "select_from_ticker";
export const SELECT_TO_TICKER = "select_to_ticker";
export const EXCHANGE_RESET = "exchange_reset";

export const GET_OFFSHORE_BALANCE_FETCHING = "get_offshore_balance_fetching";
export const GET_OFFSHORE_BALANCE_FAILED = "get_offshore_balance_failed";
export const GET_OFFSHORE_BALANCE_SUCCEED = "get_offshore_balance_succeed";

export const GET_OFFSHORE_TRANSFERS_FETCHING =
  "get_offshore_transfers_fetching";
export const GET_OFFSHORE_TRANSFERS_FAILED = "get_offshore_transfers_failed";
export const GET_OFFSHORE_TRANSFERS_SUCCEED = "get_offshore_transfers_succeed";

// Block header exchange rate data
export const GET_BLOCK_HEADER_EXCHANGE_RATE_FETCH =
  "get_block_header_exchange_rate_fetch";
export const GET_BLOCK_HEADER_EXCHANGE_RATE_SUCCEED =
  "get_block_header_exchange_rate_succeed";
export const GET_BLOCK_HEADER_EXCHANGE_RATE_FAILED =
  "get_block_header_exchange_rate_failed";
