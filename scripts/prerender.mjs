// Renders each route to static HTML after the client and SSR builds.
import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { render } from "../dist-ssr/entry-server.js";

const ROOT = '<div id="root"></div>';
const TITLE = /<title>[^<]*<\/title>/;

const template = readFileSync("dist/index.html", "utf8");
if (!template.includes(ROOT))
  throw new Error(`dist/index.html is missing ${ROOT}`);
if (!TITLE.test(template))
  throw new Error("dist/index.html is missing a <title>");

const font = readdirSync("dist/assets").find((name) =>
  /^inter-latin-wght-normal-.+\.woff2$/.test(name),
);
if (!font) throw new Error("Inter woff2 not found in dist/assets");

// Function replacers: a string would expand $& etc.
const head = template.replace(
  "</head>",
  () =>
    `  <link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />\n  </head>`,
);

// Pages serves 404.html for unknown paths.
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
