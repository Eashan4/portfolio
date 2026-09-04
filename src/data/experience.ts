import type { Achievement, Certification, JourneyStage } from './types'

/**
 * CH.07 — progression through increasing technical complexity, not a resume
 * timeline. Each stage names real work; ordering is by depth, not strictly date.
 */
export const journey: JourneyStage[] = [
  {
    key: 'foundations',
    label: 'Foundations',
    period: '2021 →',
    headline: 'Languages and hardware',
    detail:
      'Python, C/C++, Java and SQL; first ESP32 boards reading sensors and printing to serial. The habit of getting a signal end to end before making it pretty.',
    markers: ['Python · C++ · Java · SQL', 'ESP32 / ESP8266 basics', 'Arduino'],
  },
  {
    key: 'applications',
    label: 'Application Development',
    period: '2025 →',
    headline: 'Complete web applications',
    detail:
      'A JWT-secured lab management DBMS on MySQL with trigger-driven integrity; then NOVA, a production-polish Next.js storefront with a full cart-to-checkout flow.',
    markers: ['Node · Express · MySQL', 'Next.js 15 · React 19', 'REST + auth'],
  },
  {
    key: 'ai',
    label: 'AI & Intelligent Systems',
    period: '2025 →',
    headline: 'Models against real signals',
    detail:
      'A desktop computer-vision system doing live face recognition and tracking; SmartHealth AI training a 1D CNN against an LSTM on wearable IMU windows with a reproducible pipeline.',
    markers: ['OpenCV · face_recognition', 'PyTorch — 1D CNN / LSTM', 'Reproducible ML'],
  },
  {
    key: 'embedded',
    label: 'IoT & Embedded Engineering',
    period: '2026 →',
    headline: 'Intelligence at the edge',
    detail:
      'The Smart Hospital Queue System runs wait-time regression and Z-score anomaly detection in ESP8266 firmware and publishes over MQTT to a static dashboard — no backend at all.',
    markers: ['On-device inference', 'MQTT · RFID · IR', 'Backendless dashboards'],
  },
  {
    key: 'cloud',
    label: 'Cloud & Infrastructure',
    period: '2026 →',
    headline: 'Getting it into production',
    detail:
      'FastAPI + PostgreSQL + WebSockets behind the bed-occupancy monitor, packaged as a Docker Compose stack with Nginx; Supabase auth and hosted Postgres behind QuotaVerse.',
    markers: ['Docker Compose', 'FastAPI · PostgreSQL', 'Supabase · AWS'],
  },
  {
    key: 'research',
    label: 'Research & Advanced Systems',
    period: '2026 →',
    headline: 'Published contribution',
    detail:
      'A published IEEE paper on AI-powered fuel fraud detection and transparency, plus a Research Assistant role in AI & Data Analytics at SRM IST.',
    markers: ['IEEE Xplore publication', 'Research Assistant — SRM IST', 'AI & Data Analytics'],
  },
]

export const certifications: Certification[] = [
  {
    name: 'OCI 2025 Certified Data Science Professional',
    issuer: 'Oracle Cloud Infrastructure',
    year: '2025',
  },
  {
    name: 'Introduction to Machine Learning',
    issuer: 'NPTEL',
  },
]

export const achievements: Achievement[] = [
  {
    name: 'Hackcelr8 — National Level Hackathon',
    context: 'IEEE SSIT, SRM IST',
    detail: 'Placed among the top 21 teams nationally.',
  },
]
