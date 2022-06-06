# Swagger Petstore - OpenAPI 3.0 TypeScript Client Library

This is an auto-generated client library for the Swagger Petstore - OpenAPI 3.0 API, via the `openapi-forge-typescript` template.

## Usage example 


```
import Api from "./api";
import Configuration from "./configuration";
// import any model types you need
import { Order } from "./api/model";

const config = new Configuration();
// set the base path for your endpoint
config.basePath = "https://example.com";
// set any environment specific configuration here
const api = new Api(config);

api.findPetsByStatus(...).then((data) => {
   // log the result
   console.log(data);
});
```