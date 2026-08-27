import { Scene } from '../components/Scene.tsx'

const projects = [
  { title: 'Project One', blurb: 'Short description of the first project.' },
  { title: 'Project Two', blurb: 'Short description of the second project.' },
  { title: 'Project Three', blurb: 'Short description of the third project.' },
]

export default function Work() {
  return (
    <>
      <h1>Work</h1>
      <p>Selected projects. Swap these placeholders for real case studies.</p>

      <Scene label="Work showcase scene" />

      <ul data-testid="project-list">
        {projects.map((p) => (
          <li key={p.title}>
            <strong>{p.title}</strong> &mdash; {p.blurb}
          </li>
        ))}
      </ul>
    </>
  )
}
