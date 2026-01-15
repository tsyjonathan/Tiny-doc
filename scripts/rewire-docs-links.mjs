/**
 * Rewire links in exported Markdown so docs.tink.com links point to your GitHub Pages copy.
 *
 * - Reads manifest files to map: original URL -> local path
 * - Rewrites:
 *     https://docs.tink.com/<path>[?query][#hash]
 *   to:
 *     /Tiny-doc/<tink_docs_home|tink_docs_api>/<path>.../   (based on manifest mapping)
 *
 * Run from repo root (tink_docs_publish):
 *   node ./scripts/rewire-docs-links.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";

const PAGES_BASE = "/Tiny-doc";

const DOCS_DIR = path.resolve(process.cwd(), "docs");
const HOME_DIR = path.join(DOCS_DIR, "tink_docs_home");
const API_DIR = path.join(DOCS_DIR, "tink_docs_api");

function normalizeSourceUrl(urlString) {
  const u = new URL(urlString);
  // Normalize protocol/host, strip hash, normalize trailing slash
  u.protocol = "https:";
  u.host = "docs.tink.com";
  u.hash = "";
  if (u.pathname !== "/" && u.pathname.endsWith("/")) u.pathname = u.pathname.slice(0, -1);
  return u.toString();
}

function fileToHostedUrl(fileRel) {
  // fileRel is like: tink_docs_home/resources/account-check/index.md
  // Hosted URL should be: /Tiny-doc/tink_docs_home/resources/account-check/
  const rel = fileRel.replace(/\\/g, "/");
  const withoutIndex = rel.replace(/index\.md$/i, "");
  const trimmed = withoutIndex.replace(/\/+$/, "");
  return `${PAGES_BASE}/${trimmed}/`;
}

async function readManifestMap(rootDir) {
  const manifestPath = path.join(rootDir, "_manifest.jsonl");
  const raw = await fs.readFile(manifestPath, "utf8");
  const map = new Map();
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    const o = JSON.parse(line);
    if (!o.url || !o.file) continue;
    const src = normalizeSourceUrl(o.url);
    // Build file rel from docs/ root
    const fileRelFromDocs = path.relative(DOCS_DIR, path.join(rootDir, o.file)).replace(/\\/g, "/");
    const hosted = fileToHostedUrl(fileRelFromDocs);
    map.set(src, hosted);
  }
  return map;
}

async function walkIndexMd(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name.startsWith(".")) continue;
      out.push(...(await walkIndexMd(full)));
    } else if (e.isFile() && e.name === "index.md") {
      out.push(full);
    }
  }
  return out;
}

function rewireText(text, urlMap) {
  // Replace any docs.tink.com URL occurrences (in markdown links or plain text).
  // Keep any hash fragment from the original link.
  // Stop at common delimiters like ), ], " and ' so we don't accidentally include quotes (frontmatter source: "...")
  return text.replace(/https?:\/\/docs\.tink\.com[^\s)\]"']+/gi, (m) => {
    try {
      const u = new URL(m);
      const hash = u.hash || "";
      const normalized = normalizeSourceUrl(m);
      const mapped = urlMap.get(normalized);
      if (mapped) return mapped + (hash ? hash : "");

      // Heuristics for a few common docs.tink.com URLs that aren't in our exported set,
      // but *do* have a close equivalent in our GitHub Pages copy.
      const p = u.pathname || "/";

      // Generic mapping for enterprise API reference URLs:
      //   https://docs.tink.com/enterprise/api-general   -> /Tiny-doc/tink_docs_api/api-general/
      //   https://docs.tink.com/enterprise/api-payment   -> /Tiny-doc/tink_docs_api/api-payment/
      if (p.startsWith("/enterprise/")) {
        const rest = p.slice("/enterprise/".length);
        if (rest.startsWith("api-")) {
          return `${PAGES_BASE}/tink_docs_api/${rest.replace(/\/+$/, "")}/` + (hash ? hash : "");
        }
      }

      // Enterprise anchors often point to the same content as api-connectivity pages.
      if (p.startsWith("/enterprise/api-connectivity-v1")) {
        return `${PAGES_BASE}/tink_docs_api/api-connectivity-v1/` + (hash ? hash : "");
      }
      if (p.startsWith("/enterprise/api-connectivity-v2")) {
        return `${PAGES_BASE}/tink_docs_api/api-connectivity-v2/` + (hash ? hash : "");
      }

      // Connector refs: our export stores this under tink_docs_api/api/
      if (p.startsWith("/api/connector")) {
        return `${PAGES_BASE}/tink_docs_api/api/` + (hash ? hash : "");
      }

      // Events v1 may not be exported; prefer v2 if present.
      if (p.startsWith("/api-events-v1")) {
        return `${PAGES_BASE}/tink_docs_api/api-events-v2/` + (hash ? hash : "");
      }

      // Some pages contain malformed links like:
      //   /resources/<product>/resources/aggregation/permanent-users
      // Rewire those to the correct permanent-users page in our export.
      if (p.includes("/resources/aggregation/permanent-users")) {
        const canonical = normalizeSourceUrl("https://docs.tink.com/resources/aggregation/permanent-users");
        const canonicalMapped = urlMap.get(canonical);
        if (canonicalMapped) return canonicalMapped + (hash ? hash : "");
      }

      // Malformed open banking glossary links
      if (p.includes("open-banking-glossary")) {
        const canonical = normalizeSourceUrl("https://docs.tink.com/resources/open-banking/open-banking-glossary");
        const canonicalMapped = urlMap.get(canonical);
        if (canonicalMapped) return canonicalMapped + (hash ? hash : "");
      }

      return m; // leave unknown links as-is
    } catch {
      return m;
    }
  });
}

async function main() {
  const homeMap = await readManifestMap(HOME_DIR);
  const apiMap = await readManifestMap(API_DIR);
  const urlMap = new Map([...homeMap.entries(), ...apiMap.entries()]);

  const files = [
    ...(await walkIndexMd(HOME_DIR)),
    ...(await walkIndexMd(API_DIR)),
  ];

  let changedFiles = 0;
  let changedLinks = 0;

  for (const file of files) {
    const before = await fs.readFile(file, "utf8");
    const after = rewireText(before, urlMap);
    if (after !== before) {
      changedFiles += 1;
      // rough count
      changedLinks += (before.match(/https?:\/\/docs\.tink\.com/gi) || []).length -
        (after.match(/https?:\/\/docs\.tink\.com/gi) || []).length;
      await fs.writeFile(file, after, "utf8");
    }
  }

  console.log(`[rewire] scanned index.md files: ${files.length}`);
  console.log(`[rewire] changed files: ${changedFiles}`);
  console.log(`[rewire] docs.tink.com links removed (approx): ${changedLinks}`);
}

await main();

