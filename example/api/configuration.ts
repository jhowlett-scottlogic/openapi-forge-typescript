export interface TransportFunc {
  (request: any): Promise<any>;
}

export default class Configuration {
  public servers: string[] = ["/api/v3"];
  public basePath?: string;
  public transport: TransportFunc;

  constructor(transport: TransportFunc) {
    this.transport = transport;
  }
}
