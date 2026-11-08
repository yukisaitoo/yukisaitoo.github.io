# yukisaitoo.github.io

Personal site, built with [Vite](https://vite.dev) + React + TypeScript and styled with SCSS (CSS Modules). Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # serve dist/ locally
npm run lint      # oxlint
npm run format    # prettier
```

## Structure

- `src/pages/` — routes (`Home`, `NotFound`), wired up in `src/App.tsx`
- `src/components/` — feature components, each with a `*.module.scss`
- `src/components/ui/` — small primitives (Button, Card, Tabs, …) built on Radix
- `src/styles/` — reset, design tokens (`_tokens.scss`), animations, global theme variables
- `src/data/*.json` — site content (career, education, skills, socials), validated with zod
- `public/` — static assets served as-is (images, `resume.pdf`)

Light/dark theme colors are HSL custom properties in `src/styles/globals.scss`.

## Notes

- GitHub Pages has no SPA routing, so the build copies `index.html` to `404.html`; unknown paths load the app, which renders the NotFound page.
- GitHub/LinkedIn icons are vendored in `src/components/icons/` because lucide-react 1.x removed brand icons.
