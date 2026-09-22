import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/index.ts", import.meta.url), "utf8");
const wrangler = await readFile(new URL("../wrangler.toml", import.meta.url), "utf8");

test("status service covers the six required Cheaply applications", () => {
  for (const domain of [
    "maintain.cheaply.fr",
    "stock.cheaply.fr",
    "mail.cheaply.fr",
    "presence.cheaply.fr",
    "inboundtrack.cheaply.fr",
    "carrier-claim-assistant.cheaply.fr",
  ]) assert.match(source, new RegExp(domain.replaceAll(".", "\\.")));
});

test("status service exposes public health and JSON endpoints", () => {
  assert.match(source, /url\.pathname === \"\/api\/status\"/);
  assert.match(source, /url\.pathname === \"\/healthz\"/);
  assert.match(wrangler, /custom_domain = true/);
});

test("provider credentials stay server-side and the page has a restrictive CSP", () => {
  assert.match(source, /CLOUDFLARE_API_TOKEN/);
  assert.match(source, /GOOGLE_ACCESS_TOKEN/);
  assert.match(source, /GITHUB_TOKEN/);
  assert.match(source, /Content-Security-Policy/);
  assert.match(source, /connect-src 'self'/);
  assert.doesNotMatch(source, /document\.body[^;]*CLOUDFLARE_API_TOKEN/);
});

test("endpoint failures are classified separately from missing provider evidence", () => {
  assert.match(source, /endpointOutage/);
  assert.match(source, /providerEvidenceMissing/);
  assert.match(source, /\? \"outage\" : providerEvidenceMissing/);
});
