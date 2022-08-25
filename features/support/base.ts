// TODO: add type definitions to the generator
const generatePath = "openapi-forge/src/generate";

const apiPath = "./features/api";

const generate = require(generatePath);

import { rmSync, existsSync } from "fs";

export class BaseModelStep {
  cleanup() {
    // cache-bust the api that was loaded via CommonJS
    Object.keys(require.cache).forEach(function (key) {
      delete require.cache[key];
    });
    if (existsSync(apiPath)) {
      rmSync(apiPath, { recursive: true });
    }
  }

  async generateApi(schema: string) {
    await generate(JSON.parse(schema), ".", {
      output: apiPath,
      testRun: true,
      skipValidation: true,
      logLevel: "quiet"
    });
  }
}
