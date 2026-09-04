import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import { ButtonLink } from '../components/ui'
import { publication } from '../data/research'
import { projectBySlug } from '../data/projects'
import { channels } from '../lib/channels'
import styles from './sections.module.css'

const ch = channels.find((c) => c.id === 'research')!

export function Research() {
  return (
    <Section
      id="research"
      channel={ch.ch}
      channelLabel={ch.label}
      eyebrow="Research & Publication"
      domains={ch.domains}
      title="A published contribution, not just implementations"
      lead="The work goes past building. One paper is published in IEEE Xplore; the methods behind it run through the engineering too."
    >
      <article className={styles.pubCard}>
        <div className={styles.pubKicker}>
          <span>Publication 01</span>
          <span>{publication.status}</span>
        </div>
        <h3 className={styles.pubTitle}>{publication.title}</h3>
        <p className={styles.pubAuthor}>
          {publication.author} · {publication.publisher}
        </p>
        <p className={styles.pubSummary}>{publication.summary}</p>
        <p className={styles.pubNote}>{publication.note}</p>
        <div className={styles.pubActions}>
          <ButtonLink href={publication.url} primary external withArrow>
            Read publication
          </ButtonLink>
        </div>
      </article>

      <div className={styles.connections}>
        <div className={styles.connCol}>
          <p className={styles.connColHead}>Research</p>
          <ul>
            <li>{publication.title}</li>
          </ul>
        </div>
        <div className={styles.connCol}>
          <p className={styles.connColHead}>Shared methods</p>
          <ul>
            {publication.sharedMethods.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div className={styles.connCol}>
          <p className={styles.connColHead}>In the engineering</p>
          <ul>
            {publication.relatedProjectSlugs.map((slug) => {
              const p = projectBySlug(slug)
              if (!p) return null
              return (
                <li key={slug}>
                  <Link to={`/work/${p.slug}`}>{p.title}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Section>
  )
}
