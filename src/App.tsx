import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import {
  ChannelRail,
  Footer,
  Nav,
  ScrollProgress,
} from './components/layout/Chrome'
import { Eyebrow, ButtonLink } from './components/ui'

const Home = lazy(() => import('./pages/Home.tsx'))
const CaseStudy = lazy(() => import('./pages/CaseStudy.tsx'))

function RouteFallback() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--muted-2)',
      }}
    >
      Loading…
    </div>
  )
}

function NotFound() {
  return (
    <div
      style={{
        width: 'min(100% - 3rem, 40rem)',
        margin: '0 auto',
        padding: '6rem 0',
      }}
    >
      <Eyebrow>Error / 404</Eyebrow>
      <h1 style={{ margin: '1rem 0 1.5rem' }}>Signal lost.</h1>
      <p style={{ marginBottom: '2rem' }}>
        That page isn’t on this system. Head back to the start.
      </p>
      <ButtonLink href="/" primary withArrow>
        Return home
      </ButtonLink>
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <ChannelRail />
      <Nav />
      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Analytics />
    </MotionConfig>
  )
}
