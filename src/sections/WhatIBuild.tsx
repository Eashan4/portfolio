import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Section } from '../components/Section'
import { domains } from '../data/domains'
import { projectBySlug } from '../data/projects'
import { techById } from '../data/technologies'
import { channels } from '../lib/channels'
import { EASE } from '../lib/motion'
import type { DomainId } from '../data/types'
import styles from './sections.module.css'

const ch = channels.find((c) => c.id === 'build')!

export function WhatIBuild() {
  const [open, setOpen] = useState<DomainId | null>('connected')

  return (
    <Section
      id="build"
      channel={ch.ch}
      channelLabel={ch.label}
      eyebrow="Readout / What I Build"
      domains={ch.domains}
      title="Seven engineering domains, one system"
      lead="I don't work in one layer. Each domain below is backed by real projects — open one to see the capabilities, the tools, and the evidence."
    >
      <div className={styles.domainList}>
        {domains.map((d, idx) => {
          const isOpen = open === d.id
          return (
            <div key={d.id} className={styles.domainRow}>
              <button
                type="button"
                className={styles.domainButton}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : d.id)}
              >
                <span className={styles.domainIndex}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className={styles.domainName}>{d.label}</span>
                <span className={styles.domainToggle} aria-hidden="true">
                  {isOpen ? '–' : '+'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className={styles.domainPanel}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <div className={styles.domainPanelInner}>
                      <div>
                        <p className={styles.domainBlurb}>{d.blurb}</p>
                        <p className={styles.miniHead} style={{ marginTop: '1.2rem' }}>
                          Capabilities
                        </p>
                        <ul className={styles.chipRow}>
                          {d.capabilities.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                        <p className={styles.miniHead}>Technologies</p>
                        <ul className={styles.chipRow}>
                          {d.technologyIds.map((id) => (
                            <li key={id}>{techById(id)?.name ?? id}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className={styles.miniHead}>Evidence</p>
                        <ul className={styles.evidenceList}>
                          {d.projectSlugs.map((slug) => {
                            const p = projectBySlug(slug)
                            if (!p) return null
                            const body = (
                              <>
                                {p.title}
                                <span>{p.year}</span>
                              </>
                            )
                            return (
                              <li key={slug}>
                                {p.tier === 'archive' ? (
                                  <a
                                    href={p.githubUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                  >
                                    {body}
                                  </a>
                                ) : (
                                  <Link to={`/work/${p.slug}`}>{body}</Link>
                                )}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
