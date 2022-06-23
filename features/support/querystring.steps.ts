// TODO: add type definitions to the generator
const generate = require("openapi-forge/src/generate");

import { binding, after, then, when, given } from "cucumber-tsflow";
import { assert } from "chai";
import { rm, existsSync } from "fs";
import { promisify } from "util";

import { RequestParameters } from "../../template/request";

import { BaseModelStep } from "./base";

@binding()
export class ModelSteps extends BaseModelStep {
  private requestParams: RequestParameters;

  createApi(): any {
    const apiModule = require("../api/api.ts");
    const configurationModule = require("../api/configuration.ts");

    const mockTransport = async (params: RequestParameters) => {
      this.requestParams = params;
    };

    const config = new configurationModule.default(mockTransport);
    return new apiModule.default(config);
  }

  @after()
  public async after() {
    return this.cleanup();
  }

  @given("An API with the following specification")
  public async generate(schema: string) {
    await this.generateApi(schema);
  }

  @when(/I call the method ([a-zA-Z]*) without params/)
  public async callMethod(methodName: string) {
    const api = this.createApi();
    await api[methodName]();
  }

  @when(/I call the method ([a-zA-Z]*) with parameters "([\w0-9, ]*)"/)
  public async callMethodWithParameters(methodName: string, params: string) {
    const api = this.createApi();
    const values = params.split(",");
    await api[methodName].apply(api, values);
  }

  @then(/The requested URL should be (.*)/)
  public checkRequest(url: string) {
    assert.equal(this.requestParams.url, url);
  }
}
