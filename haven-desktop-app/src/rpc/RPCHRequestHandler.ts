import axios from "axios";
import {LOCAL_HOST_URL} from "../daemons/config/enum";
import {LOCAL_HOST} from "../daemons/config/enum";

export type RPCRequestObject = {
  id: number;
  jsonrpc: string;
  method: string;
  params?: any;
};

export class RPCHRequestHandler {
  private _host: string = LOCAL_HOST_URL;
  private _port: number;
  private _ssl: boolean;
  private _fullUrl: string;

  public set port(portValue: number) {
    this._port = portValue;
    this.setFullUrl(this._host +':'+ this._port);
  }

  public set ssl(sslMode: boolean) {
    this._ssl = sslMode;
  }

  public setHost(host: string) {


    if (host === LOCAL_HOST) {
      this._host = LOCAL_HOST_URL;
    } else {
      this._host = host;
    }
    this.setFullUrl(this._host +':'+ this._port);
  }

  public setFullUrl(url: string) {
    this._fullUrl = url;
  }

  public sendRequest(requestObject: RPCRequestObject): Promise<any> {
    if (requestObject.method === "mining_status") {
      return axios.post(
        `${this._host}:${this._port}/${requestObject.method}`,
        requestObject.params
      );
    }
    return axios.post(`${this._fullUrl}/json_rpc`, requestObject);
  }
}
