import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../sections/Hero'
import { WhatIBuild } from '../sections/WhatIBuild'
import { TechnologyEcosystem } from '../sections/TechnologyEcosystem'
import { FeaturedWork } from '../sections/FeaturedWork'
import { Research } from '../sections/Research'
import { CurrentlyBuilding } from '../sections/CurrentlyBuilding'
import { Journey } from '../sections/Journey'
import { Contact } from '../sections/Contact'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Home() {
  const location = useLocation()
  useDocumentMeta(
    'Eashan Jain — Software & AI Systems Engineer',
    'Eashan Jain builds complete software and intelligent systems: full-stack applications, AI/ML and computer vision, IoT and embedded devices, cloud infrastructure, and data platforms. Published IEEE researcher.',
  )

  // support deep links like /#work coming from a case-study page
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) el.scrollIntoView({ block: 'start' })
    }
  }, [location.hash])

  return (
    <>
      <Hero />
      <WhatIBuild />
      <TechnologyEcosystem />
      <FeaturedWork />
      <Research />
      <CurrentlyBuilding />
      <Journey />
      <Contact />
    </>
  )
}
