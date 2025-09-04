import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

interface GamepadState {
  id: string;
  buttons: boolean[];
  axes: number[];
}

function useGamepad(index = 0) {
  const [state, setState] = useState<GamepadState | null>(null);

  useEffect(() => {
    const update = () => {
      const pads = navigator.getGamepads();
      const pad = pads[index];
      if (pad) {
        setState({
          id: pad.id,
          buttons: pad.buttons.map((b) => b.pressed),
          axes: [...pad.axes],
        });
      }
    };

    window.addEventListener("gamepadconnected", update);
    window.addEventListener("gamepaddisconnected", () => setState(null));
    const interval = setInterval(update, 1000 / 60);

    return () => {
      clearInterval(interval);
      window.removeEventListener("gamepadconnected", update);
      window.removeEventListener("gamepaddisconnected", () => setState(null));
    };
  }, [index]);

  return state;
}

function ButtonSphere({
  index,
  pressed,
  position,
}: {
  index: number;
  pressed: boolean;
  position: [number, number, number];
}) {
  return (
    <group position={position}>
      <mesh scale={pressed ? 1.3 : 1}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={pressed ? "#ff4081" : "#555"} />
      </mesh>
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {index}
      </Text>
    </group>
  );
}

function AxisCylinder({
  index,
  value,
  position,
  rotation,
}: {
  index: number;
  value: number;
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation || [0, 0, 0]}>
      <mesh position={[value * 0.5, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#4fc3f7" />
      </mesh>
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Axis {index}
      </Text>
    </group>
  );
}

function FightstickVisualizer() {
  const pad = useGamepad(0);

  if (!pad) {
    return (
      <Text fontSize={0.3} color="white" position={[0, 0, 0]}>
        Connect your fight stick!
      </Text>
    );
  }

  const buttonPositions: [number, number, number][] = pad.buttons.map(
    (_, i) => [(i % 6) - 2.5, -Math.floor(i / 6) * 1, 0]
  );

  return (
    <>
      {pad.buttons.map((pressed, i) => (
        <ButtonSphere
          key={i}
          index={i}
          pressed={pressed}
          position={buttonPositions[i]}
        />
      ))}

      {pad.axes.map((value, i) => (
        <AxisCylinder
          key={i}
          index={i}
          value={value}
          position={[-4 + i * 2, 2, 0]}
          rotation={[0, 0, Math.PI / 2]}
        />
      ))}
    </>
  );
}

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ width: "100vw", height: "100vh", background: "#111" }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 2]} intensity={1} />
      <FightstickVisualizer />
      <OrbitControls />
    </Canvas>
  );
}
