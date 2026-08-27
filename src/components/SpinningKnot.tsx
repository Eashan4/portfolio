import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

type Props = {
  /** When false, the mesh holds a static pose (reduced-motion). */
  animate: boolean
  color?: string
}

export function SpinningKnot({ animate, color = '#6ea8fe' }: Props) {
  const mesh = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!animate || !mesh.current) return
    mesh.current.rotation.x += delta * 0.4
    mesh.current.rotation.y += delta * 0.6
  })

  return (
    <mesh ref={mesh} rotation={[0.3, 0.2, 0]}>
      <torusKnotGeometry args={[0.9, 0.28, 128, 24]} />
      <meshStandardMaterial color={color} roughness={0.25} metalness={0.6} />
    </mesh>
  )
}
