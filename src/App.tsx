import { lazy, Suspense } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'

// Route-level code splitting: each page (and its 3D payload) loads on demand.
const Home = lazy(() => import('./pages/Home.tsx'))
const Work = lazy(() => import('./pages/Work.tsx'))
const About = lazy(() => import('./pages/About.tsx'))

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'active' : undefined

export default function App() {
  return (
    <div className="app">
      <nav className="nav" aria-label="Primary">
        <NavLink to="/" className="brand" end>
          eashan.dev
        </NavLink>
        <NavLink to="/" className={navClass} end>
          Home
        </NavLink>
        <NavLink to="/work" className={navClass}>
          Work
        </NavLink>
        <NavLink to="/about" className={navClass}>
          About
        </NavLink>
      </nav>

      <main>
        <Suspense fallback={<p>Loading…</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

function NotFound() {
  return (
    <>
      <h1>Not found</h1>
      <p>
        That page doesn&rsquo;t exist. <NavLink to="/">Go home</NavLink>.
      </p>
    </>
  )
}
