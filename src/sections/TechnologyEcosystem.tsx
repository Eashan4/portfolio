import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../components/Section'
import {
  techCategories,
  technologies,
  techById,
} from '../data/technologies'
import { projectBySlug, caseStudyProjects } from '../data/projects'
import { channels } from '../lib/channels'
import styles from './sections.module.css'

const ch = channels.find((c) => c.id === 'ecosystem')!

export function TechnologyEcosystem() {
  // selection can be a tech id or a project slug
  const [sel, setSel] = useState<{ kind: 'tech' | 'project'; id: string }>({
    kind: 'tech',
    id: 'pytorch',
  })

  const activeTech =
    sel.kind === 'tech' ? techById(sel.id) : undefined
  const activeProject =
    sel.kind === 'project' ? projectBySlug(sel.id) : undefined

  /** which tech ids are lit given the current selection */
  const litTech = useMemo(() => {
    if (sel.kind === 'tech') return new Set([sel.id])
    const p = projectBySlug(sel.id)
    return new Set(p?.technologies ?? [])
  }, [sel])

  return (
    <Section
      id="ecosystem"
      channel={ch.ch}
      channelLabel={ch.label}
      eyebrow="Technology Ecosystem"
      domains={ch.domains}
      title="Skills, connected to the work that proves them"
      lead="No proficiency bars. Select a technology to see where it is used and why — or select a project to light up its stack."
    >
      <div className={styles.ecoLayout}>
        <div>
          {techCategories.map((cat) => {
            const items = technologies.filter((t) => t.category === cat)
            if (!items.length) return null
            return (
              <div key={cat} className={styles.ecoGroup}>
                <p className={styles.ecoGroupHead}>{cat}</p>
                <div className={styles.techGrid}>
                  {items.map((t) => {
                    const state =
                      litTech.has(t.id)
                        ? 'active'
                        : sel.kind === 'project'
                          ? 'dim'
                          : 'idle'
                    return (
                      <button
                        key={t.id}
                        type="button"
                        className={styles.techChip}
                        data-state={state}
                        onClick={() => setSel({ kind: 'tech', id: t.id })}
                      >
                        {t.name}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}

          <p className={styles.ecoGroupHead} style={{ marginTop: '1.5rem' }}>
            Projects
          </p>
          <div className={styles.techGrid}>
            {caseStudyProjects.map((p) => (
              <button
                key={p.slug}
                type="button"
                className={styles.techChip}
                data-state={
                  sel.kind === 'project' && sel.id === p.slug
                    ? 'active'
                    : 'idle'
                }
                onClick={() => setSel({ kind: 'project', id: p.slug })}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        <aside className={styles.ecoPanel} aria-live="polite">
          {activeTech && (
            <>
              <p className={styles.ecoPanelName}>{activeTech.name}</p>
              <p className={styles.ecoPanelCat}>{activeTech.category}</p>
              <p className={styles.ecoPanelPurpose}>{activeTech.purpose}</p>
              <p className={styles.ecoGroupHead} style={{ marginTop: '1.2rem' }}>
                Used in
              </p>
              <div className={styles.ecoUsedIn}>
                {activeTech.projectSlugs.length ? (
                  activeTech.projectSlugs.map((slug) => {
                    const p = projectBySlug(slug)
                    if (!p) return null
                    return p.tier === 'archive' ? (
                      <a
                        key={slug}
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {p.title}
                      </a>
                    ) : (
                      <Link key={slug} to={`/work/${p.slug}`}>
                        {p.title}
                      </Link>
                    )
                  })
                ) : (
                  <span className="none">
                    Part of my toolkit; not yet in a listed project.
                  </span>
                )}
              </div>
            </>
          )}
          {activeProject && (
            <>
              <p className={styles.ecoPanelName}>{activeProject.title}</p>
              <p className={styles.ecoPanelCat}>{activeProject.category}</p>
              <p className={styles.ecoPanelPurpose}>
                {activeProject.shortDescription}
              </p>
              <p className={styles.ecoGroupHead} style={{ marginTop: '1.2rem' }}>
                Stack
              </p>
              <div className={styles.ecoUsedIn}>
                {activeProject.technologies.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={styles.techChip}
                    style={{ marginRight: '0.35rem', marginBottom: '0.35rem' }}
                    onClick={() => setSel({ kind: 'tech', id })}
                  >
                    {techById(id)?.name ?? id}
                  </button>
                ))}
              </div>
              {activeProject.tier !== 'archive' && (
                <Link
                  to={`/work/${activeProject.slug}`}
                  className={styles.workViewLink}
                  style={{ display: 'inline-block', marginTop: '1.2rem' }}
                >
                  Open case study →
                </Link>
              )}
            </>
          )}
        </aside>
      </div>
    </Section>
  )
}
