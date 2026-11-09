import "./styles/globals.scss";

import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

// Pages also serves home at /index(.html); normalize so the router doesn't 404.
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

// Prerendered in production, empty in dev.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
