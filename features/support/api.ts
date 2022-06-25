import { binding, after, then, when, given } from "cucumber-tsflow";
import { assert } from "chai";

import { RequestParameters } from "../../template/request";

import { BaseModelStep } from "./base";

@binding()
export class ModelSteps extends BaseModelStep {
  private requestParams: RequestParameters;
  private apiResponse: any;
  private serverResponseObject: any;

  createApi(): any {
    const apiModule = require("../api/api.ts");
    const configurationModule = require("../api/configuration.ts");

    const mockTransport = async (params: RequestParameters) => {
      this.requestParams = params;
      return this.serverResponseObject;
    };

    const config = new configurationModule.default(mockTransport);
    return new apiModule.default(config);
  }

  @after()
  public async after() {
    this.serverResponseObject = undefined;
    this.apiResponse = undefined;
    return this.cleanup();
  }

  @given("an API with the following specification")
  public async generate(schema: string) {
    await this.generateApi(schema);
  }

  @when(/calling the method ([a-zA-Z]*) without params/)
  public async callMethod(methodName: string) {
    const api = this.createApi();
    await api[methodName]();
  }

  @when(/calling the method ([a-zA-Z]*) with parameters "([\w0-9, ]*)"/)
  public async callMethodWithParameters(methodName: string, params: string) {
    const api = this.createApi();
    const values = params.split(",");
    await api[methodName].apply(api, values);
  }

  @then(/the requested URL should be (.*)/)
  public checkRequest(url: string) {
    assert.equal(this.requestParams.url, url);
  }

  @when(/calling the method ([a-zA-Z]*) and the server responds with/)
  public async callWithResponse(methodName: string, response: string) {
    const api = this.createApi();
    this.serverResponseObject = JSON.parse(response);
    this.apiResponse = await api[methodName]();
  }

  @then(/the response should be of type (.*)/)
  public checkResponseType(type: string) {
    assert.equal(this.apiResponse.constructor.name, type);
  }

  @then(/the response should be equal to "(.*)"/)
  public checkResponseValue(value: string) {
    assert.equal(this.apiResponse, value);
  }

  @then(
    /the response should have a property ([a-zA-Z]*) with value ([0-9a-zA-Z]*)/
  )
  public checkResponseProperty(propName: string, propValue: string) {
    assert.equal(this.apiResponse[propName].toString(), propValue);
  }

  @then(/the response should be an array/)
  public checkArrayResponse() {
    assert.isArray(this.apiResponse);
  }

  @when(/extracting the object at index ([0-9]*)/)
  public extractAtIndex(index: string) {
    this.apiResponse = this.apiResponse[parseInt(index)];
  }
}
