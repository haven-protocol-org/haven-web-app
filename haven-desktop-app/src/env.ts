


export enum NET {
    Mainnet='mainnet',
    Testnet='testnet'
}



export const NET_TYPE = process.env.NET_TYPE;

export const isMainnet = NET_TYPE === NET.Mainnet;
