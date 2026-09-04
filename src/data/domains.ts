import type { Domain, DomainId } from './types'
import { projects } from './projects'

/**
 * The eight engineering domains at the center of the site. `projectSlugs` is
 * derived from each project's own `domains` array so the two never drift.
 */
const base: Omit<Domain, 'projectSlugs'>[] = [
  {
    id: 'intelligent',
    short: 'Intelligent',
    label: 'Intelligent Systems',
    index: 'D-01',
    blurb:
      'Models that classify signals and detect anomalies — from a deep net on a wearable stream to a regressor running in microcontroller firmware.',
    capabilities: [
      'Deep learning (1D CNN, LSTM)',
      'Anomaly detection',
      'Computer vision',
      'On-device inference',
      'Sensor-signal modelling',
    ],
    technologyIds: [
      'pytorch',
      'sklearn',
      'opencv',
      'face-recognition',
      'numpy',
      'python',
    ],
  },
  {
    id: 'applications',
    short: 'Applications',
    label: 'Applications',
    index: 'D-02',
    blurb:
      'Complete web applications with real interaction states — storefronts, management systems, analytics dashboards — engineered to feel shipped.',
    capabilities: [
      'React / Next.js architecture',
      'Design systems',
      'State + persistence',
      'Checkout and admin flows',
      'REST APIs',
    ],
    technologyIds: ['typescript', 'nextjs', 'react', 'tailwind', 'framer', 'node'],
  },
  {
    id: 'desktop',
    short: 'Desktop',
    label: 'Desktop & Executable Software',
    index: 'D-03',
    blurb:
      'Software that runs outside the browser: a self-contained operator application doing live computer vision, local storage and hardware access.',
    capabilities: [
      'Standalone desktop apps',
      'Local processing + storage',
      'Camera / hardware access',
      'Offline-first tools',
    ],
    technologyIds: ['python', 'opencv', 'face-recognition', 'sqlite'],
  },
  {
    id: 'connected',
    short: 'Connected',
    label: 'Connected Systems',
    index: 'D-04',
    blurb:
      'Embedded devices that sense the world and act on it — IR beams, RFID, pulse oximetry, pressure, biometrics — talking over MQTT, HTTP and WebSockets.',
    capabilities: [
      'ESP32 / ESP8266 firmware',
      'Sensor + actuator integration',
      'RFID and biometrics',
      'Edge processing',
      'MQTT / self-hosted dashboards',
    ],
    technologyIds: [
      'esp32',
      'esp8266',
      'cpp',
      'mqtt',
      'rfid',
      'max30102',
      'mpu6050',
      'pzem',
      'fsr',
      'arduino',
    ],
  },
  {
    id: 'cloud',
    short: 'Cloud',
    label: 'Cloud & Infrastructure',
    index: 'D-05',
    blurb:
      'Getting systems into production — containerised stacks, managed Postgres and auth, reverse proxies, and knowing when to have no server at all.',
    capabilities: [
      'Docker Compose stacks',
      'Managed auth + database',
      'Reverse proxy / deployment',
      'Serverless trade-offs',
    ],
    technologyIds: ['docker', 'aws', 'supabase', 'fastapi', 'websockets'],
  },
  {
    id: 'data',
    short: 'Data',
    label: 'Data & Monitoring',
    index: 'D-06',
    blurb:
      'Relational schema design, triggers, time-series readings and the dashboards that make a live system observable.',
    capabilities: [
      'Schema design + triggers',
      'Time-series ingestion',
      'Real-time dashboards',
      'Analytics + history views',
    ],
    technologyIds: [
      'sql',
      'postgres',
      'mysql',
      'sqlite',
      'sqlalchemy',
      'recharts',
    ],
  },
  {
    id: 'security',
    short: 'Security',
    label: 'Security-Aware Systems',
    index: 'D-07',
    blurb:
      'Auth and access control as a first-class concern: per-device API keys, JWT with roles, biometric gates, audit logs, and keeping secrets off the edge.',
    capabilities: [
      'JWT + role-based access',
      'Per-device API keys',
      'Biometric access control',
      'Audit logging',
      'Anti-spoof design',
    ],
    technologyIds: ['jwt', 'rfid'],
  },
  {
    id: 'research',
    short: 'Research',
    label: 'Research',
    index: 'D-08',
    blurb:
      'A published IEEE paper, plus the habit of fixing a baseline architecture, deriving thresholds from real data, and evaluating changes instead of adding them.',
    capabilities: [
      'Published IEEE research',
      'Reproducible ML pipelines',
      'Baseline-driven evaluation',
      'Scope-limit auditing',
    ],
    technologyIds: ['python', 'pytorch', 'fastapi'],
  },
]

export const domains: Domain[] = base.map((d) => ({
  ...d,
  projectSlugs: projects
    .filter((p) => p.domains.includes(d.id))
    .map((p) => p.slug),
}))

export const domainById = (id: DomainId) => domains.find((d) => d.id === id)
