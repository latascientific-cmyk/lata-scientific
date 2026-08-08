/* =========================================================
   LATA SCIENTIFIC — write the browser Supabase config from the environment
   Run:  node scripts/gen-supabase-config.mjs

   Reads SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY from the real environment
   first, falling back to a local `.env` file, and writes
   assets/js/supabase-config.js.

   Why a generator rather than reading env vars in the browser: this site is
   static HTML served directly from the repository. There is no bundler and no
   server, so nothing can substitute a variable at request time — the values
   have to exist in a file the browser can fetch. The generator keeps `.env` as
   the single source of truth and stops the values being hand-edited into code
   in several places.

   The generated file is committed on purpose. That is safe: the publishable
   key is a public project identifier, and every permission it has is decided
   by Row Level Security. The generator refuses to write a service_role key.
   ========================================================= */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* Minimal .env reader — no dependency for four lines of parsing. */
const fromEnvFile = () => {
  const file = resolve(ROOT, ".env");
  if (!existsSync(file)) return {};
  const out = {};
  for (const raw of readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 1) continue;
    out[line.slice(0, eq).trim()] = line.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
  }
  return out;
};

const fileEnv = fromEnvFile();
const url = process.env.SUPABASE_URL || fileEnv.SUPABASE_URL;
const key = process.env.SUPABASE_PUBLISHABLE_KEY || fileEnv.SUPABASE_PUBLISHABLE_KEY;

const die = (msg) => { console.error(`\n  ${msg}\n`); process.exit(1); };

if (!url || !key) {
  die("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY are not set.\n" +
      "  Copy .env.example to .env, fill it in, and run this again.");
}
if (!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url)) {
  die(`SUPABASE_URL does not look like a Supabase project URL: ${url}`);
}

/* A service_role key is a JWT whose payload carries "role":"service_role".
   It must never reach a browser file, so refuse outright rather than warn. */
const looksLikeServiceRole = (k) => {
  if (/service[_-]?role/i.test(k)) return true;
  const parts = k.split(".");
  if (parts.length !== 3) return false;
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    return payload.role === "service_role";
  } catch { return false; }
};
if (looksLikeServiceRole(key)) {
  die("That is a service_role key. It bypasses Row Level Security and must\n" +
      "  never be shipped to a browser. Use the publishable (anon) key.");
}

const out = `/* =========================================================
   LATA SCIENTIFIC — Supabase connection details
   =========================================================
   GENERATED FILE — do not edit by hand.
   Written by scripts/gen-supabase-config.mjs from .env
   (see .env.example). Change .env, then re-run the script.

   The key below is the project's PUBLISHABLE key. It is meant to ship in the
   browser: it identifies the project and carries no privileges of its own.
   Row Level Security decides everything it can do —

     - submit a review, which is always stored as 'pending'
     - read reviews whose status is 'published', WITHOUT their email address

   The secret service_role key is never used by this website.
   ========================================================= */
window.LATA_SUPABASE = {
  url: ${JSON.stringify(url.replace(/\/$/, ""))},
  key: ${JSON.stringify(key)},
};
`;

writeFileSync(resolve(ROOT, "assets/js/supabase-config.js"), out, "utf8");
console.log(`Wrote assets/js/supabase-config.js  →  ${url.replace(/\/$/, "")}`);
