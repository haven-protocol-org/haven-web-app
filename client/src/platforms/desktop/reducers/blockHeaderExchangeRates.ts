

export interface IBlockHeaderRate  {

    signature: string,
    unused1: bigint,
    unused2: bigint,
    unused3: bigint,
    xAG: bigint,
    xAU: bigint,
    xAUD: bigint,
    xBTC: bigint,
    xCAD: bigint,
    xCHF: bigint,
    xCNY: bigint,
    xEUR: bigint,
    xGBP: bigint,
    xJPY: bigint,
    xNOK: bigint,
    xNZD: bigint,
    xUSD: bigint
};


const INITIAL_STATE: Record<number, IBlockHeaderRate> = {};


export const blockHeaderExchangeRate = (): Record<number,IBlockHeaderRate> => {

    return INITIAL_STATE;


};
