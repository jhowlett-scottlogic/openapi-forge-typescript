import fetch from "node-fetch";

import { RequestParameters } from "./request";

export async function transport(params: RequestParameters) {
  const response = await fetch(params.url, params);
  return await response.json();
}
