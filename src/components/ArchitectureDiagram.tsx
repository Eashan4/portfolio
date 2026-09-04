import { Fragment, useMemo, useState } from 'react'
import type { Architecture } from '../data/types'
import styles from './ArchitectureDiagram.module.css'

/**
 * Interactive pipeline view of a project's real architecture. Nodes are grouped
 * into stages (columns on desktop, a vertical stack on mobile). Selecting a
 * node explains its role, its technology, and how it connects to the rest of
 * the system, and highlights its direct neighbours.
 *
 * Pure DOM + CSS — no canvas, reduced-motion safe, keyboard operable.
 */
export function ArchitectureDiagram({ arch }: { arch: Architecture }) {
  const [selected, setSelected] = useState(arch.nodes[0]?.id ?? '')

  const stages = useMemo(() => {
    const map = new Map<number, typeof arch.nodes>()
    for (const n of arch.nodes) {
      const list = map.get(n.stage) ?? []
      list.push(n)
      map.set(n.stage, list)
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([, v]) => v)
  }, [arch.nodes])

  const neighbours = useMemo(() => {
    const set = new Set<string>()
    for (const e of arch.edges) {
      if (e.from === selected) set.add(e.to)
      if (e.to === selected) set.add(e.from)
    }
    return set
  }, [arch.edges, selected])

  const node = arch.nodes.find((n) => n.id === selected)
  const nameOf = (id: string) =>
    arch.nodes.find((n) => n.id === id)?.label ?? id
  const incoming = arch.edges
    .filter((e) => e.to === selected)
    .map((e) => nameOf(e.from))
  const outgoing = arch.edges
    .filter((e) => e.from === selected)
    .map((e) => nameOf(e.to))

  return (
    <div>
      <p className={styles.kind}>{arch.kind}</p>

      <div className={styles.pipe}>
        {stages.map((group, gi) => (
          <Fragment key={gi}>
            <div className={styles.stage}>
              {group.map((n) => {
                const state =
                  n.id === selected
                    ? 'selected'
                    : neighbours.has(n.id)
                      ? 'connected'
                      : 'idle'
                return (
                  <button
                    key={n.id}
                    type="button"
                    className={styles.node}
                    data-state={state}
                    aria-pressed={n.id === selected}
                    onClick={() => setSelected(n.id)}
                  >
                    <span className={styles.nodeLabel}>{n.label}</span>
                    {n.tech && <small>{n.tech}</small>}
                  </button>
                )
              })}
            </div>
            {gi < stages.length - 1 && (
              <div className={styles.link} aria-hidden="true">
                <span className={styles.h}>→</span>
                <span className={styles.v}>↓</span>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {node && (
        <div className={styles.detail} aria-live="polite">
          <div className={styles.detailTop}>
            <span className={styles.detailName}>{node.label}</span>
            {node.tech && (
              <span className={styles.detailTech}>{node.tech}</span>
            )}
          </div>
          <p className={styles.detailRole}>{node.role}</p>
          <div className={styles.flow}>
            <span>
              <b>In:</b> {incoming.length ? incoming.join(', ') : '—'}
            </span>
            <span>
              <b>Out:</b> {outgoing.length ? outgoing.join(', ') : '—'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
