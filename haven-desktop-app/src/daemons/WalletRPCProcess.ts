import {DaemonProcess} from "./DaemonProcess";
import {CommunicationChannel} from "../ipc/types";


const  WALLET_METHODS: ReadonlyArray<string> = [
    "stop_mining",
    "start_mining",
    "rescan_blockchain",
    "get_address",
    "refresh",
    "open_wallet",
    "close_wallet",
    "restore_deterministic_wallet",
    "get_balance",
    "get_offshore_balance",
    "store",
    "relay_tx",
    "get_height",
    "query_key",
    "transfer_split",
    "get_transfers",
    "create_wallet",
    "offshore_transfer",
    "refresh",
    "onshore",
    "offshore",
    "set_daemon"
];


export class WalletRPCProcess extends DaemonProcess {


    onDaemonError(error: Error): void {
    }

    onDaemonExit(code: number | null, signal: string | null): void {
    }

    onstderrData(chunk: any): void {
    }

    onstdoutData(chunk: any): void {
    }

    getConfig(): void {

    }

    getCommunicationChannel(): CommunicationChannel {
        return CommunicationChannel.WALLET_RPC;
    }

    requestHandler(): void {
    }





}
