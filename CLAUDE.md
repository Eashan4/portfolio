# Portfolio — project guide

A 3D portfolio: **Vite + React 19 + TypeScript + React Three Fiber**.

## Commands

| Task                         | Command                                              |
| ---------------------------- | ---------------------------------------------------- |
| Dev server                   | `npm run dev` (http://localhost:5173, strict port)   |
| Production build             | `npm run build` (`tsc -b` + `vite build`)            |
| Preview built site           | `npm run preview` (http://localhost:4173)            |
| Type-check only              | `npm run typecheck`                                  |
| Lint                         | `npm run lint` (oxlint)                              |
| Format                       | `npm run format` / `npm run format:check`            |
| E2E tests                    | `npm run test:e2e` (auto-starts the dev server)      |
| E2E against a running server | `PW_BASE_URL=http://localhost:5173 npm run test:e2e` |
| E2E interactive              | `npm run test:e2e:ui`                                |
| Last HTML report             | `npm run test:e2e:report`                            |

Playwright browsers: `npx playwright install chromium` (run once).

## 3D / rendering conventions

Follow these when adding or changing 3D content (see `src/components/Scene.tsx`):

- **Never render offscreen.** The `<Scene>` wrapper gates the canvas behind an
  `IntersectionObserver`; keep new scenes inside it.
- **Demand-driven frameloop.** Canvas uses `frameloop="demand"` and only flips
  to `"always"` while visible AND the tab is focused AND reduced-motion is off.
  If you add continuous animation, keep it behind the same `animate` gate.
- **Respect reduced motion.** `usePrefersReducedMotion()` → render a static pose,
  no animation loop.
- **WebGL fallback.** `isWebGLAvailable()` decides canvas vs. static fallback;
  `SceneErrorBoundary` catches runtime failures. Every scene needs a meaningful
  `label` used as the fallback text / aria-label.
- **Lazy-load the 3D runtime.** `SceneCanvas.tsx` is a `React.lazy` boundary so
  `three` / `@react-three/fiber` / `drei` land in a separate `r3f` vendor chunk
  (see `vite.config.ts` manualChunks) that only loads when a scene mounts.
  Import heavy models/effects lazily too.
- **Cap DPR at 2**, prefer `powerPreference: 'high-performance'`, avoid
  full-screen post-processing unless measured.
- Prefer **React Three Fiber** for scene graph work; drop to vanilla `three`
  only for imperative edge cases.

Every page with a 3D scene must keep a working non-WebGL fallback, and
`npm run test:e2e` (see `e2e/three-d.spec.ts`) must stay green — it fails on any
console error or uncaught exception from a scene.

## Project skills

Project-scoped skills live in `.claude/skills/` (vendored — see
`.claude/skills/ATTRIBUTION.md`): `threejs-fundamentals`, `threejs-animation`,
`threejs-interaction`, `threejs-shaders`, `3d-web-experience`, `task-observer`.

**task-observer**: invoke `Skill(task-observer)` at the start of substantive
work sessions in this repo.
