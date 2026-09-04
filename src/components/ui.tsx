import type { ReactNode } from 'react'
import styles from './ui.module.css'

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className={styles.eyebrow}>{children}</span>
}

export function PlatformTags({
  items,
  active,
}: {
  items: readonly string[]
  active?: string
}) {
  return (
    <ul className={styles.tags}>
      {items.map((it) => (
        <li
          key={it}
          className={styles.pill}
          data-active={active ? String(it === active) : undefined}
        >
          {it}
        </li>
      ))}
    </ul>
  )
}

export function ArrowRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.arrow}>
      <path
        d="M2 8h11M9 3l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

type LinkBtnProps = {
  href: string
  children: ReactNode
  primary?: boolean
  external?: boolean
  withArrow?: boolean
}

export function ButtonLink({
  href,
  children,
  primary,
  external,
  withArrow,
}: LinkBtnProps) {
  return (
    <a
      className={`${styles.btn} ${primary ? styles.btnPrimary : ''}`}
      href={href}
      {...(external
        ? { target: '_blank', rel: 'noreferrer noopener' }
        : {})}
    >
      {children}
      {withArrow && <ArrowRight />}
    </a>
  )
}
