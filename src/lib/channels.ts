import type { DomainId } from '../data/types'

/** The homepage signal chain — CH.01 → CH.08. One source of truth for the
 *  nav, the left rail, and the sections themselves. */
export type Channel = {
  id: string
  ch: string
  /** shown on the section hairline */
  label: string
  /** shown in the nav */
  nav: string
  domains: DomainId[]
}

export const channels: Channel[] = [
  {
    id: 'signal',
    ch: 'CH.01',
    label: 'Signal / Identity',
    nav: 'Identity',
    domains: [],
  },
  {
    id: 'build',
    ch: 'CH.02',
    label: 'Readout / What I Build',
    nav: 'What I Build',
    domains: [
      'intelligent',
      'applications',
      'desktop',
      'connected',
      'cloud',
      'data',
      'security',
      'research',
    ],
  },
  {
    id: 'ecosystem',
    ch: 'CH.03',
    label: 'Technology Ecosystem',
    nav: 'Technology',
    domains: ['intelligent', 'applications', 'connected', 'data'],
  },
  {
    id: 'work',
    ch: 'CH.04',
    label: 'Featured Work',
    nav: 'Work',
    domains: ['intelligent', 'applications', 'connected', 'desktop'],
  },
  {
    id: 'research',
    ch: 'CH.05',
    label: 'Research & Publication',
    nav: 'Research',
    domains: ['research', 'intelligent', 'connected'],
  },
  {
    id: 'current',
    ch: 'CH.06',
    label: 'Currently Building',
    nav: 'Current',
    domains: ['intelligent', 'connected', 'cloud'],
  },
  {
    id: 'journey',
    ch: 'CH.07',
    label: 'Journey',
    nav: 'Journey',
    domains: ['applications', 'intelligent', 'connected', 'cloud', 'research'],
  },
  {
    id: 'contact',
    ch: 'CH.08',
    label: 'Contact',
    nav: 'Contact',
    domains: [],
  },
]

export const channelIds = channels.map((c) => c.id)
