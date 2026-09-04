import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import {
  achievements,
  certifications,
  journey,
} from '../data/experience'
import { channels } from '../lib/channels'
import { fadeUp } from '../lib/motion'
import styles from './sections.module.css'

const ch = channels.find((c) => c.id === 'journey')!

export function Journey() {
  return (
    <Section
      id="journey"
      channel={ch.ch}
      channelLabel={ch.label}
      eyebrow="Journey"
      domains={ch.domains}
      title="Progression through increasing complexity"
      lead="Not a resume timeline — a path from first principles to published research, ordered by depth."
    >
      {journey.map((s) => (
        <motion.div key={s.key} className={styles.stage} variants={fadeUp}>
          <div className={styles.stageLabel}>
            <b>{s.label}</b>
            <span>{s.period}</span>
          </div>
          <div>
            <p className={styles.stageHeadline}>{s.headline}</p>
            <p className={styles.stageDetail}>{s.detail}</p>
            <ul className={styles.stageMarkers}>
              {s.markers.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}

      <div className={styles.credGrid}>
        <div className={styles.credCol}>
          <h4>Research</h4>
          <ul>
            <li className={styles.credItem}>
              <b>Published IEEE paper</b>
              <span>See CH.05 — Research &amp; Publication</span>
            </li>
            <li className={styles.credItem}>
              <b>Research Assistant — AI &amp; Data Analytics</b>
              <span>SRM Institute of Science and Technology</span>
            </li>
          </ul>
        </div>
        <div className={styles.credCol}>
          <h4>Certifications</h4>
          <ul>
            {certifications.map((c) => (
              <li key={c.name} className={styles.credItem}>
                <b>{c.name}</b>
                <span>
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.credCol}>
          <h4>Achievements</h4>
          <ul>
            {achievements.map((a) => (
              <li key={a.name} className={styles.credItem}>
                <b>{a.name}</b>
                <span>
                  {a.context} — {a.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
