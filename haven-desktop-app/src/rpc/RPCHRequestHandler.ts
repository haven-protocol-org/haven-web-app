import axios from "axios";
import { LOCAL_HOST_URL } from "../daemons/config/enum";
import { LOCAL_HOST } from "../daemons/config/enum";
import { logInDevMode } from "../dev";

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
    this.setFullUrl(this._host + ":" + this._port);
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
    this.setFullUrl(this._host + ":" + this._port);
  }

  public setFullUrl(url: string) {
    this._fullUrl = url;
  }

  public sendRequest(requestObject: RPCRequestObject): Promise<any> {


    const timeLessMethods = ["close_wallet", "restore_deterministic_wallet", "create_wallet", "onshore", "offshore", "relay_tx", "transfer_split"];
    let timeout = timeLessMethods.some((method ) => method === requestObject.method)? 0 : 4000;

    logInDevMode("send request to : " + this._fullUrl);

    if (requestObject.method === "mining_status") {
      return axios.post(
        `${this._host}:${this._port}/${requestObject.method}`,
        requestObject.params, {timeout}
      );
    }
    return axios.post(`${this._fullUrl}/json_rpc`, requestObject, {timeout});
  }
}
