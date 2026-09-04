import { useState } from 'react'
import { Section } from '../components/Section'
import { ButtonLink } from '../components/ui'
import { profile } from '../data/profile'
import { channels } from '../lib/channels'
import styles from './sections.module.css'

const ch = channels.find((c) => c.id === 'contact')!

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Section
      id="contact"
      channel={ch.ch}
      channelLabel={ch.label}
      eyebrow="Contact"
      domains={ch.domains}
      title="How to work with me"
    >
      <div className={styles.contactGrid}>
        <div>
          <p className={styles.contactBig}>
            Open to research collaborations and engineering roles.
          </p>
          <div className={styles.contactActions}>
            <ButtonLink href={`mailto:${profile.email}`} primary withArrow>
              {profile.email}
            </ButtonLink>
            <button
              type="button"
              className={styles.copyRow}
              data-copied={String(copied)}
              onClick={copy}
            >
              {copied ? 'Copied' : 'Copy email'}
            </button>
            {profile.resumeUrl && (
              <ButtonLink href={profile.resumeUrl} external>
                Résumé (PDF)
              </ButtonLink>
            )}
          </div>
        </div>

        <ul className={styles.contactList}>
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer noopener">
                {s.label}
                <span>{s.handle} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
