// TODO: add type definitions to the generator
const generate = require("openapi-forge/src/generate");

import { after } from "cucumber-tsflow";
import { rm, existsSync } from "fs";
import { promisify } from "util";

export class BaseModelStep {
  async cleanup() {
    delete require.cache[require.resolve("../api/api.ts")];
    delete require.cache[require.resolve("../api/configuration.ts")];
    if (existsSync("./features/api")) {
      return promisify(rm)("./features/api", { recursive: true });
    }
  }

  async generateApi(schema: string) {
    await generate(JSON.parse(schema), ".", {
      output: "./features/api",
    });
  }
}