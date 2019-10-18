/*
 a set of functions to identify own spents and calculatingt the balance according to that
 */




export const parseTxList = (rawData, address, privateViewKey, publicSpendKey, privateSpendKey, lWallet) => {

    const keyImageCache = monero_keyImage_cache_utils.Lazy_KeyImageCacheForWalletWith(
        address,
    );

    const transactions = data.transactions || [];


    transactions.forEach( tx => {

        if ((tx.spent_outputs || []).length > 0) {

           //  tx.spent_outputs.forEach()

        }

    })
};
