import Configuration from "./configuration";

export interface Parameter {
  name: string;
  value: string;
  type: string;
}

export interface Headers {
  [index: string]: string;
}

export interface RequestParameters {
  url: string;
  method: string;
  body?: string;
  headers: Headers;
}

export async function request(
  config: Configuration,
  path: string,
  method: string,
  params: Parameter[]
): Promise<any> {
  // replace path parameters with values
  for (const pathParam of params.filter((p) => p.type === "path")) {
    path = path.replace(
      `{${pathParam.name}}`,
      encodeURIComponent(pathParam.value.toString())
    );
  }

  let url =
    (config.basePath ?? "") + config.servers[config.selectedServerIndex] + path;

  // build the query string
  const queryParams = params.filter((p) => p.type === "query");
  if (method === "get" && queryParams.length > 0) {
    url +=
      "?" +
      new URLSearchParams(
        queryParams.map((p) => [p.name, p.value]) as [string, string][]
      );
  }

  // add additional headers
  const additionalHeaders = params
    .filter((p) => p.type === "header")
    .reduce<Headers>((acc, param) => {
      acc[param.name] = param.value;
      return acc;
    }, {});

  // provide a bearer token if required
  if (config.bearerToken) {
    additionalHeaders["Authorization"] = `Bearer ${config.bearerToken}`;
  }

  let requestParams: RequestParameters = {
    url,
    method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      ...additionalHeaders,
    },
  };

  const bodyParam = params.find((p) => p.type === "body");
  if (bodyParam) {
    requestParams.body = bodyParam.value;
  }

  return await config.transport(requestParams);
}
