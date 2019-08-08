var config = {
    //apiUrl: "http://0.0.0.0:1984/",
    apiUrl: "http://127.0.0.1:1984/",
    mainnetExplorerUrl: "https://xmrchain.com/",
    testnetExplorerUrl: "https://testnet.xmrchain.com/",
    stagenetExplorerUrl: "http://139.162.60.17:8082/",
    nettype: 1, /* 0 - MAINNET, 1 - TESTNET, 2 - STAGENET */
    coinUnitPlaces: 12,
    txMinConfirms: 10,         // corresponds to CRYPTONOTE_DEFAULT_TX_SPENDABLE_AGE in Monero
    txCoinbaseMinConfirms: 60, // corresponds to CRYPTONOTE_MINED_MONEY_UNLOCK_WINDOW in Monero
    coinSymbol: 'XHV',
    openAliasPrefix: "xhv",
    coinName: 'Haven',
    coinUriPrefix: 'haven:',
    addressPrefix: 0x5af4,
    integratedAddressPrefix: 0xcd774,
    subAddressPrefix: 0x12d974,
    addressPrefixTestnet: 0x59f4,
    integratedAddressPrefixTestnet: 0x499f4,
    subAddressPrefixTestnet: 0x919f4,
    addressPrefixStagenet: 24,
    integratedAddressPrefixStagenet: 25,
    subAddressPrefixStagenet: 36,
    feePerKB: new JSBigInt('2000000000'),//20^10 - not used anymore, as fee is dynamic.
    dustThreshold: new JSBigInt('1000000000'),//10^10 used for choosing outputs/change - we decompose all the way down if the receiver wants now regardless of threshold
    txChargeRatio: 0.5,
    defaultMixin: 10, // minimum mixin for hardfork v8 is 10 (ring size 11)
    txChargeAddress: '',
    idleTimeout: 30,
    idleWarningDuration: 20,
    maxBlockNumber: 500000000,
    avgBlockTime: 120,
    debugMode: false
};
