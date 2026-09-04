import type { Technology } from './types'
import { projects } from './projects'

/**
 * Evidence-based technology list. `purpose` describes what Eashan uses each tool
 * for; `projectSlugs` is derived from the projects that actually use it. No
 * proficiency percentages — the projects are the evidence.
 */
const base: Omit<Technology, 'projectSlugs'>[] = [
  // Languages
  {
    id: 'python',
    name: 'Python',
    category: 'Language',
    purpose:
      'ML pipelines, backends, computer vision and automation — the default for anything data- or model-shaped.',
  },
  {
    id: 'cpp',
    name: 'C / C++',
    category: 'Language',
    purpose:
      'Firmware for ESP8266 / ESP32 devices, including on-device model inference and sensor drivers.',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Language',
    purpose: 'Typed React / Next.js applications and their state layers.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Language',
    purpose:
      'Browser dashboards served straight from microcontrollers, and Node backends.',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Language',
    purpose:
      'Relational schema design, triggers and queries for record-heavy systems.',
  },
  // Frontend
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    purpose:
      'Component architecture for applications and real-time dashboards.',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    purpose:
      'App Router applications with server and client components, auth callbacks and deployment.',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'Frontend',
    purpose: 'Design-token-driven styling for consistent interface systems.',
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    category: 'Frontend',
    purpose:
      'Scroll and interaction motion that stays within a reduced-motion budget.',
  },
  {
    id: 'threejs',
    name: 'Three.js / R3F',
    category: 'Frontend',
    purpose:
      'Signature 3D visuals and spatial dashboards — a ward floor plan, an ambient globe, a system map.',
  },
  {
    id: 'recharts',
    name: 'Recharts',
    category: 'Frontend',
    purpose: 'Usage, radial and heatmap charts for analytics dashboards.',
  },
  {
    id: 'zustand',
    name: 'Zustand',
    category: 'Frontend',
    purpose: 'State for large dashboards with many independent sections.',
  },
  // Backend
  {
    id: 'flask',
    name: 'Flask',
    category: 'Backend',
    purpose:
      'Inference services and REST APIs that sit between sensors and a model.',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Backend',
    purpose:
      'Async APIs with API-key ingest, WebSocket broadcast and an anomaly engine.',
  },
  {
    id: 'node',
    name: 'Node.js',
    category: 'Backend',
    purpose: 'REST API backends and challenge submissions.',
  },
  {
    id: 'express',
    name: 'Express',
    category: 'Backend',
    purpose: 'Routing, middleware and JWT-gated CRUD APIs.',
  },
  {
    id: 'websockets',
    name: 'WebSockets',
    category: 'Backend',
    purpose: 'Sub-second push of readings and alerts to every connected client.',
  },
  {
    id: 'jwt',
    name: 'JWT / bcrypt',
    category: 'Backend',
    purpose:
      'Stateless auth and hashed credentials, with role-based access where needed.',
  },
  // AI / ML
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'AI/ML',
    purpose:
      '1D CNN and LSTM models for classifying activity, falls and tremor from IMU windows.',
  },
  {
    id: 'sklearn',
    name: 'scikit-learn',
    category: 'AI/ML',
    purpose:
      'Wait-time regression and the offline modelling backend for the queue system.',
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'AI/ML',
    purpose: 'Live camera capture and frame handling for recognition.',
  },
  {
    id: 'face-recognition',
    name: 'face_recognition',
    category: 'AI/ML',
    purpose: 'Face detection, encoding and identity matching against an enrolled set.',
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'AI/ML',
    purpose:
      'Signal resampling, normalisation and windowing shared between training and inference.',
  },
  // Data
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'Data',
    purpose: 'Primary store for devices, readings, alerts and audit logs.',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Data',
    purpose: 'Normalised relational schema with triggers for a lab DBMS.',
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'Data',
    purpose: 'Local persistence for desktop and edge applications.',
  },
  {
    id: 'sqlalchemy',
    name: 'SQLAlchemy',
    category: 'Data',
    purpose: 'ORM layer over PostgreSQL with throttled writes.',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Data',
    purpose: 'Auth and hosted Postgres for the AI command center.',
  },
  // IoT / hardware
  {
    id: 'esp32',
    name: 'ESP32',
    category: 'IoT / Hardware',
    purpose:
      'Wi-Fi microcontroller for wearables, energy metering and biometric access.',
  },
  {
    id: 'esp8266',
    name: 'ESP8266',
    category: 'IoT / Hardware',
    purpose:
      'Low-cost Wi-Fi microcontroller running edge AI, MQTT and on-board web servers.',
  },
  {
    id: 'mpu6050',
    name: 'MPU6050 IMU',
    category: 'IoT / Hardware',
    purpose: '6-axis motion sensing for activity and fall classification.',
  },
  {
    id: 'max30102',
    name: 'MAX30100 / 30102',
    category: 'IoT / Hardware',
    purpose: 'Photoplethysmography for heart rate and SpO2.',
  },
  {
    id: 'pzem',
    name: 'PZEM-004T',
    category: 'IoT / Hardware',
    purpose: 'Electrically isolated true-RMS AC energy measurement over UART.',
  },
  {
    id: 'fsr',
    name: 'FSR 402',
    category: 'IoT / Hardware',
    purpose: 'Bed-pressure sensing for occupancy detection.',
  },
  {
    id: 'rfid',
    name: 'RFID (RC522)',
    category: 'IoT / Hardware',
    purpose: 'Patient authentication inside an anti-spoof token window.',
  },
  {
    id: 'arduino',
    name: 'Arduino',
    category: 'IoT / Hardware',
    purpose: 'Firmware framework and libraries for sensor and actuator control.',
  },
  // Cloud / infra
  {
    id: 'docker',
    name: 'Docker',
    category: 'Cloud / Infra',
    purpose:
      'Compose stacks (Postgres + ASGI server + Nginx) for reproducible deployment.',
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud / Infra',
    purpose: 'Cloud hosting and infrastructure for deployed applications.',
  },
  {
    id: 'mqtt',
    name: 'MQTT',
    category: 'Cloud / Infra',
    purpose:
      'Backendless messaging — publish device state to a broker, subscribe from a static page.',
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'Tooling',
    purpose: 'Build tooling and dev server for React frontends, including this site.',
  },
]

export const technologies: Technology[] = base.map((t) => ({
  ...t,
  projectSlugs: projects
    .filter((p) => p.technologies.includes(t.id))
    .map((p) => p.slug),
}))

export const techById = (id: string) => technologies.find((t) => t.id === id)

export const techCategories = [
  'Language',
  'Frontend',
  'Backend',
  'AI/ML',
  'Data',
  'IoT / Hardware',
  'Cloud / Infra',
  'Tooling',
] as const
