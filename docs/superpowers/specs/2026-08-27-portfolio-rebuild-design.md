# Portfolio Rebuild — Design Spec

**Date:** 2026-08-27
**Status:** Approved for implementation
**Owner:** Eashan Jain

## 1. Goal

Replace the starter-scaffold content with a complete, production-quality personal
portfolio that positions Eashan Jain as a **software developer, AI engineer, and
system builder** — someone who builds complete systems across web, desktop,
AI/ML, computer vision, IoT/embedded, cloud, and data layers, backed by a
published IEEE paper. The site proves range through real, verified projects, not
buzzword lists.

## 2. What is preserved

- R3F rendering infrastructure: `Scene`, `SceneCanvas`, `SceneErrorBoundary`,
  `usePrefersReducedMotion`, `isWebGLAvailable`, demand-driven frameloop, the
  `r3f` manual vendor chunk.
- Playwright diagnostics harness (`e2e/fixtures.ts`) — zero-console-error bar.
- Vite + React 19 + TS + react-router-dom stack.

## 3. What is replaced

All page content, `SpinningKnot`, the flat CSS, the 3-item nav. E2E spec bodies
are rewritten against the new site (the harness/fixtures stay).

## 4. Decisions (locked)

| Question | Decision |
| --- | --- |
| IEEE paper | Title + IEEE Xplore link + author only. No invented venue/year/abstract/metrics. Conservative one-line paraphrase of the title is allowed. A `note` field flags that full details will be added. |
| Site structure | Narrative single-page homepage (channels CH.01–CH.08) + dedicated `/work/:slug` case studies for flagship projects. |
| Content | Typed data modules in `src/data/`. No admin UI (static site). |
| GitHub integration | Build-time snapshot committed as JSON (`scripts/fetch-github.mjs` → `src/data/github-snapshot.json`). Never blocks render. |
| Contact | `mailto:` + click-to-copy email + LinkedIn/GitHub links + resume link. No backend. |
| New dependency | `framer-motion` only (motion system; matches Eashan's own NOVA/QuotaVerse stack). |

## 5. Visual identity — "Personal Engineering System"

Instrument-panel / telemetry readout, drawn from Eashan's sensor + waveform +
MQTT work. Restrained side of instrumentation (lab silkscreen, oscilloscope
graticule, plotter linework), **not** the banned dashboard clichés (glass cards,
glowing gauges, neon, particle fields).

**Color — graphite & signal**

- `--ink #0A0B0D` background
- `--panel #121418` raised / hairline-bordered regions
- `--line rgba(233,238,245,0.10)` graticule hairlines, dividers
- `--fg #E9EEF5` primary text
- `--muted #7E8794` labels, secondary text
- `--signal #F2A93B` **the** accent (amber) — active state, one hero word, active
  diagram node, hover underline. Never fills large areas.
- `--trace #4FD1C5` telemetry teal — **only inside diagrams/visualizations** for
  data-flow lines, so the amber stays rare.

**Type**

- Display: **Space Grotesk** (headings + hero only), tight tracking `-0.02em`.
- Body: **Inter**.
- Utility/data: **JetBrains Mono** — structural voice: channel numbers, eyebrows,
  tags, nav, metadata, diagram labels, `STATUS · BUILDING`. Uppercase, `+0.08em`.

All three via Google Fonts. Border-radius 0 everywhere except 3D canvas + pills
(2px). One hairline instead of shadows.

**Structure is information**

- `CH.01`–`CH.08` channel markers — justified by the explicit 01–08 user journey
  (a real signal chain). Sit on the section hairline.
- Eyebrows as telemetry names: `— SIGNAL / IDENTITY`, `— READOUT / WHAT I BUILD`.
- Platform pills (`WEB` `DESKTOP` `AI SYSTEM` `EMBEDDED` `IoT` `CLOUD` `DATA`
  `HYBRID`) on every project everywhere.
- Fixed low-opacity graticule (dot/cross grid) behind the page — static, not
  motion.
- Desktop: thin left channel rail = vertical progress spine.

## 6. Signature element — The Engineering Map

Interactive node-graph: `EASHAN JAIN` at center wired to 8 domains (AI,
Applications, Desktop Software, IoT, Cloud, Data, Security, Research). Selecting a
domain expands it → technologies → linked project rows in a DOM panel.

- R3F scene inside `<Scene>` (offscreen-gated, demand frameloop, reduced-motion
  static pose, WebGL fallback). Idle = one very slow rotation.
- The **domain detail panel is pure DOM**, driven by shared state — works
  identically with WebGL, without WebGL, and on mobile (accordion). The 3D is the
  hero visual; the DOM is the accessible equivalent.
- Reappears as a small 8-node rosette on each channel marker, lighting the
  relevant domain.

## 7. Homepage channels

1. **CH.01 SIGNAL / IDENTITY** — hero. `BUILDING INTELLIGENT SOFTWARE SYSTEMS.`
   + cycling scope word (masked cross-fade, not typewriter) + Engineering Map.
2. **CH.02 READOUT / WHAT I BUILD** — 7 engineering domains as an interactive
   index (not identical cards); expanding detail region reusing domain data.
3. **CH.03 TECHNOLOGY ECOSYSTEM** — evidence-based skills. Each tech → "Used in:
   [projects]" + purpose. Select tech ↔ see projects; select project ↔ see stack.
   No percentages.
4. **CH.04 FEATURED WORK** — ~6 flagships as large index rows, hover preview,
   platform pills, link to case study.
5. **CH.05 RESEARCH & PUBLICATION** — `PUBLICATION 01 / IEEE RESEARCH` / title /
   conservative summary / `READ PUBLICATION`. Plus research → shared methods →
   related projects connective visual.
6. **CH.06 CURRENTLY BUILDING** — `STATUS · BUILDING` + focus areas from data.
7. **CH.07 JOURNEY** — progression through increasing complexity (Foundations →
   Applications → AI → IoT/Embedded → Cloud → Research) from experience +
   education + certifications + achievements data. Certs and achievements are
   separate blocks; the IEEE paper outranks course certificates visually.
8. **CH.08 CONTACT** — email, copy, socials, resume.

Plus: sticky mono nav, left channel rail, footer, scroll progress.

## 8. Case study route `/work/:slug`

Hero (title, one-liner, platform pills, year, GitHub/live links) → Problem →
What I built → How it works (interactive `ArchitectureDiagram`, SVG/DOM, per
project's real pipeline) → Technology → Engineering challenges → Technical
decisions → Outcome. All from `projects.ts`.

## 9. Data modules (`src/data/`)

- `profile.ts` — name, roles, education, location, socials, resumeUrl,
  currentlyBuilding[].
- `domains.ts` — 8 domains: id, label, eyebrow, blurb, technologyIds[],
  projectSlugs[].
- `technologies.ts` — id, name, category, purpose, projectSlugs[].
- `projects.ts` — `Project` type: title, slug, category, platforms[], tier
  (`flagship` | `system` | `archive`), featured, shortDescription, problem,
  solution, architecture { nodes[], edges[] }, technologies[], challenges[],
  decisions[], results[], githubUrl, liveUrl, status, year.
- `research.ts` — publication (title, url, publisher, author, status, summary,
  note, sharedMethods[], relatedProjectSlugs[]).
- `experience.ts` — journey[] + certifications[] + achievements[].
- `github-snapshot.json` — generated, committed.

## 10. Cross-cutting

- **Animation:** `src/lib/motion.ts` shared variants (`fadeUp`, `stagger`,
  `maskReveal`) + `<MotionConfig reducedMotion="user">`. One motion weight on
  scroll (12px rise + fade, 320ms, once). Orchestrated page-load hero sequence.
- **Accessibility:** semantic landmarks, one `<h1>` per view, visible focus
  rings, keyboard-operable map/diagram/nav, contrast ≥ WCAG AA, reduced-motion
  static paths.
- **Performance:** route-split pages, lazy 3D (unchanged), `font-display: swap`,
  DPR ≤ 2, no offscreen WebGL, build-time GitHub data.
- **SEO:** per-route `<title>`/description via a small hook, OG/Twitter meta +
  JSON-LD `Person` in `index.html`, `public/robots.txt`, `public/sitemap.xml`.

## 11. Verification

`npm run typecheck` + `npm run lint` + `npm run build` clean; `npm run test:e2e`
green (specs rewritten: navigation across channels + case-study routes,
interactions on map / ecosystem / architecture diagram, 3D mounts-or-falls-back
error-free, responsive no-overflow at 390/834/1440 incl. a case-study route).
Manual Chrome pass (Playwright MCP) at mobile + desktop; fix issues found.

## 12. Out of scope

Admin UI / CMS backend, contact-form backend, blog, i18n, light theme, custom
generated OG raster image (meta text + JSON-LD only).
