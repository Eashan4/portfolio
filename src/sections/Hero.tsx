import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Eyebrow } from '../components/ui'
import { EngineeringMap } from '../components/systemmap/EngineeringMap'
import { profile } from '../data/profile'
import { EASE, maskLine } from '../lib/motion'
import styles from './sections.module.css'

const HEAD_LINES = ['Building intelligent', 'software systems.']

export function Hero() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = window.setInterval(
      () => setI((v) => (v + 1) % profile.scopes.length),
      2600,
    )
    return () => window.clearInterval(t)
  }, [])

  return (
    <section id="signal" className={styles.hero} aria-labelledby="signal-title">
      <div className={styles.heroInner}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Eyebrow>Signal / Identity</Eyebrow>
        </motion.div>

        <h1 id="signal-title" className={styles.heroTitle}>
          {HEAD_LINES.map((line, li) => (
            <span key={line} className={styles.heroLine}>
              <motion.span
                variants={maskLine}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.15 + li * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className={styles.scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
        >
          <span>across</span>
          <span className={styles.scopeWord}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={profile.scopes[i]}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.28, ease: EASE }}
                style={{ display: 'inline-block' }}
              >
                {profile.scopes[i]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.p
          className={styles.heroTagline}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          {profile.tagline}
        </motion.p>

        <div className={styles.heroMeta}>
          <span>{profile.education.degree}</span>
          <span>{profile.education.school}</span>
          <span>{profile.location}</span>
        </div>

        <motion.div
          className={styles.heroMap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <EngineeringMap />
        </motion.div>
      </div>
    </section>
  )
}
