import {DaemonProcess} from "./DaemonProcess";
import {CommunicationChannel} from "../ipc/types";
import {config, IDaemonConfig} from "../daemons/config";


const  DAEMON_METHODS: ReadonlyArray<string>= [
    "mining_status",
    "get_info",
    "get_last_block_header",
    "get_block_count",
    "get_block_header_by_height",
];


export class HavendProcess extends DaemonProcess {



    onDaemonError(error: Error): void {
    }

    onDaemonExit(code: number | null, signal: string | null): void {
    }

    onstderrData(chunk: any): void {
    }

    onstdoutData(chunk: any): void {
    }

    getConfig(): IDaemonConfig {

        return config().wallet;
    }

    getCommunicationChannel(): CommunicationChannel {
        return CommunicationChannel.HAVEND;
    }

    requestHandler(): void {
    }








}
