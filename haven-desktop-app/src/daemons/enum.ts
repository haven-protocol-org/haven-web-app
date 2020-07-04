

export const  WALLET_METHODS: ReadonlyArray<string> = [
    "stop_mining",
    "start_mining",
    "rescan_blockchain",
    "get_address",
    "refresh",
    "open_wallet",
    "close_wallet",
    "restore_deterministic_wallet",
    "get_balance",
    "get_offshore_balance",
    "store",
    "relay_tx",
    "get_height",
    "query_key",
    "transfer_split",
    "get_transfers",
    "create_wallet",
    "offshore_transfer",
    "refresh",
    "onshore",
    "offshore",
    "set_daemon"
];


export const  DAEMON_METHODS: ReadonlyArray<string>= [
    "mining_status",
    "get_info",
    "get_last_block_header",
    "get_block_count",
    "get_block_header_by_height",
];

