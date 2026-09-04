import type { Project } from './types'

/**
 * Curated project record. Every claim here is drawn from the project's own
 * repository / README. Weaker repos are intentionally excluded.
 */
export const projects: Project[] = [
  // ---------------------------------------------------------------- FLAGSHIP
  {
    slug: 'smart-hospital-queue',
    title: 'Smart Hospital Queue System',
    category: 'Edge AI · Healthcare IoT',
    tier: 'flagship',
    platforms: ['Embedded', 'AI System', 'IoT', 'Web'],
    year: '2026',
    status: 'Active',
    shortDescription:
      'An ESP8266 that counts patients, verifies them by RFID, predicts wait time on-device, and streams it to a public dashboard with no backend server.',
    summary:
      'A single 80 MHz microcontroller runs wait-time regression and Z-score anomaly detection in firmware, then publishes state over MQTT to a static dashboard anyone can open — zero hosting cost, zero server.',
    problem:
      'Hospital outpatient departments have an expensive, simple problem: nobody knows how long the wait actually is. Patients queue blindly, staff answer the same question all day, and crowding goes unnoticed until it becomes a safety issue. Conventional fixes need a server, a database, and a hosting bill.',
    solution:
      'A self-contained AIoT device at the department entrance. Two IR beams count people in and out; an RFID reader authenticates each patient within a 10-second anti-spoof window; a wait-time model and an anomaly detector run directly on the ESP8266; the resulting state publishes to a public MQTT broker every two seconds. A static GitHub Pages dashboard subscribes to the same broker over secure WebSockets and renders live metrics to anyone in the world.',
    architecture: {
      kind: 'Sensor edge → on-device intelligence → broker → static dashboard',
      nodes: [
        {
          id: 'ir',
          label: 'IR entry / exit beams',
          stage: 0,
          role: 'Two break-beam sensors detect direction of travel to count people entering and leaving the area.',
          tech: 'IR break-beam',
        },
        {
          id: 'rfid',
          label: 'RFID RC522',
          stage: 0,
          role: 'Each patient taps a card; a person is only counted as a real patient once RFID confirms them inside a 10-second window.',
          tech: 'MFRC522 · SPI',
        },
        {
          id: 'token',
          label: 'Token engine',
          stage: 1,
          role: 'Five time-boxed slots hold un-verified arrivals with a countdown; expired tokens are discarded. This is the anti-spoof layer.',
          tech: 'C++ firmware',
        },
        {
          id: 'ai',
          label: 'On-device AI',
          stage: 2,
          role: 'Wait-time regression plus a rolling Z-score anomaly detector, computed in firmware from rolling average, entry velocity and queue pressure. No inference server, no round trip.',
          tech: 'C++ · fixed-point features',
        },
        {
          id: 'mqtt',
          label: 'MQTT client',
          stage: 3,
          role: 'Publishes the full system state as JSON to a public broker every two seconds over TCP 1883.',
          tech: 'MQTT v3.1.1 · broker.emqx.io',
        },
        {
          id: 'dash',
          label: 'Static dashboard',
          stage: 4,
          role: 'A single static index.html on GitHub Pages subscribes over secure WebSockets and repaints live metrics, token countdown rings, and a people-count history chart. Scales to any number of viewers.',
          tech: 'Vanilla JS · WSS 8084',
        },
      ],
      edges: [
        { from: 'ir', to: 'token' },
        { from: 'rfid', to: 'token', label: 'SPI' },
        { from: 'token', to: 'ai' },
        { from: 'ai', to: 'mqtt' },
        { from: 'mqtt', to: 'dash', label: 'publish 2s' },
      ],
    },
    technologies: ['cpp', 'esp8266', 'rfid', 'mqtt', 'sklearn', 'javascript'],
    challenges: [
      'Running a regression model and an anomaly detector inside 80 MHz / limited RAM without an RTOS or an inference library.',
      'Distinguishing a real patient from someone walking past — solved with the RFID-gated token window rather than trusting the beam count.',
      'Keeping the whole system genuinely backendless while still delivering ~2-second end-to-end latency from sensor to browser repaint.',
    ],
    decisions: [
      'Publish to a public MQTT broker instead of standing up a backend — the dashboard becomes a static file and hosting cost drops to zero.',
      'Compute model features (rolling average, entry velocity, queue pressure) on-device so the firmware is the single source of truth.',
      'Ship two deployment modes: standalone at the edge, or piped into an optional Flask + scikit-learn backend for heavier offline modelling.',
    ],
    results: [
      'End-to-end latency of roughly two seconds, sensor edge to browser.',
      'A live public dashboard with no server, no database, and no hosting bill.',
      'Consolidated home for the project, superseding two earlier prototype repositories.',
    ],
    githubUrl: 'https://github.com/Eashan4/smart-hospital-queue-system',
    liveUrl: 'https://eashan4.github.io/smart-hospital-queue-system/',
    domains: ['intelligent', 'connected', 'data'],
  },
  {
    slug: 'smarthealth-ai',
    title: 'SmartHealth AI',
    category: 'Deep Learning · Wearable Monitoring',
    tier: 'flagship',
    platforms: ['AI System', 'IoT', 'Embedded', 'Web'],
    year: '2026',
    status: 'Software complete · hardware pending',
    shortDescription:
      'A wearable streams motion and pulse data to a deep-learning backend that classifies activity, falls, and tremor in real time.',
    summary:
      'ESP32 + MPU6050 + MAX30102 feed a Flask service that segments the IMU stream into sliding windows and runs a 1D CNN (deployed) against an LSTM (comparison) to classify movement, detect falls with rule-based verification, and track vitals.',
    problem:
      'Continuous monitoring for activity, falls, tremor, and vitals normally means bulky, expensive, room-bound equipment. A student healthcare-analytics project needed to show the full detection pipeline on low-cost prototype hardware — explicitly as monitoring and classification, not a certified medical device.',
    solution:
      'A wearable node (ESP32 + MPU6050 IMU + MAX30102 pulse oximeter) streams motion and physiological data over Wi-Fi to a Flask backend. The backend resamples and normalises the signal with the exact same code path used in training, segments it into 3-second / 50 Hz windows (150×6 tensors), and runs deep-learning inference to classify walking, standing, sitting, running and lying, plus fall and tremor-like movement. A decision engine combines the model output with rule-based verification before raising a confirmed-fall alert to a buzzer and a live dashboard.',
    architecture: {
      kind: 'Sensor stream → windowing → dual-model inference → decision engine → alert',
      nodes: [
        {
          id: 'wear',
          label: 'Wearable node',
          stage: 0,
          role: 'ESP32 timestamps and JSON-encodes 6-axis IMU data plus heart rate and estimated SpO2, streaming over Wi-Fi / REST.',
          tech: 'ESP32 · MPU6050 · MAX30102',
        },
        {
          id: 'ingest',
          label: 'Ingest + validate',
          stage: 1,
          role: 'Flask endpoint validates each payload and keeps the vitals stream timestamp-synchronised with the motion stream.',
          tech: 'Flask',
        },
        {
          id: 'prep',
          label: 'Preprocess + window',
          stage: 2,
          role: 'Shared resample + normalise (identical in training and inference), then a sliding 3s @ 50Hz window producing a 150×6 tensor.',
          tech: 'NumPy',
        },
        {
          id: 'cnn',
          label: '1D CNN',
          stage: 3,
          role: 'The deployed classifier for activity, fall and tremor.',
          tech: 'PyTorch',
        },
        {
          id: 'lstm',
          label: 'LSTM',
          stage: 3,
          role: 'A comparison model evaluated against the CNN during model selection.',
          tech: 'PyTorch',
        },
        {
          id: 'decide',
          label: 'Decision engine',
          stage: 4,
          role: 'Combines model prediction with rule-based verification; thresholds are derived from real recorded data, not guessed.',
          tech: 'Python',
        },
        {
          id: 'out',
          label: 'Alert + store',
          stage: 5,
          role: 'Confirmed falls trigger a local buzzer and a dashboard banner; all results persist to SQLite and render on a mobile-first live UI.',
          tech: 'SQLite · vanilla JS',
        },
      ],
      edges: [
        { from: 'wear', to: 'ingest', label: 'Wi-Fi' },
        { from: 'ingest', to: 'prep' },
        { from: 'prep', to: 'cnn' },
        { from: 'prep', to: 'lstm' },
        { from: 'cnn', to: 'decide' },
        { from: 'lstm', to: 'decide' },
        { from: 'decide', to: 'out' },
      ],
    },
    technologies: [
      'python',
      'pytorch',
      'numpy',
      'flask',
      'esp32',
      'mpu6050',
      'max30102',
      'sqlite',
    ],
    challenges: [
      'Guaranteeing the preprocessing path is byte-for-byte identical between training and live inference so the deployed model behaves as evaluated.',
      'Deriving fall / tremor thresholds from real recorded sessions instead of arbitrary constants.',
      'Keeping two synchronised sensor streams (motion at 50 Hz, vitals) aligned through an unreliable Wi-Fi link.',
    ],
    decisions: [
      'Fix the baseline architecture up front and evaluate every change against it, rather than adding models casually.',
      'Deploy the 1D CNN and keep the LSTM purely as a documented comparison.',
      'Ship a decision engine that requires rule-based confirmation on top of the model before alerting — fewer false positives on a safety-critical event.',
    ],
    results: [
      'Complete, reproducible ML pipeline: dataset adapter, shared preprocessing, segmentation, training sweep, threshold derivation, and a real-time inference wrapper.',
      'Live dashboard rendering the actual acceleration-magnitude signal the model classifies, like an instrument readout.',
      'Documented scope-limits audit distinguishing a prototype monitor from a certified device.',
    ],
    githubUrl: 'https://github.com/Eashan4/smarthealth-ai',
    domains: ['intelligent', 'connected', 'applications'],
  },
  {
    slug: 'nova',
    title: 'NOVA',
    category: 'Web Application · Storefront',
    tier: 'flagship',
    platforms: ['Web'],
    year: '2026',
    status: 'Complete',
    shortDescription:
      'A premium consumer-electronics storefront: Next.js 15, React 19, Tailwind v4, with a full cart-to-checkout flow and a monochrome design system.',
    summary:
      'Frontend engineering at production polish — a studio-style catalogue with search, filters and sort, a spring-animated cart drawer, promo codes, an inline order-confirmation checkout, and motion that respects reduced-motion throughout.',
    problem:
      'Demonstrate application-level frontend engineering, not a demo: a storefront that feels like a real product, with a coherent design system, real interaction states, and no rough edges — built entirely on the client with no backend.',
    solution:
      'A Next.js 15 / React 19 app with a monochrome design system and hand-drawn SVG product renders. Cart and wishlist state lives in a typed context, persisted to localStorage and hydrated after mount so there is no SSR read and no hydration mismatch. The catalogue supports URL-preset search, category chips, price bands, sort and a favourites filter. Checkout handles UPI / card / COD selection, a working promo code, generates an order id, clears the cart, and confirms inline — no separate success route.',
    architecture: {
      kind: 'Client-only app: routed pages → store context → localStorage',
      nodes: [
        {
          id: 'pages',
          label: 'App Router pages',
          stage: 0,
          role: 'Home, catalogue, contact and checkout — server components for shell, client components for interactive UI.',
          tech: 'Next.js 15',
        },
        {
          id: 'store',
          label: 'Store context',
          stage: 1,
          role: 'Single source of truth for cart and wishlist: add / remove / quantity, per-line totals, free-shipping threshold, drawer state.',
          tech: 'React context',
        },
        {
          id: 'persist',
          label: 'localStorage',
          stage: 2,
          role: 'Cart and wishlist persist across reloads, hydrating after mount to avoid hydration mismatch.',
          tech: 'Web Storage',
        },
        {
          id: 'checkout',
          label: 'Checkout flow',
          stage: 3,
          role: 'Payment selection, promo code, order-id generation, cart clear, inline confirmation with a copyable order id.',
          tech: 'React · TypeScript',
        },
      ],
      edges: [
        { from: 'pages', to: 'store' },
        { from: 'store', to: 'persist' },
        { from: 'store', to: 'checkout' },
      ],
    },
    technologies: ['typescript', 'nextjs', 'react', 'tailwind', 'framer'],
    challenges: [
      'Persisting cart / wishlist without an SSR read or a hydration mismatch — state hydrates only after mount.',
      'Building a full checkout with promo codes and order confirmation that stays entirely on the client.',
      'Keeping a monochrome system visually rich with type, spacing and studio SVG renders rather than colour.',
    ],
    decisions: [
      'Frontend-only: no database, no API, no admin panel — the constraint keeps the focus on interface engineering.',
      'Inline order confirmation on the checkout route instead of a dedicated success page.',
      'Every home-page animation gated on prefers-reduced-motion.',
    ],
    results: [
      'A storefront that reads as a shipped product: catalogue, filters, cart drawer, checkout, 404.',
      'Twelve studio product renders with a consistent halo treatment.',
      'Deployment notes for a plain Node host, no platform lock-in.',
    ],
    githubUrl: 'https://github.com/Eashan4/nova',
    domains: ['applications'],
  },
  {
    slug: 'quotaverse',
    title: 'QuotaVerse — AI Account Command Center',
    category: 'Web Application · Analytics',
    tier: 'flagship',
    platforms: ['Web', 'Data', 'Cloud'],
    year: '2026',
    status: 'Running',
    shortDescription:
      'A dashboard to monitor AI-provider quotas, route prompts, and manage multiple AI accounts in real time.',
    summary:
      'A Next.js 14 + Supabase application with a 3D globe, radial and heatmap charts, and a sectioned dashboard — overview, accounts, routing, sessions, models, analytics, history, notifications, settings — backed by typed state and auth.',
    problem:
      'Anyone running several AI provider accounts loses track of quota, spend and which account should serve the next request. The information exists but is scattered across provider consoles.',
    solution:
      'A single command center. Supabase handles auth (with an OAuth callback route); a Zustand store holds dashboard state; Recharts renders usage, radial and heatmap views; React Three Fiber renders an ambient AI globe and particle field. The dashboard is split into focused sections — accounts, prompt routing, live sessions, model cards, analytics, history, a notification center and settings — each a self-contained component.',
    architecture: {
      kind: 'Auth → typed store → sectioned dashboard + visualizations',
      nodes: [
        {
          id: 'auth',
          label: 'Supabase auth',
          stage: 0,
          role: 'Session management with a dedicated OAuth callback route; gates the dashboard.',
          tech: 'Supabase SSR',
        },
        {
          id: 'store',
          label: 'Dashboard store',
          stage: 1,
          role: 'Zustand store holding accounts, routing rules, quota state and UI state for every section.',
          tech: 'Zustand',
        },
        {
          id: 'sections',
          label: 'Dashboard sections',
          stage: 2,
          role: 'Overview, accounts, routing, sessions, models, analytics, history, notifications, settings — each an isolated component.',
          tech: 'React · Radix UI',
        },
        {
          id: 'viz',
          label: 'Visualization layer',
          stage: 3,
          role: 'Recharts usage / radial / heatmap charts plus an ambient R3F globe and particle field.',
          tech: 'Recharts · React Three Fiber',
        },
      ],
      edges: [
        { from: 'auth', to: 'store' },
        { from: 'store', to: 'sections' },
        { from: 'sections', to: 'viz' },
      ],
    },
    technologies: [
      'typescript',
      'nextjs',
      'react',
      'tailwind',
      'framer',
      'supabase',
      'recharts',
      'zustand',
      'threejs',
    ],
    challenges: [
      'Designing one state shape that serves nine distinct dashboard sections without them reaching into each other.',
      'Keeping an ambient 3D globe and particle field from competing with dense chart data for attention or GPU.',
      'Wiring Supabase auth with an OAuth callback in the Next.js App Router.',
    ],
    decisions: [
      'Zustand over context for a large, frequently-updated dashboard store.',
      'Radix UI primitives for accessible dialogs, tabs, sliders and tooltips instead of hand-rolling them.',
      'Treat 3D as atmosphere, not instrumentation — charts carry the data.',
    ],
    results: [
      'A nine-section dashboard covering account management, prompt routing, live sessions, analytics and history.',
      'A production build running locally with documented deployment requirements.',
    ],
    githubUrl: 'https://github.com/Eashan4/antigravity-tracker',
    domains: ['applications', 'data', 'cloud'],
  },
  {
    slug: 'facial-recognition',
    title: 'Real-Time Facial Recognition System',
    category: 'Computer Vision · Desktop',
    tier: 'flagship',
    platforms: ['Computer Vision', 'Desktop', 'AI System', 'Security'],
    year: '2025',
    status: 'Complete',
    shortDescription:
      'A desktop application that recognises faces from live camera feeds, tracks a person’s location across a premise, and keeps face-based entry records.',
    summary:
      'Python + OpenCV + the face_recognition library behind a Tkinter GUI: face-authenticated login, user enrolment from face images, live recognition that logs identity, location and time to SQLite, and a voice assistant layer.',
    problem:
      'Entry logging by card, biometric pad or manual register is slow and easy to bypass. Tracking where a known person currently is inside a building normally needs dedicated, expensive systems.',
    solution:
      'A single desktop application. Login is gated by face authentication; once past it, a unified GUI combines a face-entry system and a voice assistant. Operators enrol users with a name, roll number and face images. Starting the live feed recognises enrolled faces frame by frame, updates each recognised person’s location and timestamp in an SQLite database, and can be pointed at multiple cameras to follow someone across a premise.',
    architecture: {
      kind: 'Camera frames → detection → recognition → identity match → records',
      nodes: [
        {
          id: 'cam',
          label: 'Camera feed',
          stage: 0,
          role: 'Live capture from one or more connected cameras.',
          tech: 'OpenCV VideoCapture',
        },
        {
          id: 'detect',
          label: 'Face detection',
          stage: 1,
          role: 'Locate faces in each frame before attempting to identify them.',
          tech: 'face_recognition / dlib',
        },
        {
          id: 'encode',
          label: 'Encoding + match',
          stage: 2,
          role: 'Compute a face encoding and compare against the enrolled set to resolve an identity.',
          tech: 'face_recognition',
        },
        {
          id: 'db',
          label: 'Records',
          stage: 3,
          role: 'Write the recognised identity, camera location and timestamp to the USER table; the same table backs face-authenticated login.',
          tech: 'SQLite',
        },
        {
          id: 'ui',
          label: 'Operator GUI',
          stage: 4,
          role: 'Tkinter interface for enrolment, the live feed, the records view and the voice-assistant commands.',
          tech: 'Tkinter · pyttsx3',
        },
      ],
      edges: [
        { from: 'cam', to: 'detect' },
        { from: 'detect', to: 'encode' },
        { from: 'encode', to: 'db' },
        { from: 'db', to: 'ui' },
      ],
    },
    technologies: ['python', 'opencv', 'face-recognition', 'numpy', 'sqlite'],
    challenges: [
      'Keeping frame-by-frame recognition responsive enough for a live feed inside a single-threaded Tkinter app.',
      'Making face-authenticated login reliable enough to be the only thing standing between an operator and the system.',
      'Managing the enrolled face set and per-person location state in one small SQLite schema.',
    ],
    decisions: [
      'Ship as one cohesive desktop GUI rather than a set of scripts — enrolment, recognition, records and assistant in a single window.',
      'Use the face_recognition library’s encodings rather than training a bespoke model.',
      'Store location as the active camera identifier so multi-camera tracking is just another row.',
    ],
    results: [
      'Face-based entry records that replace cards and manual registers.',
      'Live location tracking of a known person across multiple camera feeds.',
      'A self-contained operator application with no server component.',
    ],
    githubUrl:
      'https://github.com/Eashan4/Real-Time-Facial-Recognition-System-with-Assistant',
    domains: ['intelligent', 'desktop', 'security'],
  },
  {
    slug: 'laboratory-management',
    title: 'Laboratory Management System',
    category: 'Web Application · DBMS',
    tier: 'flagship',
    platforms: ['Web', 'Data', 'Security'],
    year: '2025',
    status: 'Complete',
    shortDescription:
      'A web application for a medical laboratory: patients, doctors, appointments, tests, results, billing and inventory, on a JWT-secured REST API over MySQL.',
    summary:
      'Node + Express + MySQL with JWT auth and bcrypt password storage. A relational schema of eleven tables with triggers that automate id generation, logging, billing updates and data integrity, exposed through a protected CRUD API and a static frontend.',
    problem:
      'A medical lab runs on interlocking records — patients, doctors, appointments, a test catalogue, results, billing, technicians, inventory and quality-control notes. Kept in spreadsheets, those records drift out of sync and there is no audit trail.',
    solution:
      'A REST API backend over a normalised MySQL schema. Users register and log in for a JWT; every data route requires a bearer token. Database triggers do the work that application code often forgets: generating ids, writing log rows, updating billing when a result lands, and enforcing integrity across the eleven tables. A static HTML / CSS / JS frontend consumes the API.',
    architecture: {
      kind: 'Static frontend → JWT-gated REST API → MySQL with triggers',
      nodes: [
        {
          id: 'fe',
          label: 'Static frontend',
          stage: 0,
          role: 'HTML / CSS / JS interface that calls the API with a stored bearer token.',
          tech: 'Vanilla JS',
        },
        {
          id: 'auth',
          label: 'Auth layer',
          stage: 1,
          role: 'Register / login endpoints issue a JWT; middleware rejects any data request without a valid bearer token.',
          tech: 'JWT · bcrypt',
        },
        {
          id: 'api',
          label: 'Express REST API',
          stage: 2,
          role: 'CRUD endpoints for patients, doctors, appointments, tests, results, billing, inventory and quality-control notes.',
          tech: 'Node · Express',
        },
        {
          id: 'db',
          label: 'MySQL + triggers',
          stage: 3,
          role: 'Eleven-table relational schema; triggers automate id generation, logging, billing updates and integrity constraints.',
          tech: 'MySQL',
        },
      ],
      edges: [
        { from: 'fe', to: 'auth' },
        { from: 'auth', to: 'api', label: 'bearer' },
        { from: 'api', to: 'db' },
      ],
    },
    technologies: ['javascript', 'node', 'express', 'mysql', 'jwt', 'sql'],
    challenges: [
      'Designing an eleven-table schema that stays normalised while still answering the queries a lab front desk actually asks.',
      'Deciding what belongs in a database trigger versus application code — id generation, logging and billing updates went to triggers.',
      'Protecting every data route without making the static frontend awkward to use.',
    ],
    decisions: [
      'Push automation into SQL triggers so integrity holds even if a client misbehaves.',
      'Stateless JWT auth rather than server sessions.',
      'Keep the frontend static and dumb — all rules live behind the API.',
    ],
    results: [
      'A working DBMS-backed application covering the full lab record lifecycle.',
      'Automated billing and audit logging driven by the database itself.',
      'A documented REST API with protected CRUD across every entity.',
    ],
    githubUrl: 'https://github.com/Eashan4/Laboratory_managment-system-DBMS-',
    domains: ['applications', 'data', 'security'],
  },
  // ------------------------------------------------------------------ SYSTEMS
  {
    slug: 'bed-occupancy',
    title: 'Bed Occupancy & Patient Vital Monitoring',
    category: 'Healthcare IoT · Real-Time',
    tier: 'system',
    platforms: ['IoT', 'Embedded', 'Cloud', 'Web', 'AI System'],
    year: '2026',
    status: 'Active',
    shortDescription:
      'ESP8266 nodes track bed occupancy and vitals; a FastAPI backend runs anomaly detection and streams to a 3D ward dashboard over WebSockets.',
    summary:
      'MAX30100 pulse oximetry and an FSR bed-pressure sensor per node, a Python FastAPI + PostgreSQL backend with a rolling-statistics anomaly engine, JWT auth with roles, and a React + Three.js dashboard with a colour-coded 3D floor plan. Related to the published IEEE research.',
    problem:
      'Overcrowded wards face two problems at once: tracking which beds are free, and continuously watching vulnerable patients for sudden deterioration. Traditional monitors are bulky, single-room, and isolated from any central view.',
    solution:
      'Modular sensor nodes at each bed push JSON vitals to a FastAPI backend authenticated by a 64-character per-device API key. The backend stores readings in PostgreSQL via SQLAlchemy and evaluates each stream against clinical thresholds with rolling standard-deviation checks for erratic patterns and rapid drops. Every reading is broadcast on a WebSocket channel; alerts carry a severity level. A React 19 dashboard renders a Three.js floor plan with colour-coded beds, ECG-style waveforms and SpO2 gauges.',
    architecture: {
      kind: 'Edge nodes → API-key ingest → anomaly engine → WebSocket → 3D dashboard',
      nodes: [
        {
          id: 'node',
          label: 'Bed node',
          stage: 0,
          role: 'ESP8266 reads MAX30100 over I2C and an FSR 402 pressure sensor over ADC; auto-reconnects Wi-Fi and restarts the stack after repeated HTTP failures.',
          tech: 'ESP8266 · MAX30100 · FSR 402',
        },
        {
          id: 'ingest',
          label: 'Ingest + auth',
          stage: 1,
          role: 'FastAPI endpoint accepts JSON POSTs keyed by a unique 64-character device API key; a heartbeat every 20s marks devices offline if missed.',
          tech: 'FastAPI',
        },
        {
          id: 'engine',
          label: 'Anomaly engine',
          stage: 2,
          role: 'Evaluates vitals against clinical thresholds with rolling standard-deviation checks; generates severity-tagged alerts. Structured to accept an LSTM model later.',
          tech: 'Python',
        },
        {
          id: 'db',
          label: 'PostgreSQL',
          stage: 3,
          role: 'Throttled writes of devices, readings, alerts, patients, users and audit logs via SQLAlchemy ORM.',
          tech: 'PostgreSQL · SQLAlchemy',
        },
        {
          id: 'ws',
          label: 'WebSocket broadcast',
          stage: 4,
          role: 'Pushes every reading and alert to all connected dashboards for sub-second updates.',
          tech: 'WebSockets',
        },
        {
          id: 'dash',
          label: '3D ward dashboard',
          stage: 5,
          role: 'React 19 + Three.js floor plan with colour-coded beds, live ECG-style waveform and circular SpO2 gauge; JWT login with admin / nurse roles.',
          tech: 'React · Three.js',
        },
      ],
      edges: [
        { from: 'node', to: 'ingest', label: 'JSON POST' },
        { from: 'ingest', to: 'engine' },
        { from: 'engine', to: 'db' },
        { from: 'engine', to: 'ws' },
        { from: 'ws', to: 'dash' },
      ],
    },
    technologies: [
      'python',
      'fastapi',
      'postgres',
      'sqlalchemy',
      'websockets',
      'jwt',
      'react',
      'threejs',
      'esp8266',
      'max30102',
      'fsr',
      'docker',
    ],
    challenges: [
      'Keeping a WebSocket stream stable — the project documents a serverless deployment that falls back to HTTP polling because stateless functions cannot hold sockets.',
      'Making embedded nodes survive an unreliable ward network: auto Wi-Fi reconnect plus a stack restart after five consecutive HTTP failures.',
      'Designing an anomaly engine that is useful now as rules but ready to swap in an LSTM without reshaping the data flow.',
    ],
    decisions: [
      'Per-device 64-character API keys; embedded nodes never hold user credentials.',
      'Docker Compose (PostgreSQL + Uvicorn + Nginx) as the recommended deployment for guaranteed WebSocket stability on a hospital intranet.',
      'A dedicated audit-log table timestamping every administrative action.',
    ],
    results: [
      'An end-to-end ward monitoring pipeline from bed sensor to 3D nursing-station view.',
      'Scales toward 100+ concurrent devices with a modular architecture.',
      'Basis for the IEEE research paper on real-time bed occupancy and vital monitoring.',
    ],
    githubUrl: 'https://github.com/Eashan4/bed-occupancy-management',
    domains: ['connected', 'intelligent', 'cloud', 'research'],
  },
  {
    slug: 'smart-energy-meter',
    title: 'Smart Energy Meter',
    category: 'Embedded · Energy Monitoring',
    tier: 'system',
    platforms: ['Embedded', 'IoT', 'Web'],
    year: '2026',
    status: 'Complete',
    shortDescription:
      'An ESP32 reads a hardware energy meter over UART and serves a live web dashboard of voltage, current, power, energy, frequency and power factor — no cloud.',
    summary:
      'ESP32 + PZEM-004T v3.0 with electrically isolated measurement. The ESP32 hosts an HTTP server that serves JSON and a browser dashboard directly, with no Blynk, no third-party cloud and no mobile app.',
    problem:
      'Knowing real household or lab power consumption usually means trusting a vendor app and a cloud account. Abnormal usage goes unnoticed and the data is not yours.',
    solution:
      'The ESP32 talks to a PZEM-004T v3.0 hardware meter over UART and reads true RMS voltage, current, active power, accumulated energy, line frequency and power factor. It runs an HTTP server that serves both a JSON endpoint and a self-contained HTML / CSS / JS dashboard, so any browser on the network sees live readings. The PZEM keeps mains voltage electrically isolated from the microcontroller.',
    architecture: {
      kind: 'Isolated hardware meter → ESP32 → self-hosted web dashboard',
      nodes: [
        {
          id: 'pzem',
          label: 'PZEM-004T v3.0',
          stage: 0,
          role: 'Hardware energy meter measuring true RMS values with mains isolation from the logic side.',
          tech: 'PZEM-004T',
        },
        {
          id: 'esp',
          label: 'ESP32',
          stage: 1,
          role: 'Polls the meter over UART, formats readings as JSON, and hosts an HTTP server on the local network.',
          tech: 'ESP32 · UART',
        },
        {
          id: 'dash',
          label: 'Hosted dashboard',
          stage: 2,
          role: 'HTML / CSS / JS page served by the ESP32 itself; polls the JSON endpoint and renders live values on desktop or mobile browsers.',
          tech: 'Vanilla JS',
        },
      ],
      edges: [
        { from: 'pzem', to: 'esp', label: 'UART' },
        { from: 'esp', to: 'dash', label: 'HTTP / JSON' },
      ],
    },
    technologies: ['cpp', 'esp32', 'pzem', 'javascript'],
    challenges: [
      'Reliable UART framing with the PZEM-004T while also servicing HTTP requests on the same chip.',
      'Serving a usable dashboard from the flash of a microcontroller.',
      'Keeping the mains side safely isolated from the logic side.',
    ],
    decisions: [
      'Use a dedicated hardware metering IC rather than current-transformer maths on the ESP32.',
      'Self-host the dashboard — no Blynk, no external broker, no account.',
      'Expose a plain JSON endpoint so the data is portable.',
    ],
    results: [
      'Real-time voltage, current, power, energy, frequency and power-factor readout in any browser.',
      'Zero external dependencies or running costs.',
    ],
    githubUrl: 'https://github.com/Eashan4/Smart-Energy-Meter',
    domains: ['connected', 'data'],
  },
  {
    slug: 'fingerprint-door-lock',
    title: 'Fingerprint Door Lock System',
    category: 'Embedded · Biometric Access',
    tier: 'system',
    platforms: ['Embedded', 'IoT', 'Security'],
    year: '2026',
    status: 'Complete',
    shortDescription:
      'An ESP32 biometric lock: optical fingerprint enrolment and matching drives a relay, with buzzer feedback and an LCD status display.',
    summary:
      'ESP32 + an AS608-class optical fingerprint sensor. A serial admin menu enrols and deletes prints; a match releases a relay-controlled lock, with audio feedback and a 16×2 I2C LCD for status. Access data can be logged over IoT integration.',
    problem:
      'Physical keys are copyable and lost; keypad codes are shared and shoulder-surfed. A small deployment needs biometric access without a commercial access-control system.',
    solution:
      'The ESP32 drives an optical fingerprint sensor over a hardware serial port. An admin menu on the serial monitor handles enrolment, deletion and clearing the print store. On a successful match the ESP32 pulses a relay to release the lock, sounds an active buzzer, and updates a 16×2 I2C LCD; a failed match is rejected with distinct feedback.',
    architecture: {
      kind: 'Fingerprint capture → match → relay actuation + feedback',
      nodes: [
        {
          id: 'fp',
          label: 'Fingerprint sensor',
          stage: 0,
          role: 'Optical AS608-class sensor captures and templates a print, communicating over UART2.',
          tech: 'AS608 · UART',
        },
        {
          id: 'mcu',
          label: 'ESP32 controller',
          stage: 1,
          role: 'Runs enrolment / delete / clear admin commands and the match loop; decides unlock or reject.',
          tech: 'ESP32 · Arduino',
        },
        {
          id: 'act',
          label: 'Lock + feedback',
          stage: 2,
          role: 'Relay releases the door lock on a match; active buzzer and 16x2 I2C LCD report status either way.',
          tech: 'Relay · I2C LCD',
        },
      ],
      edges: [
        { from: 'fp', to: 'mcu', label: 'UART2' },
        { from: 'mcu', to: 'act', label: 'GPIO' },
      ],
    },
    technologies: ['cpp', 'esp32', 'arduino'],
    challenges: [
      'Stable UART2 communication with the fingerprint module alongside I2C to the LCD.',
      'A clear admin workflow over nothing but the serial monitor.',
      'Unambiguous physical feedback for accept versus reject.',
    ],
    decisions: [
      'Optical fingerprint templating on the sensor module rather than raw image processing on the ESP32.',
      'Relay-driven lock so the design works with common electric strikes.',
      'Keep an IoT logging hook without requiring a network to operate.',
    ],
    results: [
      'Keyless biometric entry with enrol / delete / clear administration.',
      'Local buzzer and LCD feedback with an optional access log.',
    ],
    githubUrl: 'https://github.com/Eashan4/Fingerprint-Door-Lock-System',
    domains: ['connected', 'security'],
  },
  {
    slug: 'heart-rate-monitoring',
    title: 'Patient Health Monitoring System',
    category: 'Health IoT · Vitals',
    tier: 'system',
    platforms: ['Embedded', 'IoT', 'Web'],
    year: '2026',
    status: 'Complete',
    shortDescription:
      'An ESP8266 reads pulse oximetry and environment sensors and serves a real-time web dashboard of heart rate, SpO2, temperature and humidity.',
    summary:
      'ESP8266 NodeMCU + MAX30100 pulse oximeter + DHT22. The board hosts its own web server and streams live vitals and room conditions to any browser for remote health tracking and early detection of abnormalities.',
    problem:
      'Spot-check vitals miss the moments between readings. Continuous tracking usually needs a bedside monitor that no one can see remotely.',
    solution:
      'An ESP8266 reads heart rate and blood-oxygen saturation from a MAX30100 over I2C and temperature and humidity from a DHT22. It runs an ESP8266WebServer that serves a dashboard page and updates readings in real time, so a carer can watch the vitals from another room or device.',
    architecture: {
      kind: 'Pulse + environment sensors → ESP8266 → hosted dashboard',
      nodes: [
        {
          id: 'sens',
          label: 'Sensors',
          stage: 0,
          role: 'MAX30100 pulse oximeter over I2C for heart rate and SpO2; DHT22 for temperature and humidity.',
          tech: 'MAX30100 · DHT22',
        },
        {
          id: 'esp',
          label: 'ESP8266 NodeMCU',
          stage: 1,
          role: 'Samples both sensors and runs an on-board web server.',
          tech: 'ESP8266',
        },
        {
          id: 'dash',
          label: 'Web dashboard',
          stage: 2,
          role: 'Real-time readout of BPM, SpO2, temperature and humidity in any connected browser.',
          tech: 'HTML · JS',
        },
      ],
      edges: [
        { from: 'sens', to: 'esp', label: 'I2C / 1-wire' },
        { from: 'esp', to: 'dash', label: 'HTTP' },
      ],
    },
    technologies: ['cpp', 'esp8266', 'max30102', 'javascript'],
    challenges: [
      'Getting a stable BPM / SpO2 reading from the MAX30100, which is sensitive to placement and motion.',
      'Serving a live dashboard from the ESP8266 without stalling sensor sampling.',
    ],
    decisions: [
      'On-board web server rather than a third-party IoT platform.',
      'Combine vitals and room environment in one view for context.',
    ],
    results: [
      'Continuous remote view of heart rate, SpO2, temperature and humidity.',
      'A self-contained monitor with no app to install.',
    ],
    githubUrl: 'https://github.com/Eashan4/Heart-Rate-Monitoring-System',
    domains: ['connected'],
  },
  // ------------------------------------------------------------------ ARCHIVE
  {
    slug: 'smartirrigate',
    title: 'SmartIrrigate',
    category: 'IoT · Automation',
    tier: 'archive',
    platforms: ['IoT', 'Web'],
    year: '2026',
    status: 'Prototype',
    shortDescription:
      'An early irrigation-automation experiment pairing sensor-driven watering logic with a simple web interface.',
    summary:
      'A prototype exploring soil / environment-driven irrigation control and a lightweight status page.',
    problem:
      'Fixed-schedule irrigation waters when it should not. A responsive system should react to conditions.',
    solution:
      'A small sensor-and-controller experiment with a minimal web page for status, kept as a learning prototype.',
    technologies: ['javascript', 'arduino'],
    challenges: [],
    decisions: [],
    results: [],
    githubUrl: 'https://github.com/Eashan4/SmartIrrigate',
    domains: ['connected'],
  },
  {
    slug: 'bfhl-node-hierarchy',
    title: 'BFHL Node Hierarchy Analyzer',
    category: 'Backend · Challenge',
    tier: 'archive',
    platforms: ['Web', 'Data'],
    year: '2026',
    status: 'Submitted',
    shortDescription:
      'A full-stack engineering-challenge solution: an Express API that parses edge lists into validated hierarchies with duplicate and cycle detection.',
    summary:
      'Built for the Bajaj Finserv Health full-stack challenge — a POST /bfhl endpoint that turns "A->B" edge strings into hierarchies and reports invalid entries and duplicate edges, with a small frontend.',
    problem:
      'The challenge: accept a list of parent-child edges and return structured hierarchies plus a summary of what was malformed.',
    solution:
      'An Express server validates each edge, builds hierarchy trees, and returns user identity fields alongside hierarchies, invalid entries, duplicate edges and a summary. A static frontend calls the endpoint. Configured for Vercel or Render deployment.',
    technologies: ['javascript', 'node', 'express'],
    challenges: [],
    decisions: [],
    results: [],
    githubUrl: 'https://github.com/Eashan4/bajaj-finserv-health-challenge',
    domains: ['applications', 'data'],
  },
  {
    slug: 'flask-portfolio-iot',
    title: 'Flask Portfolio + IoT Dashboard',
    category: 'Web · IoT',
    tier: 'archive',
    platforms: ['Web', 'IoT', 'Data'],
    year: '2025',
    status: 'Superseded',
    shortDescription:
      'An earlier portfolio built on Flask with a MySQL-backed admin panel and API endpoints for ESP8266 / ESP32 devices to post sensor data.',
    summary:
      'The previous version of this site: a Flask app with user auth, an admin panel for managing projects and devices, and a hardware API that ingested real-time data from microcontrollers.',
    problem:
      'A portfolio that also had to be a live IoT dashboard, with content managed through an admin UI rather than code.',
    solution:
      'Flask + MySQL with models for users, projects, contacts and hardware; routes for hardware ingestion; templates for the public site and an admin dashboard. Deployed as a Vercel serverless function.',
    technologies: ['python', 'flask', 'mysql', 'javascript'],
    challenges: [],
    decisions: [],
    results: [],
    githubUrl: 'https://github.com/Eashan4/portfolio_flask',
    domains: ['applications', 'connected'],
  },
]

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug)

export const flagshipProjects = projects.filter((p) => p.tier === 'flagship')
export const systemProjects = projects.filter((p) => p.tier === 'system')
export const archiveProjects = projects.filter((p) => p.tier === 'archive')
export const caseStudyProjects = projects.filter((p) => p.tier !== 'archive')
