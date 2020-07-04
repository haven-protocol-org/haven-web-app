import {NET} from "../../env";


export enum HAVEND_STANDARD_PORT {
    Mainnet=17750,Testnet=27750,Stagenet=37750
}

export const LOCAL_HOST: string = "";
export const LOCAL_HOST_URL: string = "http://localhost";

const LOCAL_DAEMON_MAINNET = `${LOCAL_HOST_URL}:${HAVEND_STANDARD_PORT.Mainnet}`;
const LOCAL_DAEMON_TESTNET = `${LOCAL_HOST_URL}:${HAVEND_STANDARD_PORT.Testnet}`;
const LOCAL_DAEMON_STAGENET = `${LOCAL_HOST_URL}:${HAVEND_STANDARD_PORT.Stagenet}`;


export const LOCAL_DAEMON_MAP = new Map<NET, string>(
    [
    [NET.Mainnet, LOCAL_DAEMON_MAINNET],
    [NET.Testnet, LOCAL_DAEMON_TESTNET],
    [NET.Stagenet, LOCAL_DAEMON_STAGENET]
        ]
);




