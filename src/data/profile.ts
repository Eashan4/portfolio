/** Personal information. Edit here — nothing else references these strings. */

export const profile = {
  name: 'Eashan Jain',
  /** Rotating scope words after "BUILDING INTELLIGENT SOFTWARE SYSTEMS." */
  scopes: [
    'AI systems',
    'embedded devices',
    'cloud services',
    'data pipelines',
    'desktop software',
    'interfaces',
  ],
  tagline:
    'I build complete software and intelligent systems — from interfaces and applications to AI models, cloud infrastructure, embedded devices, and data platforms.',
  location: 'Chennai, India',
  education: {
    degree: 'B.Tech, Computer Science (Big Data Analytics)',
    school: 'SRM Institute of Science and Technology',
    period: 'Expected 2027',
  },
  roles: [
    {
      title: 'Research Assistant — AI & Data Analytics',
      org: 'SRM Institute of Science and Technology',
      period: 'Current',
    },
    {
      title: 'Technology & Product Development Intern',
      org: 'Capsule Corporations',
      period: 'Apr–Jul 2026',
    },
  ],
  email: 'eashanjain.alwar@gmail.com',
  /** Drop a file at public/resume.pdf and set this to '/resume.pdf' to show
   *  the résumé button. Empty = button hidden. */
  resumeUrl: '',
  socials: [
    { label: 'GitHub', handle: 'Eashan4', url: 'https://github.com/Eashan4' },
    {
      label: 'LinkedIn',
      handle: 'eashan-jain',
      url: 'https://www.linkedin.com/in/eashan-jain-903a10291/',
    },
    {
      label: 'IEEE Xplore',
      handle: 'Publication',
      url: 'https://ieeexplore.ieee.org/document/11581943',
    },
  ],
  /** CH.06 — easy to keep current. */
  currentlyBuilding: {
    status: 'BUILDING',
    focus: [
      'Edge-AI on microcontrollers — models that run in firmware, not on a server',
      'Real-time healthcare monitoring pipelines (sensor → model → dashboard)',
      'Production frontend systems with disciplined motion',
      'Containerised deployment for the backends behind them',
    ],
    note: 'Research Assistant work in AI & Data Analytics runs alongside these.',
  },
} as const
