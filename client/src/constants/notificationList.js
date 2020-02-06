export const SUCCESS = "success";
export const ERROR = "error";

export const TRANSFER_SUCCEED_MESSAGE = "transfer_succeed_message";

export const INCOMING_TRANSFER_MESSAGE = "incoming_transfer_message";

export const notificationList = [
  {
    key: TRANSFER_SUCCEED_MESSAGE,
    code: 0,
    message: "Your transfer was successfully submitted!",
    type: SUCCESS
  },
  {
    key: INCOMING_TRANSFER_MESSAGE,
    code: 0,
    message: "Cha ching! You received a transfer...",
    type: SUCCESS
  },

  {
    key: "",
    code: -1,
    message: "Oops, that seed was incorrect",
    type: ERROR,
    description: "electrum style list failed --> comes with wrong seed"
  },
  {
    key: "",
    code: -2,
    message: "This is an invalid  address",
    type: ERROR,
    description: "address for tx was not valid"
  },
  {
    key: "",
    code: -3,
    message: "The daemon is busy, please be patient or try again later.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_DAEMON_IS_BUSY"
  },
  {
    key: "",
    code: -4,
    message: "Something went wrong with your transfer. Try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_GENERIC_TRANSFER_ERROR"
  },
  {
    key: "",
    code: -5,
    message: "Your Payment ID is wrong. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_WRONG_PAYMENT_ID"
  },
  {
    key: "",
    code: -6,
    message: "Your transfer had an error. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_TRANSFER_TYPE"
  },
  {
    key: "",
    code: -7,
    message: "This error code had an issue. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_DENIED"
  },
  {
    key: "",
    code: -8,
    message: "The Transaction ID is wrong. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_WRONG_TXID"
  },
  {
    key: "",
    code: -9,
    message: "There was an issue with your signature. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_WRONG_SIGNATURE"
  },
  {
    key: "",
    code: -10,
    message: "Your Key Image is incorrect. Please check and try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_WRONG_KEY_IMAGE"
  },
  {
    key: "",
    code: -11,
    message: "The URI was incorrect. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_WRONG_URI"
  },
  {
    key: "",
    code: -12,
    message: "The RPC has an issue. Please wait a moment and try agian.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_WRONG_INDEX"
  },
  {
    key: "",
    code: -13,
    message: "This wallet is not open. Please wait and try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_NOT_OPEN"
  },
  {
    key: "",
    code: -14,
    message: "The account index is incorrect. Log out and try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_ACCOUNT_INDEX_OUT_OF_BOUNDS"
  },
  {
    key: "",
    code: -15,
    message: "The address index is incorrect. Log out and try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_ADDRESS_INDEX_OUT_OF_BOUNDS"
  },
  {
    key: "",
    code: -16,
    message: "This transaction type is not possible.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_TX_NOT_POSSIBLE"
  },
  {
    key: "",
    code: -17,
    message: "Sorry, you don't have enough funds for this transaction.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_NOT_ENOUGH_MONEY"
  },
  {
    key: "",
    code: -18,
    message: "Sorry, this transaction is too large and can't be completed.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_TX_TOO_LARGE"
  },
  {
    key: "",
    code: -19,
    message:
      "There's an issue creating this transaction. Please wait and try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_NOT_ENOUGH_OUTS_TO_MIX"
  },
  {
    key: "",
    code: -20,
    message: "There's no destination for this transaction. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_ZERO_DESTINATION"
  },
  {
    key: "",
    code: -21,
    message: "Oops, this wallet already exists. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_WALLET_ALREADY_EXISTS"
  },
  {
    key: "",
    code: -22,
    message: "Oops, wrong password. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_INVALID_PASSWORD"
  },
  {
    key: "",
    code: -23,
    message: "Sorry, your wallets directory can't be found.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_NO_WALLET_DIR"
  },
  {
    key: "",
    code: -24,
    message: "There's no Transaction Key. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_NO_TXKEY"
  },
  {
    key: "",
    code: -25,
    message: "Your key is incorrect. Please check and try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_WRONG_KEY"
  },
  {
    key: "",
    code: -26,
    message: "Your wallets HEX is bad. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_BAD_HEX"
  },
  {
    key: "",
    code: -27,
    message: "There's some bad Transaction metadata. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_BAD_TX_METADATA"
  },
  {
    key: "",
    code: -28,
    message: "This multi-sig already exists. Please check and try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_ALREADY_MULTISIG"
  },
  {
    key: "",
    code: -29,
    message: "This is a watch only address.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_WATCH_ONLY"
  },
  {
    key: "",
    code: -30,
    message: "Your multi-sig information is bad. Please check and try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_BAD_MULTISIG_INFO"
  },
  {
    key: "",
    code: -31,
    message: "This is not a multi-sign wallet. Please check and try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_NOT_MULTISIG"
  },
  {
    key: "",
    code: -32,
    message: "Sorry, there's an issue with the LR",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_WRONG_LR"
  },
  {
    key: "",
    code: -33,
    message: "The transaction threshold was not reached. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_THRESHOLD_NOT_REACHED"
  },
  {
    key: "",
    code: -34,
    message: "",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_BAD_MULTISIG_TX_DATA"
  },
  {
    key: "",
    code: -35,
    message: "Your wallets multi-sig data is bad. Please check and try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_MULTISIG_SIGNATURE"
  },
  {
    key: "",
    code: -36,
    message:
      "There was an issue with the multi-sigs signature. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_MULTISIG_SUBMISSION"
  },
  {
    key: "",
    code: -37,
    message: "There's not enough signatures to complete submission.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_NOT_ENOUGH_UNLOCKED_MONEY"
  },
  {
    key: "",
    code: -38,
    message: "Please wait, as you have a locked balances.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_NO_DAEMON_CONNECTION"
  },
  {
    key: "",
    code: -39,
    message: "The daemon is not connected. Please wait and try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_BAD_UNSIGNED_TX_DATA"
  },
  {
    key: "",
    code: -40,
    message: "Your transaction wasn't signed. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_BAD_SIGNED_TX_DATA"
  },
  {
    key: "",
    code: -41,
    message:
      "There was an issue with your transaction signature. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_SIGNED_SUBMISSION"
  },
  {
    key: "",
    code: -42,
    message: "Your transaction was unsigned. Please try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_SIGN_UNSIGNED"
  },
  {
    key: "",
    code: -43,
    message: "There was a deterministic issue. Please wait and try again.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_NON_DETERMINISTIC"
  },
  {
    key: "",
    code: -44,
    message: "The wallets log has an issue. Please wait and try again later.",
    type: ERROR,
    description: "WALLET_RPC_ERROR_CODE_INVALID_LOG_LEVEL"
  }
];
