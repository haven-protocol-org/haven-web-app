import * as net from 'net'
import {BehaviorSubject} from "rxjs";


let devServerStartedObservable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

export const devServerStarted = devServerStartedObservable.asObservable();

const client = new net.Socket();
const tryConnection = ():void => {

     client.connect({port: 3000}, () => {devServerStartedObservable.next(true)});

};
tryConnection();


client.on('error', (error) => {
    devServerStartedObservable.next(false)
    setTimeout(tryConnection, 1000);
});
