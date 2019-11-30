import {offshoreTransferRPC} from "../ipc/rpc/rpc";


export function offshoreTransfer(amount: number) {

    offshoreTransferRPC({amount})
        .then( (res: any) => console.log(res) )
        .catch( (err: any) => console.log(err))


}
