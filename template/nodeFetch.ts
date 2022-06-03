import fetch from "node-fetch";

export async function transport(stuff: any) {
  const response = await fetch(stuff.url, stuff);
  return await response.json();
}