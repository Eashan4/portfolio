import { domains } from '../data/domains'
import type { DomainId } from '../data/types'

/**
 * The 8-node engineering rosette in miniature. Reused on every channel marker,
 * lighting the domain(s) that channel is about — a recurring echo of the
 * signature Engineering Map.
 */
export function Rosette({
  active = [],
  size = 18,
}: {
  active?: DomainId[]
  size?: number
}) {
  const r = size / 2
  const ring = r - 2.5
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={{ flex: 'none' }}
    >
      <circle cx={r} cy={r} r={ring} fill="none" stroke="var(--line-strong)" />
      {domains.map((d, i) => {
        const a = (i / domains.length) * Math.PI * 2 - Math.PI / 2
        const cx = r + Math.cos(a) * ring
        const cy = r + Math.sin(a) * ring
        const on = active.includes(d.id)
        return (
          <circle
            key={d.id}
            cx={cx}
            cy={cy}
            r={on ? 2 : 1.3}
            fill={on ? 'var(--signal)' : 'var(--muted-2)'}
          />
        )
      })}
      <circle cx={r} cy={r} r={1.5} fill="var(--fg)" />
    </svg>
  )
}
