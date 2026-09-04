// Build-time GitHub snapshot generator.
//
//   node scripts/fetch-github.mjs
//
// Writes src/data/github-snapshot.json — a curated, static view of selected
// repositories. The site never calls the GitHub API at runtime, so an API
// outage or rate limit can't affect the page. Re-run this to refresh the data
// and commit the result.

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const USER = 'Eashan4'

// Only these repos surface on the site, in this order. Everything else in the
// account is intentionally omitted.
const CURATED = [
  'smart-hospital-queue-system',
  'smarthealth-ai',
  'nova',
  'antigravity-tracker',
  'Real-Time-Facial-Recognition-System-with-Assistant',
  'Laboratory_managment-system-DBMS-',
  'bed-occupancy-management',
  'Smart-Energy-Meter',
  'Fingerprint-Door-Lock-System',
  'Heart-Rate-Monitoring-System',
]

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'eashan-portfolio-build',
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
}

async function main() {
  const out = { generatedAt: new Date().toISOString(), user: USER, repos: [] }

  for (const name of CURATED) {
    try {
      const res = await fetch(`https://api.github.com/repos/${USER}/${name}`, {
        headers,
      })
      if (!res.ok) {
        console.warn(`skip ${name}: HTTP ${res.status}`)
        continue
      }
      const r = await res.json()
      out.repos.push({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        topics: r.topics ?? [],
        pushedAt: r.pushed_at,
      })
    } catch (err) {
      console.warn(`skip ${name}: ${err.message}`)
    }
  }

  const dest = join(
    dirname(fileURLToPath(import.meta.url)),
    '..',
    'src',
    'data',
    'github-snapshot.json',
  )
  writeFileSync(dest, JSON.stringify(out, null, 2) + '\n')
  console.log(`wrote ${out.repos.length} repos → ${dest}`)
}

main()
