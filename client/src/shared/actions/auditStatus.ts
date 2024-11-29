import { walletProxy } from "shared/core/proxy"
import { GET_AUDIT_STATUS } from "./types";


export const getAuditStatus = () => {
  return async (dispatch: any) => {
    try {
    //@ts-ignore
    const needs_audit: boolean = await walletProxy.hasSpendableOldOutputs();

    dispatch(setAuditStatus(needs_audit));
    } catch(e) {
      console.log(e);
    }
  }
}

const setAuditStatus = (needsAudit: boolean) => ({type:GET_AUDIT_STATUS, payload:needsAudit})