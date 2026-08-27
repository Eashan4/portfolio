# Portfolio

A 3D portfolio built with **Vite + React 19 + TypeScript + React Three Fiber**.

## Getting started

```bash
npm install
npx playwright install chromium   # one-time, for E2E tests
npm run dev                       # http://localhost:5173
```

## Scripts

| Command                   | Purpose                                            |
| ------------------------- | -------------------------------------------------- |
| `npm run dev`             | Dev server (http://localhost:5173)                 |
| `npm run build`           | Type-check + production build to `dist/`           |
| `npm run preview`         | Serve the production build (http://localhost:4173) |
| `npm run typecheck`       | Type-check only                                    |
| `npm run lint`            | oxlint                                             |
| `npm run format`          | Prettier write                                     |
| `npm run test:e2e`        | Playwright E2E (auto-starts the dev server)        |
| `npm run test:e2e:ui`     | Playwright interactive UI                          |
| `npm run test:e2e:report` | Open the last HTML report                          |

Run E2E against an already-running server:

```bash
PW_BASE_URL=http://localhost:5173 npm run test:e2e
```

## Structure

```
src/
  App.tsx                 route shell (lazy pages)
  pages/                  Home, Work, About
  components/
    Scene.tsx             3D stage: WebGL detection, in-view gating, error boundary
    SceneCanvas.tsx       lazy R3F <Canvas> (three.js lands in its own chunk)
    SpinningKnot.tsx      example mesh (reduced-motion aware)
  hooks/usePrefersReducedMotion.ts
  lib/webgl.ts
e2e/                      Playwright specs (navigation, interactions, three-d, responsive)
.claude/skills/           vendored project skills (see ATTRIBUTION.md)
```

See [`CLAUDE.md`](./CLAUDE.md) for the 3D / rendering conventions this project follows.
