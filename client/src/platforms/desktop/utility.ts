
import * as bigInt from "big-integer";


// atomic units are big integers which are converted to readable js numbers
export const fromAtomicUnit = (amtomicUnit: bigInt.BigInteger, decimals:number = 4) =>  {

    const exp = 12;
    let tempNum:number = amtomicUnit.divide(Math.pow(10, exp - decimals)).toJSNumber();
    tempNum = tempNum / Math.pow(10, decimals);
    return tempNum;

};
