
export let cnUtil = window.cnUtil;
export let mnemonic = window.mnemonic;
export let core = window.mymonero_core_js;

export let lWallet = null;
async function resolveWallet() {
    lWallet = await window.mymonero_core_js.monero_utils_promise;
}
resolveWallet();