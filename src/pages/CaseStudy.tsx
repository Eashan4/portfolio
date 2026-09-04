import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArchitectureDiagram } from '../components/ArchitectureDiagram'
import { ButtonLink, Eyebrow, PlatformTags } from '../components/ui'
import { caseStudyProjects, projectBySlug } from '../data/projects'
import { techById } from '../data/technologies'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { fadeUp, inView } from '../lib/motion'
import type { ReactNode } from 'react'
import styles from './CaseStudy.module.css'

function Part({ label, children }: { label: string; children: ReactNode }) {
  return (
    <motion.section className={styles.part} variants={fadeUp} {...inView}>
      <p className={styles.partLabel}>{label}</p>
      <div className={styles.partBody}>{children}</div>
    </motion.section>
  )
}

export default function CaseStudy() {
  const { slug = '' } = useParams()
  const project = projectBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useDocumentMeta(
    project
      ? `${project.title} — Case study · Eashan Jain`
      : 'Case study · Eashan Jain',
    project?.shortDescription,
  )

  if (!project || project.tier === 'archive') {
    return <Navigate to="/#work" replace />
  }

  const idx = caseStudyProjects.findIndex((p) => p.slug === slug)
  const next = caseStudyProjects[(idx + 1) % caseStudyProjects.length]

  return (
    <div className={styles.wrap}>
      <Link to="/#work" className={styles.back}>
        ← All work
      </Link>

      <header className={styles.header}>
        <p className={styles.category}>{project.category}</p>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.short}>{project.shortDescription}</p>
        <div className={styles.headMeta}>
          <PlatformTags items={project.platforms} />
        </div>
        <div className={styles.headMeta}>
          <div className={styles.metaBits}>
            <span>{project.year}</span>
            <span>{project.status}</span>
          </div>
          <div className={styles.links}>
            {project.githubUrl && (
              <ButtonLink href={project.githubUrl} external withArrow>
                Source
              </ButtonLink>
            )}
            {project.liveUrl && (
              <ButtonLink href={project.liveUrl} external withArrow primary>
                Live
              </ButtonLink>
            )}
          </div>
        </div>
      </header>

      <Part label="The problem">
        <p>{project.problem}</p>
      </Part>

      <Part label="What I built">
        <p>{project.solution}</p>
      </Part>

      {project.architecture && (
        <Part label="How it works">
          <ArchitectureDiagram arch={project.architecture} />
        </Part>
      )}

      <Part label="Technology">
        <ul className={styles.list}>
          {project.technologies.map((id) => {
            const t = techById(id)
            return (
              <li key={id}>
                <strong>{t?.name ?? id}</strong>
                {t ? ` — ${t.purpose}` : ''}
              </li>
            )
          })}
        </ul>
      </Part>

      {project.challenges.length > 0 && (
        <Part label="Engineering challenges">
          <ul className={styles.list}>
            {project.challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Part>
      )}

      {project.decisions.length > 0 && (
        <Part label="Technical decisions">
          <ul className={styles.list}>
            {project.decisions.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Part>
      )}

      {project.results.length > 0 && (
        <Part label="Outcome">
          <ul className={styles.list}>
            {project.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Part>
      )}

      <div className={styles.nextRow}>
        <Link to="/#work">
          <span>Index</span>← All work
        </Link>
        <Link to={`/work/${next.slug}`} style={{ textAlign: 'right' }}>
          <span>Next</span>
          {next.title} →
        </Link>
      </div>

      <div style={{ marginTop: '2.5rem' }}>
        <Eyebrow>End of case study</Eyebrow>
      </div>
    </div>
  )
}
