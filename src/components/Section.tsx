import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Eyebrow } from './ui'
import { Rosette } from './Rosette'
import { fadeUp, inView, stagger } from '../lib/motion'
import type { DomainId } from '../data/types'
import styles from './Section.module.css'

type Props = {
  id: string
  channel: string
  channelLabel: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  domains?: DomainId[]
  wide?: boolean
  children: ReactNode
}

export function Section({
  id,
  channel,
  channelLabel,
  eyebrow,
  title,
  lead,
  domains = [],
  wide = false,
  children,
}: Props) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.marker} aria-hidden="true">
        <span className={styles.ch}>{channel}</span>
        <span className={styles.markerLabel}>
          <Rosette active={domains} />
        </span>
        <span className={styles.markerLabel}>{channelLabel}</span>
      </div>

      <motion.div
        className={styles.inner}
        data-wide={wide || undefined}
        variants={stagger}
        {...inView}
      >
        <div className={styles.head} data-wide={wide || undefined}>
          <motion.div variants={fadeUp}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h2 id={`${id}-title`} className={styles.title} variants={fadeUp}>
            {title}
          </motion.h2>
          {lead && (
            <motion.p className={styles.lead} variants={fadeUp}>
              {lead}
            </motion.p>
          )}
        </div>
        <div className={styles.body}>{children}</div>
      </motion.div>
    </section>
  )
}
