// GitHub Pages serves 404.html for unknown paths. Copying the SPA entry there
// lets the client-side router render the NotFound page for any bad URL.
import { copyFileSync } from "node:fs";

copyFileSync("dist/index.html", "dist/404.html");
