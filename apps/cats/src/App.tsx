import { Canvas } from '@react-three/fiber'
import MeshSphereSkybox from '@rei-init/mesh-sphere-skybox'

import { OrbitControls, Box, Sphere, Plane } from '@react-three/drei'
import { useState, useRef } from 'react'
import { LinearToneMapping, SRGBColorSpace, type Mesh, type Texture, type ShaderMaterial } from 'three'
import './App.css'


// Expose the debug shape for window.debug_rei_init
declare global {
  interface Window {
    debug_rei_init?: {
      texture?: Texture
      shaderMaterial?: ShaderMaterial
    }
  }
}

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
        args={[0.8, 32, 32]}
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

function CatsScene({ scene = 'playground' }: { scene?: CatsAppProps['scene'] }) {
  switch (scene) {
    
    default:
      return (
        <group rotation={[Math.PI / 6, Math.PI / 8, 0]} position={[0.5, 0, 0]}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[-5, 5, 5]} intensity={1.5} />
          
          {/* Ground */}
          <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <meshBasicMaterial color="#ffffff" />
          </Plane>
          
          {/* Multiple cats */}
          <CatModel position={[1, 0,  1.5]} color="rgba(174, 255, 0, 1)" />
          <CatModel position={[2, 0, -1]}   color="#ffa3dcff" />
          <CatModel position={[-2, 0, 1]}   color="white" />
          <CatModel position={[0, 0, -3]}   color="gray" />
        </group>
      )
  }
}

function App({ className }: CatsAppProps) {

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas className={className}
              onCreated={(state) => {
                state.gl.outputColorSpace = SRGBColorSpace;
                state.gl.toneMapping = LinearToneMapping;
              }}
      >
        <color attach="background" args={['#ffffff']} />
        <MeshSphereSkybox 
          color_1={[0.6, 0.4, 0.9]}
          color_2={[0.95, 0.95, 1.0]}
          color_3={[0.35, 0.35, 0.35]}
        />

        <CatsScene />

        <OrbitControls />
      </Canvas>
    </div>
  ) 
}

export default App