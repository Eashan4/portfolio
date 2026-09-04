import { Section } from '../components/Section'
import { profile } from '../data/profile'
import { channels } from '../lib/channels'
import styles from './sections.module.css'

const ch = channels.find((c) => c.id === 'current')!

export function CurrentlyBuilding() {
  const { currentlyBuilding: c } = profile
  return (
    <Section
      id="current"
      channel={ch.ch}
      channelLabel={ch.label}
      eyebrow="Currently Building"
      domains={ch.domains}
      title="Current direction"
      lead="What has my attention right now."
    >
      <p className={styles.statusLine}>
        <span className={styles.statusPulse} aria-hidden="true" />
        Status · {c.status}
      </p>
      <ul className={styles.focusList}>
        {c.focus.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p className={styles.currentNote}>{c.note}</p>
    </Section>
  )
}
