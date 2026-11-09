import "./styles/globals.scss";

import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

// GitHub Pages also serves the home page at /index.html and /index. The router
// only knows "/", so it would render NotFound over the prerendered home page.
// Fix the URL before React starts, so the router sees "/" and the HTML matches.
if (/^\/index(\.html)?$/.test(location.pathname)) {
  history.replaceState(null, "", "/" + location.search + location.hash);
}

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Built pages arrive prerendered, so React adopts the existing HTML (hydration).
// In dev the root is empty, so React renders from scratch.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
