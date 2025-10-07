import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box, Sphere, Plane } from '@react-three/drei'
import { useState, useRef } from 'react'
import type { Mesh } from 'three'
import './App.css'

export interface CatsAppProps {
  title?: string
  scene?: 'cats' | 'playground' | 'space'
  enableVR?: boolean
  enableAR?: boolean
  className?: string
}

function CatModel({ position = [0, 0, 0], color = 'orange' }: { position?: [number, number, number], color?: string }) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <group position={position}>
      {/* Cat body */}
      <Sphere
        ref={meshRef}
        args={[0.8, 16, 16]}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => {
          if (meshRef.current) {
            meshRef.current.rotation.y += Math.PI / 4
          }
        }}
      >
        <meshStandardMaterial color={hovered ? 'hotpink' : color} />
      </Sphere>
      
      {/* Cat ears */}
      <Box args={[0.2, 0.4, 0.1]} position={[-0.3, 0.6, 0.3]}>
        <meshStandardMaterial color={color} />
      </Box>
      <Box args={[0.2, 0.4, 0.1]} position={[0.3, 0.6, 0.3]}>
        <meshStandardMaterial color={color} />
      </Box>
      
      {/* Cat tail */}
      <Box args={[0.1, 0.1, 1]} position={[0, 0.2, -0.8]} rotation={[0.3, 0, 0]}>
        <meshStandardMaterial color={color} />
      </Box>
    </group>
  )
}

function CatsScene({ scene = 'cats' }: { scene: CatsAppProps['scene'] }) {
  switch (scene) {
    case 'space':
      return (
        <>
          <color attach="background" args={['#000014']} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} />
          <CatModel position={[0, 0, 0]} color="white" />
          <CatModel position={[3, 1, -2]} color="gray" />
          <CatModel position={[-3, -1, -1]} color="black" />
          {/* Stars */}
          {Array.from({ length: 100 }).map((_, i) => (
            <Sphere
              key={i}
              args={[0.02]}
              position={[
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 50
              ]}
            >
              <meshBasicMaterial color="white" />
            </Sphere>
          ))}
        </>
      )
    
    case 'playground':
      return (
        <>
          <color attach="background" args={['#87CEEB']} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} />
          
          {/* Ground */}
          <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <meshStandardMaterial color="lightgreen" />
          </Plane>
          
          {/* Multiple cats */}
          <CatModel position={[0, 0, 0]} color="orange" />
          <CatModel position={[2, 0, -1]} color="black" />
          <CatModel position={[-2, 0, 1]} color="white" />
          <CatModel position={[0, 0, -3]} color="gray" />
        </>
      )
    
    default: // 'cats'
      return (
        <>
          <color attach="background" args={['#ffd700']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <CatModel position={[0, 0, 0]} color="orange" />
        </>
      )
  }
}

function App({ title = "🐱 Cats XR", scene = 'cats', enableVR = true, enableAR = false, className }: CatsAppProps) {
  const [currentScene, setCurrentScene] = useState(scene)

  return (
    <div className={className} style={{ width: '100%', height: '500px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, color: 'white', background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '5px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>{title}</h3>
        <div>
          <button onClick={() => setCurrentScene('cats')} style={{marginRight: '5px'}}>🐱 Cats</button>
          <button onClick={() => setCurrentScene('playground')} style={{marginRight: '5px'}}>🏠 Playground</button>
          <button onClick={() => setCurrentScene('space')} style={{marginRight: '5px'}}>🚀 Space</button>
        </div>
      </div>

      {(enableVR || enableAR) && (
        <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 10 }}>
          <button disabled>VR/AR Coming Soon</button>
        </div>
      )}

      <Canvas>
        <CatsScene scene={currentScene} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App