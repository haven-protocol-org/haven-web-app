import {getOffshoreBalanceRPC, getOffshoreTransfersRPC, offshoreRPC, offshoreTransferRPC, onshoreRPC} from "../rpc/rpc";


export function getOffshoreTransfers() {

    getOffshoreTransfersRPC()
        .then( res => console.log(res) )
        .catch( err => console.log(err))


}


export function getOffshoreBalance() {

    getOffshoreBalanceRPC()
        .then( res => console.log(res) )
        .catch( err => console.log(err))


}



export function onshore(amount, destination) {

    onshoreRPC()
        .then( res => console.log(res) )
        .catch( err => console.log(err))


}


export function offshore(amount, destination) {

    offshoreRPC()
        .then( res => console.log(res) )
        .catch( err => console.log(err))


}


export function offshoreTransfer(amount, destination) {

    offshoreTransferRPC()
        .then( res => console.log(res) )
        .catch( err => console.log(err))


}

