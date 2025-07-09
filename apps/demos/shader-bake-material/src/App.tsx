import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { RoundedBox } from '@react-three/drei';

import { ShaderRasterizingTextureCacheMaterial } from '../../lib/src/index';


// Simple fragment shader for the skybox
const fragmentShader = `
  varying vec2 vUv;

  void main() {
    float y = vUv.y;
    vec3 color;
  
    if (y > 0.75) {
      // Upper blue sky
      color = vec3(0.2, 0.4, 0.9);
    } else if (y > 0.55) {
      // Blend from blue to white near horizon
      float t = (y - 0.55) / (0.75 - 0.55);
      color = mix(vec3(0.95, 0.95, 1.0), vec3(0.2, 0.4, 0.9), t);
    } else if (y > 0.5) {
      // Fade from white to grey just below horizon
      float t = (y - 0.5) / (0.05);
      color = mix(vec3(0.35, 0.35, 0.35), vec3(0.95, 0.95, 1.0), t);
    } else {
      // Solid grey ground color
      color = vec3(0.35, 0.35, 0.35);
    }
  
    gl_FragColor = vec4(color, 1.0);
  }
`;


function Skybox() {
  
  return (
    <mesh scale={[100, 100, 100]}>
      <sphereGeometry args={[1, 32, 32]} />
      <ShaderRasterizingTextureCacheMaterial fragmentShader={fragmentShader}/>
      {/* <meshBasicMaterial map={texture} side={THREE.BackSide} /> */}
    </mesh>
  );
}
function RoundBox({ width, depth, position}: 
                  { width?: number, depth?: number, position?: [number, number, number] }) {
  return (
    <RoundedBox
      position={position ? position : [0,0,0]}
      args={[width || 1, 1, depth || 1]} // width, height, depth
      radius={0.15}      // bevel radius
      smoothness={6}     // subdivisions for smooth bevel
    >
      <meshPhongMaterial color={0xffffff} />
    </RoundedBox>
  );
}

export default function App() {
  return (
    <Canvas style={{width: '100%', height:'100%', position: 'absolute'}}>
      <ambientLight intensity={0.5} />
      <pointLight position={[1, 5, 1]} distance={100} intensity={10} />
      <pointLight position={[-1, 5, -1]} distance={100} intensity={10} />
      
      <directionalLight position={[3,3,-3]} intensity={2} />
      
      <Skybox />
      <RoundBox />
      { new Array(28).fill(0).map( (_, i) =>  (
        <RoundBox position={[0, -2 - i * 3, 0]} width={5+ i} depth={5 + i}/>
      ) 
      )}
      
      <OrbitControls />
    </Canvas>
  );
}
