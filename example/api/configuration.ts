import { RequestParameters } from "./request";

export interface TransportFunc {
  (request: RequestParameters): Promise<any>;
}

export default class Configuration {
  public servers: string[] = ["/api/v3"];
  public basePath?: string;
  public bearerToken?: string;
  public transport: TransportFunc;

  constructor(transport: TransportFunc) {
    this.transport = transport;
  }
}
