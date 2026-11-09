// Runs after both Vite builds. Renders each page to static HTML so content shows
// before JavaScript loads, then React adopts it in the browser (see src/main.tsx).
import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { render } from "../dist-ssr/entry-server.js";

const ROOT = '<div id="root"></div>';
const template = readFileSync("dist/index.html", "utf8");
if (!template.includes(ROOT))
  throw new Error(`dist/index.html is missing ${ROOT}`);

// Start downloading the above-the-fold font right away, instead of waiting until
// the browser has parsed the CSS and laid out text. Names carry a build hash, so look them up.
const fontPatterns = [/^inter-latin-wght-normal-.+\.woff2$/];
const assets = readdirSync("dist/assets");
const preloads = fontPatterns.map((pattern) => {
  const file = assets.find((name) => pattern.test(name));
  if (!file) throw new Error(`No font file matches ${pattern} in dist/assets`);
  return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`;
});
// Replacements are passed as functions on purpose: a replacement *string* treats
// `$&`, `$'`, and similar sequences specially, which would corrupt the page if the
// rendered content ever contained them.
const head = template.replace(
  "</head>",
  () => `  ${preloads.join("\n    ")}\n  </head>`,
);

const TITLE = /<title>[^<]*<\/title>/;
if (!TITLE.test(head)) throw new Error("dist/index.html is missing a <title>");

// GitHub Pages serves 404.html for unknown paths. Any path the router doesn't know
// renders NotFound, so "/404" stands in for all of them.
// `title` replaces index.html's <title>; leave it out to keep that one.
const pages = {
  "index.html": { url: "/" },
  "404.html": { url: "/404", title: "Page not found · Yuki Saito" },
};
for (const [file, { url, title }] of Object.entries(pages)) {
  const html = await render(url);
  let page = head.replace(ROOT, () => `<div id="root">${html}</div>`);
  if (title) page = page.replace(TITLE, () => `<title>${title}</title>`);
  writeFileSync(`dist/${file}`, page);
  console.log(`prerendered ${url} -> dist/${file}`);
}

rmSync("dist-ssr", { recursive: true, force: true });
