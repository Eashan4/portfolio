/** Shared content types for the portfolio data layer. */

export type Platform =
  | 'Web'
  | 'Desktop'
  | 'Executable'
  | 'AI System'
  | 'Computer Vision'
  | 'Embedded'
  | 'IoT'
  | 'Cloud'
  | 'Data'
  | 'Security'
  | 'Hybrid'

export type DomainId =
  | 'intelligent'
  | 'applications'
  | 'desktop'
  | 'connected'
  | 'cloud'
  | 'data'
  | 'security'
  | 'research'

export type ProjectTier = 'flagship' | 'system' | 'archive'

export type ArchNode = {
  id: string
  label: string
  /** Which stage of the pipeline this node sits in (drives layout order). */
  stage: number
  /** What this component does and how it connects to the rest of the system. */
  role: string
  tech?: string
}

export type ArchEdge = {
  from: string
  to: string
  label?: string
}

export type Architecture = {
  /** One line naming the shape of the pipeline. */
  kind: string
  nodes: ArchNode[]
  edges: ArchEdge[]
}

export type Project = {
  slug: string
  title: string
  /** Short category shown as an eyebrow, e.g. "Edge AI · Healthcare". */
  category: string
  tier: ProjectTier
  platforms: Platform[]
  year: string
  status: string
  /** One sentence: what the system does. */
  shortDescription: string
  /** Longer teaser used on index rows. */
  summary: string
  problem: string
  solution: string
  architecture?: Architecture
  /** Technology ids (see technologies.ts) actually used in the project. */
  technologies: string[]
  challenges: string[]
  decisions: string[]
  results: string[]
  githubUrl?: string
  liveUrl?: string
  /** Domains this project is evidence for. */
  domains: DomainId[]
}

export type Domain = {
  id: DomainId
  label: string
  /** One-word label for the map node and other tight spots. */
  short: string
  /** Telemetry-style eyebrow, e.g. "READOUT / 01". */
  index: string
  blurb: string
  capabilities: string[]
  technologyIds: string[]
  projectSlugs: string[]
}

export type Technology = {
  id: string
  name: string
  category:
    | 'Language'
    | 'Frontend'
    | 'Backend'
    | 'AI/ML'
    | 'Data'
    | 'IoT / Hardware'
    | 'Cloud / Infra'
    | 'Tooling'
  /** What Eashan uses it for — evidence-based, tied to real projects. */
  purpose: string
  projectSlugs: string[]
}

export type JourneyStage = {
  key: string
  label: string
  period: string
  headline: string
  detail: string
  markers: string[]
}

export type Certification = {
  name: string
  issuer: string
  year?: string
}

export type Achievement = {
  name: string
  context: string
  detail: string
}

export type Publication = {
  title: string
  publisher: string
  author: string
  status: string
  url: string
  /** Conservative paraphrase of the title's own scope. No invented claims. */
  summary: string
  /** Visible caveat that full metadata is pending. */
  note: string
  /** Methods that also run through the engineering work. */
  sharedMethods: string[]
  relatedProjectSlugs: string[]
}
