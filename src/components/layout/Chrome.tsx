import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { channels, channelIds } from '../../lib/channels'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { profile } from '../../data/profile'
import styles from './Chrome.module.css'

/** Navigate to a homepage section from anywhere, then smooth-scroll to it. */
function useGoToSection() {
  const navigate = useNavigate()
  const location = useLocation()
  return useCallback(
    (id: string) => {
      const scroll = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (location.pathname === '/') {
        scroll()
      } else {
        navigate('/')
        // let the route render before scrolling
        window.setTimeout(scroll, 60)
      }
    },
    [location.pathname, navigate],
  )
}

const NAV_ITEMS: { id: string; secondary?: boolean }[] = [
  { id: 'build', secondary: true },
  { id: 'ecosystem', secondary: true },
  { id: 'work' },
  { id: 'research' },
  { id: 'contact' },
]

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })
  return (
    <motion.div
      className={styles.progress}
      style={{ scaleX, width: '100%' }}
      aria-hidden="true"
    />
  )
}

export function Nav() {
  const go = useGoToSection()
  const location = useLocation()
  const active = useScrollSpy(
    location.pathname === '/' ? channelIds : [],
  )

  return (
    <nav className={styles.nav} aria-label="Primary">
      <button
        type="button"
        className={styles.brand}
        onClick={() => go('signal')}
      >
        <span className={styles.dot} />
        {profile.name}
      </button>
      <div className={styles.links}>
        {NAV_ITEMS.map(({ id, secondary }) => {
          const c = channels.find((ch) => ch.id === id)!
          return (
            <button
              key={id}
              type="button"
              className={styles.link}
              data-active={String(active === id)}
              data-secondary={secondary || undefined}
              onClick={() => go(id)}
            >
              {c.nav}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export function ChannelRail() {
  const go = useGoToSection()
  const location = useLocation()
  const active = useScrollSpy(
    location.pathname === '/' ? channelIds : [],
  )
  if (location.pathname !== '/') return null

  return (
    <div className={styles.rail} aria-hidden="true">
      <span className={styles.railTick} />
      {channels.map((c) => (
        <button
          key={c.id}
          type="button"
          className={styles.railItem}
          data-active={String(active === c.id)}
          tabIndex={-1}
          onClick={() => go(c.id)}
        >
          {c.ch}
        </button>
      ))}
      <span className={styles.railTick} />
    </div>
  )
}

export function Footer() {
  const go = useGoToSection()
  return (
    <footer className={styles.footer}>
      <span>
        © {new Date().getFullYear()} {profile.name} — built with React, R3F &amp;
        Vite
      </span>
      <div className={styles.footerLinks}>
        {profile.socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            {s.label}
          </a>
        ))}
        <button
          type="button"
          className={styles.railItem}
          style={{ writingMode: 'horizontal-tb', letterSpacing: '0.06em' }}
          onClick={() => go('signal')}
        >
          Top ↑
        </button>
      </div>
    </footer>
  )
}
