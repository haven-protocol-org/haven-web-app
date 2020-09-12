
import { gethavenNodeState } from "../../platforms/desktop/actions/havenNode";
import { getXUSDBalance, getXHVBalance } from "./balance";

export const getDaemonsState = () => {
  return (dispatch: any) => {
    dispatch(gethavenNodeState());
  //  dispatch(getWalletRPCState());
  };
};


export const initReduxWallet = () => {

  
  return (dispatch: any) => {


    dispatch(getXUSDBalance());
    dispatch(getXHVBalance());




  }



}



