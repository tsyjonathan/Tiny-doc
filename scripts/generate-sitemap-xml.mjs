/**
 * Generate docs/sitemap.xml listing every hosted page URL.
 *
 * Run from repo root (tink_docs_publish):
 *   node ./scripts/generate-sitemap-xml.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";

const SITE_BASE = "https://tsyjonathan.github.io/Tiny-doc";
const DOCS_ROOT = path.resolve(process.cwd(), "docs");
const OUT_FILE = path.join(DOCS_ROOT, "sitemap.xml");

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

function toUrl(filePath) {
  // docs/tink_docs_home/.../index.md -> https://.../Tiny-doc/tink_docs_home/.../
  const rel = path.relative(DOCS_ROOT, filePath).split(path.sep).join("/");
  return `${SITE_BASE}/${rel.replace(/index\\.md$/i, "")}`;
}

function xmlEscape(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function main() {
  const roots = ["tink_docs_home", "tink_docs_api"].map((d) => path.join(DOCS_ROOT, d));
  const pages = [];
  for (const r of roots) pages.push(...(await walkIndexMd(r)));
  pages.sort((a, b) => a.localeCompare(b));

  const urls = pages.map(toUrl);

  const now = new Date().toISOString();
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  for (const u of urls) {
    lines.push("  <url>");
    lines.push(`    <loc>${xmlEscape(u)}</loc>`);
    lines.push(`    <lastmod>${xmlEscape(now)}</lastmod>`);
    lines.push("  </url>");
  }
  lines.push("</urlset>");

  await fs.writeFile(OUT_FILE, lines.join("\n") + "\n", "utf8");
  console.log(`[sitemap] wrote ${OUT_FILE} (${urls.length} urls)`);
}

await main();

