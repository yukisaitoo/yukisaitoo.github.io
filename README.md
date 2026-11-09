# yukisaitoo.github.io

Personal site, built with [Vite](https://vite.dev) + React + TypeScript and styled with SCSS (CSS Modules). Pages are prerendered to static HTML at build time, then React takes over in the browser. `.github/workflows/deploy.yml` lints and builds every push and pull request, and deploys to GitHub Pages from `main`.

## Development

```bash
npm install
npm run dev           # http://localhost:5173
npm run build         # type-check, client + SSR builds, prerender to dist/
npm run preview       # serve dist/ locally
npm run lint          # oxlint (warnings fail)
npm run format        # prettier --write
npm run format:check  # prettier --check (what CI runs)
```

## Structure

- `src/pages/`: routes (`Home`, `NotFound`), wired up in `src/App.tsx`
- `src/components/`: feature components, most with a `*.module.scss`
- `src/components/ui/`: small primitives (`Button`)
- `src/components/icons/`: vendored icon shapes (see Notes)
- `src/styles/`: reset, design tokens (`_tokens.scss`), global theme variables (`globals.scss`)
- `src/data/*.ts`: site content (`career`, `projects`, `skills`, `socials`, `site`), typed by `src/lib/types.ts`
- `src/main.tsx`: browser entry; hydrates the prerendered HTML
- `src/entry-server.tsx` + `scripts/prerender.mjs`: build-time rendering of `index.html` and `404.html`
- `public/`: static assets served as-is (images, preview media, `resume.pdf`)

Light/dark theme colors are HSL custom properties in `src/styles/globals.scss`.

## Notes

- GitHub Pages has no SPA routing. The build prerenders the NotFound page as `404.html`, which Pages serves for unknown paths.
- `src/components/icons/` vendors GitHub/LinkedIn (dropped from lucide-react 1.x) and the original Mail/FileDown shapes (redrawn in 1.x).
