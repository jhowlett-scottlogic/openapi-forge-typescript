import fetch from "node-fetch";

import { RequestParameters } from "./request";

export async function transport(params: RequestParameters) {
  const response = await fetch(params.url, params);
  if (response.status !== 200) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return await response.json();
}
