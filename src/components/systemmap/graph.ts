import { domains } from '../../data/domains'
import type { DomainId } from '../../data/types'

export const RING_RADIUS = 2.25

export type GraphNode = {
  id: DomainId
  label: string
  short: string
  /** unit position on the ring, z = 0 */
  x: number
  y: number
}

export const graphNodes: GraphNode[] = domains.map((d, i) => {
  const a = (i / domains.length) * Math.PI * 2 - Math.PI / 2
  return {
    id: d.id,
    label: d.label,
    short: d.short,
    x: Math.cos(a) * RING_RADIUS,
    y: -Math.sin(a) * RING_RADIUS,
  }
})

export const nodeById = (id: DomainId) => graphNodes.find((n) => n.id === id)!
