import { lazy, useState } from 'react'
import { Link } from 'react-router-dom'
import { Scene } from '../Scene.tsx'
import { graphNodes } from './graph'
import { domains, domainById } from '../../data/domains'
import { projectBySlug } from '../../data/projects'
import { techById } from '../../data/technologies'
import type { DomainId } from '../../data/types'
import styles from './EngineeringMap.module.css'

const MapScene = lazy(() => import('./MapScene.tsx'))

// Frustum half-size at the ring plane for the MapScene camera (fov 42°, z 6.4):
// tan(21°) * 6.4. DOM node labels are placed with the same normalisation so
// they sit exactly on their 3D dots.
const NORM = Math.tan((42 / 2) * (Math.PI / 180)) * 6.4

export function EngineeringMap() {
  const [selected, setSelected] = useState<DomainId>('intelligent')
  const [hovered, setHovered] = useState<DomainId | null>(null)

  const domain = domainById(selected)!
  const domainIndex = domains.findIndex((d) => d.id === selected) + 1

  return (
    <div className={styles.wrap}>
      <div className={styles.stageCol}>
        <div className={styles.canvasHolder}>
          <Scene
            label="Engineering map"
            staticFallback={<div className={styles.grid} />}
          >
            {(active) => (
              <MapScene active={active} emphasis={hovered ?? selected} />
            )}
          </Scene>
        </div>

        <div className={styles.center}>
          Eashan Jain
          <span>system</span>
        </div>

        {graphNodes.map((n) => {
          // 46 (not 50) keeps the label pill just inside the stage edges
          const left = 50 + (n.x / NORM) * 46
          const top = 50 + (n.y / NORM) * 46
          return (
            <button
              key={n.id}
              type="button"
              className={styles.node}
              style={{ left: `${left}%`, top: `${top}%` }}
              data-selected={String(selected === n.id)}
              aria-pressed={selected === n.id}
              onClick={() => setSelected(n.id)}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(n.id)}
              onBlur={() => setHovered(null)}
            >
              {n.short}
            </button>
          )
        })}
      </div>

      <div className={styles.panel} aria-live="polite">
        <div className={styles.panelHead}>
          <span className={styles.panelIndex}>
            Domain {String(domainIndex).padStart(2, '0')} / 08
          </span>
          <span className={styles.panelIndex} style={{ color: 'var(--muted-2)' }}>
            {domain.index}
          </span>
        </div>
        <h3 className={styles.panelTitle} style={{ marginTop: '0.9rem' }}>
          {domain.label}
        </h3>
        <p className={styles.panelBlurb}>{domain.blurb}</p>

        <p className={styles.subhead}>Capabilities</p>
        <ul className={styles.caps}>
          {domain.capabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <p className={styles.subhead}>Technologies</p>
        <ul className={styles.caps}>
          {domain.technologyIds.map((id) => (
            <li key={id}>{techById(id)?.name ?? id}</li>
          ))}
        </ul>

        <p className={styles.subhead}>Evidence</p>
        <ul className={styles.projList}>
          {domain.projectSlugs.map((slug) => {
            const p = projectBySlug(slug)
            if (!p) return null
            const inner = (
              <>
                {p.title}
                <span>{p.platforms[0]}</span>
              </>
            )
            return (
              <li key={slug}>
                {p.tier === 'archive' ? (
                  <a
                    className={styles.projLink}
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {inner}
                  </a>
                ) : (
                  <Link className={styles.projLink} to={`/work/${p.slug}`}>
                    {inner}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
