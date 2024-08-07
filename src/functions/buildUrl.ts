import { env } from "@/env/server.mjs";
import { headers } from "next/headers";

function getHostFromHeaders() {
  const currentHeaders = headers();

  let host =
    currentHeaders.get("x-forwarded-for") ?? currentHeaders.get("host");

  if (host != null) {
    if (host.includes(":")) host = `[${host}]`;
    const protocol = currentHeaders.get("X-Forwarded-Proto") ?? "https";
    return `${protocol}://${host}`;
  }
}

/**
 * Utility to build an URL using the host env or the current request as host
 * @param props Properties
 * @returns URL
 */
export function buildUrl(path: string) {
  const host = env.ROOT_URL ?? getHostFromHeaders();
  if (host === undefined) {
    throw new Error("Could not determine host");
  }

  const url = new URL(path, host);
  return url;
}
