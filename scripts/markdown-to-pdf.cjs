#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const CODEX_NODE_MODULES = path.join(
  os.homedir(),
  ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules",
);

function resolveFrom(paths, modulePath) {
  for (const basePath of paths) {
    try {
      return require.resolve(modulePath, { paths: [basePath] });
    } catch {
      // Try the next candidate.
    }
  }
  return null;
}

function requireFrom(paths, modulePath) {
  const resolved = resolveFrom(paths, modulePath);
  if (!resolved) {
    throw new Error(
      `Cannot resolve ${modulePath}. Install it locally or run from the Codex workspace runtime.`,
    );
  }
  return require(resolved);
}

function tryRequireFrom(paths, modulePath) {
  const resolved = resolveFrom(paths, modulePath);
  return resolved ? require(resolved) : null;
}

function latestHeadlessShell() {
  if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE) {
    return process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  }

  const cacheRoot = path.join(os.homedir(), "Library/Caches/ms-playwright");
  if (!fs.existsSync(cacheRoot)) return null;

  const candidates = fs
    .readdirSync(cacheRoot)
    .filter((name) => name.startsWith("chromium_headless_shell-"))
    .map((name) => {
      const revision = Number(name.split("-").pop());
      return {
        revision: Number.isFinite(revision) ? revision : 0,
        executable: path.join(cacheRoot, name, "chrome-mac/headless_shell"),
      };
    })
    .filter((candidate) => fs.existsSync(candidate.executable))
    .sort((a, b) => b.revision - a.revision);

  return candidates[0]?.executable ?? null;
}

function mimeTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".webp") return "image/webp";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".gif") return "image/gif";
  return "image/png";
}

function embedLocalImages(markdown, markdownDir) {
  return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, rawSrc) => {
    const src = rawSrc.trim();
    if (/^(data:|https?:|#)/i.test(src)) return match;

    const cleanSrc = src.replace(/^<|>$/g, "");
    const imagePath = path.resolve(markdownDir, decodeURI(cleanSrc));
    if (!fs.existsSync(imagePath)) return match;

    const encoded = fs.readFileSync(imagePath).toString("base64");
    return `![${alt}](data:${mimeTypeFor(imagePath)};base64,${encoded})`;
  });
}

function firstMarkdownHeading(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

async function main() {
  const cwd = process.cwd();
  const inputArg = process.argv[2] ?? "bid-docs/introduce.md";
  const outputArg = process.argv[3] ?? inputArg.replace(/\.md$/i, ".pdf");
  const inputPath = path.resolve(cwd, inputArg);
  const outputPath = path.resolve(cwd, outputArg);
  const projectNodeModules = path.join(cwd, "node_modules");
  const searchPaths = [projectNodeModules, CODEX_NODE_MODULES].filter((candidate) =>
    fs.existsSync(candidate),
  );

  const markedMod = requireFrom(searchPaths, "marked");
  const playwright =
    tryRequireFrom(searchPaths, "playwright-core") || tryRequireFrom(searchPaths, "playwright");
  if (!playwright) {
    throw new Error(
      "Cannot resolve playwright or playwright-core. Install Playwright locally or run from the Codex workspace runtime.",
    );
  }

  const rawMarkdown = fs.readFileSync(inputPath, "utf8");
  const markdown = embedLocalImages(rawMarkdown, path.dirname(inputPath));
  const title = firstMarkdownHeading(rawMarkdown, path.basename(inputPath, ".md"));
  const body = markedMod.marked.parse(markdown, {
    mangle: false,
    headerIds: false,
  });

  const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    @page { size: A4; margin: 18mm 16mm 20mm; }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", Arial, sans-serif;
      color: #17202a;
      line-height: 1.68;
      font-size: 11.5pt;
    }
    h1, h2, h3, h4 {
      line-height: 1.28;
      color: #0f172a;
      break-after: avoid;
    }
    h1 {
      font-size: 24pt;
      margin: 0 0 18pt;
      border-bottom: 2px solid #0f766e;
      padding-bottom: 10pt;
    }
    h2 {
      font-size: 17pt;
      margin: 24pt 0 10pt;
      border-bottom: 1px solid #d7dee8;
      padding-bottom: 5pt;
    }
    h3 { font-size: 13.5pt; margin: 18pt 0 8pt; }
    h4 { font-size: 12pt; margin: 14pt 0 6pt; }
    p { margin: 0 0 9pt; }
    ul, ol { margin: 0 0 10pt 1.35em; padding: 0; }
    li { margin: 3pt 0; }
    a { color: #0f766e; text-decoration: none; }
    hr { border: 0; border-top: 1px solid #d7dee8; margin: 18pt 0; }
    img {
      display: block;
      max-width: 100%;
      height: auto;
      max-height: 190mm;
      object-fit: contain;
      margin: 10pt auto 14pt;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    body > p:first-child img {
      max-width: 88pt;
      margin: 0 0 14pt;
    }
    code {
      font-family: Menlo, Consolas, monospace;
      background: #eef2f7;
      padding: 1px 4px;
      border-radius: 3px;
    }
    strong { color: #111827; }
    blockquote {
      border-left: 3px solid #0f766e;
      margin: 0 0 10pt;
      padding: 0 0 0 10pt;
      color: #475569;
    }
  </style>
</head>
<body>${body}</body>
</html>`;

  const executablePath = latestHeadlessShell();
  const launchOptions = executablePath ? { headless: true, executablePath } : { headless: true };

  const browser = await playwright.chromium.launch(launchOptions);
  const page = await browser.newPage({
    viewport: { width: 1240, height: 1754 },
    deviceScaleFactor: 1,
  });

  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.evaluate(async () => {
    const images = Array.from(document.images);
    await Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => reject(new Error("Image failed to load"));
        });
      }),
    );
    await Promise.all(images.map((img) => (img.decode ? img.decode().catch(() => {}) : null)));
  });

  const imageStatus = await page.evaluate(() =>
    Array.from(document.images).map((img) => ({
      width: img.naturalWidth,
      height: img.naturalHeight,
    })),
  );

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: "<div></div>",
    footerTemplate: `<div style="width:100%;font-size:8px;color:#64748b;padding:0 16mm;display:flex;justify-content:space-between;"><span>${title}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    margin: { top: "18mm", right: "16mm", bottom: "20mm", left: "16mm" },
  });
  await browser.close();

  console.log(`Wrote ${outputPath}`);
  console.log(`Embedded ${imageStatus.length} image(s)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
