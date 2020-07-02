import axios from "axios";
import {LOCAL_HOST, LOCAL_HOST_URL} from "../daemons/config/config";

export type RPCRequestObject = {
  id: number;
  jsonrpc: string;
  method: string;
  params?: Object;
};

export class RPCHRequestHandler {
  private _url: string = LOCAL_HOST_URL;
  private _port: number;
  private _ssl: boolean;

  public set port(portValue: number) {
    this._port = portValue;
  }

  public set ssl(sslMode: boolean) {
    this._ssl = sslMode;
  }

  public setURL(url: string) {


    if (url === LOCAL_HOST) {
      this._url = LOCAL_HOST_URL;
    } else {
      this._url = url;
    }
  }

  public sendRequest(requestObject: RPCRequestObject): Promise<any> {
    if (requestObject.method === "mining_status") {
      return axios.post(
        `${this._url}:${this._port}/${requestObject.method}`,
        requestObject.params
      );
    }
    return axios.post(`${this._url}:${this._port}/json_rpc`, requestObject);
  }
}
