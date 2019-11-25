import {offshoreTransferRPC} from "../rpc/rpc";


export function offshoreTransfer(amount: number) {

    offshoreTransferRPC()
        .then( (res: any) => console.log(res) )
        .catch( (err: any) => console.log(err))


}
