import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { PlatformTags } from '../components/ui'
import {
  flagshipProjects,
  systemProjects,
  archiveProjects,
} from '../data/projects'
import { channels } from '../lib/channels'
import { fadeUp } from '../lib/motion'
import type { Project } from '../data/types'
import styles from './sections.module.css'

const ch = channels.find((c) => c.id === 'work')!

function WorkRow({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div variants={fadeUp}>
      <Link to={`/work/${project.slug}`} className={styles.workRow}>
        <div className={styles.workRowTop}>
          <span className={styles.workIndex}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={styles.workTitle}>{project.title}</span>
          <span className={styles.workCategory}>{project.category}</span>
        </div>
        <p className={styles.workDesc}>{project.shortDescription}</p>
        <div className={styles.workMeta}>
          <PlatformTags items={project.platforms} />
          <span className={styles.workViewLink}>
            {project.year} · View case study →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export function FeaturedWork() {
  return (
    <Section
      id="work"
      channel={ch.ch}
      channelLabel={ch.label}
      eyebrow="Featured Work"
      domains={ch.domains}
      wide
      title="Real systems, classified by what they actually are"
      lead="Every project is tagged by delivery type — web, desktop, embedded, AI, IoT, cloud. Many are more than one."
    >
      {flagshipProjects.map((p, i) => (
        <WorkRow key={p.slug} project={p} index={i} />
      ))}

      <p className={styles.subsectionHead}>Systems &amp; Engineering</p>
      {systemProjects.map((p, i) => (
        <WorkRow key={p.slug} project={p} index={flagshipProjects.length + i} />
      ))}

      <p className={styles.subsectionHead}>Experiments &amp; Archive</p>
      <div className={styles.archiveList}>
        {archiveProjects.map((p) => (
          <a
            key={p.slug}
            href={p.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            {p.title} ↗
          </a>
        ))}
      </div>
    </Section>
  )
}
