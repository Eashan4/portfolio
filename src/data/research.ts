import type { Publication } from './types'

/**
 * Published IEEE paper.
 *
 * Only verified facts appear here: the title and the IEEE Xplore link come from
 * Eashan's own GitHub profile; the author is Eashan Jain. Venue, year, the full
 * author list and the abstract are NOT yet published anywhere retrievable, so
 * they are deliberately omitted rather than guessed. `summary` is a conservative
 * paraphrase of the title's own scope — no methods, metrics or results are
 * claimed. Update `note` and add fields once the full record is available.
 */
export const publication: Publication = {
  title: 'AI-Powered Fuel Fraud Detection & Transparency System',
  publisher: 'IEEE',
  author: 'Eashan Jain',
  status: 'Published · IEEE Xplore',
  url: 'https://ieeexplore.ieee.org/document/11581943',
  summary:
    'Published research on applying machine learning to detect fraud in fuel dispensing and supply, and to make those transactions more transparent and auditable.',
  note: 'Full abstract, venue and citation details will be added here.',
  sharedMethods: [
    'Anomaly detection on real-world signals',
    'ML classification from sensor and transaction data',
    'Auditable, transparent system design',
    'Edge / IoT telemetry',
  ],
  relatedProjectSlugs: [
    'smart-hospital-queue',
    'smarthealth-ai',
    'bed-occupancy',
  ],
}
