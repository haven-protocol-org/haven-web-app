import axios from "axios";



export type RPCRequestObject  = {
    id: number,
    jsonrpc: string,
    method: string,
    params?:Object,
};

export class RPCHRequestHandler {
    private baseUrl: string = "http://localhost";
    private _port:number;
    private _ssl:boolean;

    public set port(portValue:number) {
        this._port = portValue;
    }

    public set ssl (sslMode:boolean) {
        this._ssl = sslMode;
    }

    public sendRequest(requestObject:RPCRequestObject):Promise<any> {

        if (requestObject.method === 'mining_status') {
            return axios.post(`${this.baseUrl}:${this._port}/${requestObject.method}` ,requestObject.params);
        }
        return axios.post(`${this.baseUrl}:${this._port}/json_rpc`, requestObject);
    }
}
