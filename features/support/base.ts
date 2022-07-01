// TODO: add type definitions to the generator
const generate = require("openapi-forge/src/generate");

import { rmSync, existsSync } from "fs";

export class BaseModelStep {
  cleanup() {
    // cache-bust the api that was loaded via CommonJS
    Object.keys(require.cache).forEach(function (key) {
      delete require.cache[key];
    });
    if (existsSync("./features/api")) {
      rmSync("./features/api", { recursive: true });
    }
  }

  async generateApi(schema: string) {
    await generate(JSON.parse(schema), ".", {
      output: "./features/api",
      testRun: true,
      skipValidation: true
    });
  }
}
