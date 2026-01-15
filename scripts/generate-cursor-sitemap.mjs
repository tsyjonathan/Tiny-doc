/**
 * Generate a Cursor-friendly sitemap for GitHub Pages.
 *
 * Problem: a single page with ~500 links can cause some crawlers to stop after 1 page.
 * Solution: create a small "hub" page linking to chunk pages, each chunk page linking to ~N docs pages.
 *
 * Outputs (under docs/all-pages/):
 *  - cursor-sitemap.html         (small hub page)
 *  - cursor-part-001.html ...    (chunk pages)
 *
 * Run from repo root (tink_docs_publish):
 *   node ./scripts/generate-cursor-sitemap.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";

const REPO_BASE = "https://tsyjonathan.github.io/Tiny-doc";
const DOCS_ROOT = path.resolve(process.cwd(), "docs");
const OUT_DIR = path.join(DOCS_ROOT, "all-pages");
const CHUNK_SIZE = 50;

function toUrlFromDocsIndexMd(filePath) {
  // filePath: docs/tink_docs_home/.../index.md  -> https://.../Tiny-doc/tink_docs_home/.../
  const rel = path.relative(DOCS_ROOT, filePath).split(path.sep).join("/");
  const withoutIndex = rel.replace(/index\.md$/i, "");
  return `${REPO_BASE}/${withoutIndex}`;
}

async function listIndexMdPages() {
  const roots = ["tink_docs_home", "tink_docs_api"].map((d) => path.join(DOCS_ROOT, d));
  const out = [];

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name.startsWith(".")) continue;
        await walk(full);
      } else if (e.isFile() && e.name === "index.md") {
        out.push(full);
      }
    }
  }

  for (const r of roots) await walk(r);
  out.sort((a, b) => a.localeCompare(b));
  return out;
}

function htmlPage(title, bodyHtml) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body>
    <h1>${title}</h1>
${bodyHtml}
  </body>
</html>
`;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const pages = await listIndexMdPages();
  const urls = pages.map(toUrlFromDocsIndexMd);

  const parts = [];
  for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
    parts.push(urls.slice(i, i + CHUNK_SIZE));
  }

  // Write chunk pages
  const partFiles = [];
  for (let i = 0; i < parts.length; i++) {
    const partNum = String(i + 1).padStart(3, "0");
    const filename = `cursor-part-${partNum}.html`;
    const filePath = path.join(OUT_DIR, filename);
    partFiles.push(filename);

    const links = parts[i].map((u) => `    <li><a href="${u}">${u}</a></li>`).join("\n");
    const body = `  <p>Part ${partNum} — ${parts[i].length} pages</p>
  <ul>
${links}
  </ul>
`;
    await fs.writeFile(filePath, htmlPage(`Tink docs (Cursor) part ${partNum}`, body), "utf8");
  }

  // Write hub page
  const hubLinks = partFiles
    .map((f) => `    <li><a href="${REPO_BASE}/all-pages/${f}">${f}</a></li>`)
    .join("\n");
  const hubBody = `  <p>Total pages: ${urls.length}</p>
  <p>This page links to smaller parts so crawlers can index everything reliably.</p>
  <ul>
${hubLinks}
  </ul>
`;
  await fs.writeFile(path.join(OUT_DIR, "cursor-sitemap.html"), htmlPage("Tink docs (Cursor sitemap)", hubBody), "utf8");

  console.log(`[cursor-sitemap] total pages: ${urls.length}`);
  console.log(`[cursor-sitemap] parts: ${parts.length} (chunk size ${CHUNK_SIZE})`);
  console.log(`[cursor-sitemap] wrote: docs/all-pages/cursor-sitemap.html`);
}

await main();

